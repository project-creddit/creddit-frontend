import postDummy from 'data/post.json';
import { logout } from 'slices/userSlice';
import {
  act,
  fireEvent,
  render,
  screen,
  store,
  waitFor,
} from 'utils/test-utils';
import PostMain, { PostMainProps } from './PostMain';

describe('PostMain', () => {
  const setup = (props: Partial<PostMainProps> = {}) => {
    const initialProps: PostMainProps = {
      post: postDummy,
    };
    const utils = render(<PostMain {...initialProps} {...props} />);
    return {
      initialProps,
      ...utils,
    };
  };

  const setupButtons = async () => {
    let editButton!: HTMLAnchorElement;
    await waitFor(() => {
      editButton = screen.getByLabelText('게시물 수정');
    });
    const deleteButton = screen.getByLabelText(
      '게시물 삭제'
    ) as HTMLButtonElement;
    return {
      editButton,
      deleteButton,
    };
  };

  it('renders properly', async () => {
    const { initialProps } = setup();
    const { editButton, deleteButton } = await setupButtons();
    const { post } = initialProps;
    const { title, member, content, id } = post;
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByTestId('profile-image')).toBeInTheDocument();
    expect(screen.getByText(member.nickname)).toBeInTheDocument();
    expect(screen.getByTestId('my-date')).toBeInTheDocument();
    expect(editButton).toHaveAttribute('href', `/edit-post?id=${id}`);
    expect(deleteButton).toBeInTheDocument();
    expect(screen.getByTestId('content').textContent).toBe(content);
  });

  it('renders DeleteModal when click delete button', async () => {
    setup();
    const { deleteButton } = await setupButtons();
    fireEvent.click(deleteButton);
    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
  });

  it('closes DeleteModal when click cancel button', async () => {
    setup();
    const { deleteButton } = await setupButtons();
    fireEvent.click(deleteButton);
    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('삭제 취소'));
    expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
  });

  it('closes DeleteModal when click outside', async () => {
    setup();
    const { deleteButton } = await setupButtons();
    fireEvent.click(deleteButton);
    const deleteModal = screen.getByTestId('delete-modal');
    expect(deleteModal).toBeInTheDocument();
    fireEvent.click(deleteModal);
    expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
  });

  it('closes DeleteModal when press esc key', async () => {
    setup();
    const { deleteButton } = await setupButtons();
    fireEvent.click(deleteButton);
    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
  });

  it('hides edit and delete buttons if the current user is not the author', () => {
    setup();
    act(() => {
      store.dispatch(logout());
    });

    expect(screen.queryByLabelText('게시물 수정')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('게시물 삭제')).not.toBeInTheDocument();
  });
});
