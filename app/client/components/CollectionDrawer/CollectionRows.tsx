import { Spinner, HStack } from '@chakra-ui/react';

import CollectionRow from './CollectionRow';
import { StoryCollectionType } from '@lib/types/StoryCollectionType';
import useInfinite from '@compo/Hooks/useInfinite';
import useSWR from 'swr';
import { PaginationType } from '@lib/types/PaginationType';

const CollectionRows = ({
  storyId,
  initialCollections,
  page,
}: {
  storyId?: string;
  initialCollections?: StoryCollectionType[];
  page: number;
}) => {
  const { isInViewRef, show } = useInfinite({
    ignore: !!initialCollections,
  });

  const { isValidating, data } = useSWR<{
    mycollections: StoryCollectionType[];
    pagination: PaginationType;
  }>(() => !initialCollections && `/collections/my?page=${page}`);

  if (!initialCollections && !data?.pagination.next) return <></>;

  return (
    <>
      {!initialCollections && <div ref={isInViewRef} />}
      {initialCollections ? (
        <>
          {initialCollections.map((collection) => (
            <CollectionRow
              key={collection._id}
              collection={collection}
              storyId={storyId}
            />
          ))}
          <CollectionRows page={2} storyId={storyId} />
        </>
      ) : show && !isValidating ? (
        <>
          {data?.mycollections.map((collection) => (
            <CollectionRow
              key={collection._id}
              collection={collection}
              storyId={storyId}
            />
          ))}
          {data?.pagination?.next && (
            <CollectionRows page={data.pagination.next} storyId={storyId} />
          )}
        </>
      ) : (
        <HStack justifyContent="center" my={2}>
          <Spinner size="md" />
        </HStack>
      )}
    </>
  );
};

export default CollectionRows;
