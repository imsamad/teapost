import { HStack, Spinner } from '@chakra-ui/react';
import useInfinite from '@compo/Hooks/useInfinite';
import ShowStoryCard from '../ShowStoryCard';
import { PaginationType } from '@lib/types/PaginationType';
import StoryType from '@lib/types/StoryType';
import UserType from '@lib/types/UserType';
import useSWR from 'swr';

type props = {
  initialStories?: StoryType[];
  pageNo: number;

  collectionId: string;
};
const ShowStoriesList = ({ initialStories, pageNo, collectionId }: props) => {
  if (initialStories) {
    return (
      <>
        {initialStories.map((story) => {
          return (
            <>
              <ShowStoryCard
                key={story._id}
                story={story}
                collectionId={collectionId}
              />
            </>
          );
        })}

        <ShowStoriesList pageNo={2} collectionId={collectionId} />
      </>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isValidating } = useSWR<{
    stories: StoryType[];
    authors: UserType[];
    pagination: PaginationType;
  }>(`/collections/stories/${collectionId}?page=${pageNo}`);

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
                <ShowStoryCard
                  key={story._id}
                  story={story}
                  collectionId={collectionId}
                />
              </>
            );
          })}
          {data?.pagination.next && (
            <>
              <ShowStoriesList
                pageNo={data.pagination.next}
                collectionId={collectionId}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default ShowStoriesList;
