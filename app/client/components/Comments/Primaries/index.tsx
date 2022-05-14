import { CombineComment } from '@lib/types/CommentTypes';

import useSWR from 'swr';
import Primary from './Primary';

const Primaries = ({
  storyId,

  decrementComment,
  incremetComment,
}: {
  storyId: string;

  incremetComment: () => void;
  decrementComment: () => void;
}) => {
  const { data } = useSWR<{ comments: CombineComment[] }>(
    () => `/comments/primaries/${storyId}`
  );

  return (
    <>
      {data?.comments.map((comment) => (
        <Primary
          comment={comment}
          key={comment._id}
          incremetComment={incremetComment}
          decrementComment={decrementComment}
        />
      ))}
    </>
  );
};

export default Primaries;
