import { HStack, Spinner } from '@chakra-ui/react';
import { PrimaryComment } from '@lib/types/CommentTypes';
import { memo, useCallback, useRef, useState } from 'react';
import useSWR from 'swr';
import Comment from '../Comment';
import Skeleton from '../Skeleton';
import { CtxProvider, Render } from '../AddedCtx';

const Index = ({
  url,
  isPrimary,
  isInitial = false,
  pageNo,
}: {
  url: string;
  isPrimary: boolean;
  isInitial?: boolean;
  pageNo: number;
}) => {
  const { data } = useSWR<{ comments: PrimaryComment[] }>(
    () => url && `${url}?page=${pageNo}`
  );
  const observer: any = useRef();
  const [show, setShow] = useState(isInitial);
  const isInView = useCallback((node) => {
    observer.current = new IntersectionObserver(
      async (entries, observerInst) => {
        if (entries[0].isIntersecting) {
          setShow(true);
          observer?.current?.disconnect(node);
          observerInst?.unobserve(entries[0].target);
        }
      }
    );
    if (node) observer?.current?.observe(node);
  }, []);

  return (
    <>
      <div ref={isInitial ? null : isInView} />
      {!data && isInitial && isPrimary ? (
        <Skeleton />
      ) : !show ? (
        <HStack justifyContent="center" my={0}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="lg"
          />
        </HStack>
      ) : data && data.comments.length ? (
        <>
          {data?.comments.map((comment) =>
            isPrimary ? (
              <CtxProvider key={comment._id}>
                <Comment
                  key={comment._id}
                  comment={comment}
                  isPrimary={isPrimary}
                />
              </CtxProvider>
            ) : (
              <Comment
                key={comment._id}
                comment={comment}
                isPrimary={isPrimary}
              />
            )
          )}
          <Index url={url} pageNo={pageNo + 1} isPrimary={isPrimary} />
        </>
      ) : (
        <Render isPrimary={isPrimary} />
      )}
    </>
  );
};

export default memo(Index);
