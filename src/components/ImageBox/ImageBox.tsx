import classNames from 'classnames';
import Button from 'components/Button';
import DeleteModal from 'components/DeleteModal';
import ImageUploadButton from 'components/ImageUploadButton';
import ProfileImage from 'components/ProfileImage';
import useModal from 'hooks/useModal';
import { useDispatch } from 'react-redux';
import { changePostAuthor } from 'slices/postsSlice';
import { changeProfile } from 'slices/profileSlice';
import { changeUser } from 'slices/userSlice';
import { MyImage } from 'types';
import editProfile from 'utils/editProfile';
import styles from './ImageBox.module.scss';

export type ImageBoxProps = {
  image: MyImage;
  introduction: string;
  isAuthor: boolean;
  className?: string;
};

function ImageBox({ image, introduction, isAuthor, className }: ImageBoxProps) {
  const { imgUrl } = image;
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();

  return (
    <div
      className={classNames(styles.imageBox, className && className)}
      data-testid="image-box"
    >
      <ProfileImage imgUrl={imgUrl} shape="rectangle" size={6} />
      {isAuthor && (
        <div className={styles.buttons}>
          <ImageUploadButton
            ariaLabel={'프로필 이미지 업로드'}
            onChange={async (file) => {
              const { data: user } = await editProfile({
                introduction,
                imageFile: file,
              });
              const { image } = user;
              dispatch(changeUser({ image }));
              dispatch(changePostAuthor(user));
              dispatch(changeProfile({ ...user, image }));
            }}
          />
          {imgUrl && (
            <Button
              variant="plain"
              ariaLabel="프로필 이미지 제거"
              onClick={openModal}
            >
              제거
            </Button>
          )}
          {isModalOpen && (
            <DeleteModal
              title="이미지 제거"
              message={'정말 이미지를 제거하시겠습니까?'}
              onConfirm={async () => {
                const { data: user } = await editProfile({ introduction });
                const { image } = user;
                closeModal();
                dispatch(changeUser({ image }));
                dispatch(changePostAuthor(user));
                dispatch(changeProfile({ ...user, image }));
              }}
              onCancel={closeModal}
              buttonName="제거"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ImageBox;
