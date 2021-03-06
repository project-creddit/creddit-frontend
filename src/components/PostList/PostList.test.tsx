import { render, screen } from 'utils/test-utils';
import PostList from './PostList';

describe('PostList', () => {
  const setup = () => {
    const utils = render(<PostList url="url" />);
    const sortByLikeButton = screen.getByLabelText(
      '인기순으로 정렬'
    ) as HTMLButtonElement;
    const sortByRecentButton = screen.getByLabelText(
      '최신순으로 정렬'
    ) as HTMLButtonElement;
    return {
      sortByLikeButton,
      sortByRecentButton,
      ...utils,
    };
  };

  it('renders properly', async () => {
    const { sortByLikeButton, sortByRecentButton } = setup();
    expect(sortByLikeButton).toBeInTheDocument();
    expect(sortByRecentButton).toBeInTheDocument();
  });
});
