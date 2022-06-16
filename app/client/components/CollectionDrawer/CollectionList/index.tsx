/* eslint-disable react-hooks/rules-of-hooks */
import { Spinner, HStack } from '@chakra-ui/react';

import CollectionRow from '../CollectionRow';
import { StoryCollectionType } from '@lib/types/StoryCollectionType';
import useInfinite from '@compo/Hooks/useInfinite';
import useSWR from 'swr';
import { PaginationType } from '@lib/types/PaginationType';

const CollectionList = ({
  storyId,
  initialCollections,
  pageNo,
}: {
  storyId?: string;
  initialCollections?: StoryCollectionType[];
  pageNo: number;
}) => {
  if (initialCollections) {
    return (
      <>
        {initialCollections.map((collection) => (
          <CollectionRow
            key={collection._id}
            collection={collection}
            storyId={storyId}
          />
        ))}
        <CollectionList pageNo={2} storyId={storyId} />
      </>
    );
  }

  const { isValidating, data } = useSWR<{
    mycollections: StoryCollectionType[];
    pagination: PaginationType;
  }>(() => !initialCollections && `/collections/my?page=${pageNo}`);

  const { isInViewRef, show } = useInfinite({
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
          {data?.mycollections.map((collection) => {
            return (
              <>
                <CollectionRow
                  key={collection._id}
                  collection={collection}
                  storyId={storyId}
                />
              </>
            );
          })}
          {data?.pagination.next && (
            <>
              <CollectionList pageNo={data.pagination.next} storyId={storyId} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default CollectionList;
