import Layout from 'components/Layout';
import PostForm from 'components/PostForm';
import { usePostCardContext } from 'context/PostCardContext';
import { usePostsContext } from 'context/PostsContext';
import useLogoutRedirect from 'hooks/useLogoutRedirect';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { wrapper } from 'slices/store';
import { initUser } from 'slices/userSlice';
import api from 'utils/api';
import getPostFormData from 'utils/getPostFormData';

const CreatePost: NextPage = () => {
  const router = useRouter();
  const { dispatch } = usePostsContext();
  const { setClickedPostCard } = usePostCardContext();
  useLogoutRedirect({ to: '/' });

  return (
    <Layout title="글 작성 - creddit">
      <PostForm
        title="작성"
        onSubmit={async (values, imageFile) => {
          const formData = getPostFormData({ values, imageFile });
          const { data } = await api.post('/post/create', formData);
          dispatch({ type: 'RESET' });
          setClickedPostCard(false);
          router.push(`/post/${data}`);
        }}
      />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { user } = await initUser(store, context);
    if (!user) return { redirect: { destination: '/', permanent: false } };
    return { props: {} };
  }
);

export default CreatePost;
