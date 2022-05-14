import { CombineComment } from '@lib/types/CommentTypes';
import { memo } from 'react';

import useSWR from 'swr';
import Secondary from './Secondary';

const Secondaries = ({
  commentId,
  onReplyCB,
  decrementComment,
  incremetComment,
  decrementReplies,
}: {
  commentId: string;
  decrementReplies: () => void;
  onReplyCB: (comment: CombineComment) => Promise<void>;
  incremetComment: () => void;
  decrementComment: () => void;
}) => {
  const { data } = useSWR<{ comments: CombineComment[] }>(
    () => `/comments/secondaries/${commentId}`
  );
  return (
    <>
      {data?.comments.map((comment) => (
        <Secondary
          decrementReplies={decrementReplies}
          onReplyCB={onReplyCB}
          comment={comment}
          key={comment._id}
          incremetComment={incremetComment}
          decrementComment={decrementComment}
        />
      ))}
    </>
  );
};

export default memo(Secondaries);
