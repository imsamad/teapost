import { HStack, Spinner } from '@chakra-ui/react';
import useInfinite from '@compo/Hooks/useInfinite';
import StoryCard from '@compo/StoryCard';
import { PaginationType } from '@lib/types/PaginationType';
import StoryType from '@lib/types/StoryType';
import UserType from '@lib/types/UserType';
import useSWR from 'swr';

type props = {
  initialStories?: StoryType[];
  pageNo: number;
};
const StoryList = ({ initialStories, pageNo }: props) => {
  if (initialStories) {
    return (
      <>
        {initialStories.map((story) => {
          return (
            <>
              <StoryCard key={story._id} story={story} />
            </>
          );
        })}

        <StoryList pageNo={2} />
      </>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isValidating } = useSWR<{
    stories: StoryType[];
    authors: UserType[];
    pagination: PaginationType;
  }>(`/stories?page=${pageNo}`);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { show, isInViewRef } = useInfinite({
    ignore: false,
  });

  if (isValidating) {
    return (
      <HStack justifyContent="center" my={2}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="sm"
        />
      </HStack>
    );
  }

  if (!isValidating && !data?.pagination?.next) {
    return <></>;
  }
  return (
    <>
      <div ref={isInViewRef} />
      {show && (
        <>
          {data?.stories.map((story) => {
            return (
              <>
                <StoryCard key={story._id} story={story} />
              </>
            );
          })}
          {data?.pagination.next && (
            <>
              <StoryList pageNo={data.pagination.next} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default StoryList;
