import CommentForm from 'components/CommentForm';
import DeleteModal from 'components/DeleteModal';
import LikeButton from 'components/LikeButton';
import MyDate from 'components/MyDate';
import NicknameLink from 'components/NicknameLink';
import ProfileImage from 'components/ProfileImage';
import useModal from 'hooks/useModal';
import {
  addReply,
  changeReply,
  CommentsAction,
  likeReply,
} from 'hooks/useReplies';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  changeComment,
  changeReplyCount,
  likeComment,
  removeComment,
} from 'slices/commentsSlice';
import { changePostDetailComments } from 'slices/postDetailSlice';
import { changePostComments } from 'slices/postsSlice';
import { useUser } from 'slices/userSlice';
import { Comment as CommentType } from 'types';
import api from 'utils/api';
import styles from './Comment.module.scss';

export type CommentProps = {
  comment: CommentType;
  dispatchReplies: Dispatch<CommentsAction>;
  setExpanded?: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  enableReply?: boolean;
  onDelete?: () => void;
  postId?: number;
};

function Comment({
  comment,
  dispatchReplies,
  setExpanded,
  children,
  enableReply,
  onDelete,
  postId: pid,
}: CommentProps) {
  const { member, createdDate, content, liked, likes, commentId, profile } =
    comment;
  const user = useUser();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const postId = pid || (comment.postId as number);
  const dispatch = useDispatch();

  return (
    <div className={styles.container} data-testid="comment">
      <ProfileImage
        nickname={member.nickname}
        imgUrl={profile.imgUrl}
        size={2.25}
      />
      <div className={styles.right}>
        <div className={styles.top}>
          <div className={styles.info}>
            <NicknameLink nickname={member.nickname} />
            <span>???</span>
            <MyDate date={createdDate} />
            {user?.nickname === member.nickname && !isEditing && (
              <>
                <button
                  aria-label="?????? ??????"
                  onClick={() => {
                    setIsEditing(true);
                    setIsReplying(false);
                  }}
                >
                  ??????
                </button>
                <button aria-label="?????? ??????" onClick={openModal}>
                  ??????
                </button>
                {isModalOpen && (
                  <DeleteModal
                    title="?????? ??????"
                    message={'?????? ????????? ?????????????????????????'}
                    onConfirm={async () => {
                      await api.delete(`/comment/${commentId}`);
                      closeModal();
                      dispatch(changePostDetailComments('delete'));
                      dispatch(
                        changePostComments({ id: postId, type: 'delete' })
                      );
                      dispatch(removeComment(commentId));
                      if (onDelete) onDelete();
                    }}
                    onCancel={closeModal}
                  />
                )}
              </>
            )}
          </div>
          {isEditing ? (
            <CommentForm
              type="edit"
              initialValues={{ comment: content }}
              onSubmit={async ({ comment }) => {
                if (comment !== content) {
                  const { data } = await api.post<CommentType>(
                    `/comment/${commentId}`,
                    {
                      content: comment,
                      id: commentId,
                    }
                  );
                  dispatchReplies(changeReply(data));
                  dispatch(changeComment(data));
                }
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <p>{content}</p>
          )}
        </div>
        {!isEditing && (
          <div className={styles.bottom}>
            <LikeButton
              type="comment"
              id={commentId}
              liked={liked}
              variant="medium"
              onClick={() => {
                dispatch(likeComment(commentId));
                dispatchReplies(likeReply(commentId));
              }}
            >
              {likes}
            </LikeButton>
            {enableReply && (
              <button
                className={styles.replyButton}
                aria-label="?????? ??????"
                onClick={() => setIsReplying(true)}
              >
                ??????
              </button>
            )}
          </div>
        )}
        {!isEditing && isReplying && (
          <CommentForm
            type="reply"
            onSubmit={async ({ comment }) => {
              const { data } = await api.post<CommentType>('/comment', {
                content: comment,
                parentCommentId: commentId,
                postId: postId,
              });
              dispatch(changePostDetailComments('add'));
              dispatch(changePostComments({ id: postId, type: 'add' }));
              dispatch(changeReplyCount({ id: commentId, type: 'add' }));
              dispatchReplies(addReply(data));
              if (setExpanded) setExpanded(true);
              setIsReplying(false);
            }}
            onCancel={() => setIsReplying(false)}
          />
        )}
        {children}
      </div>
    </div>
  );
}

export default Comment;
