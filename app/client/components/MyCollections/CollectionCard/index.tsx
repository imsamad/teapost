import { Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import Wrapper from './Wrapper';
import CollectionMeta from './CollectionMeta';
import ShowStories from './ShowStories';

import { StoryCollectionType } from '@lib/types/StoryCollectionType';

const Index = ({
  collection: collectionTemp,
}: {
  collection: StoryCollectionType;
}) => {
  const [collection, setCollection] = useState(collectionTemp);

  return (
    <>
      {collection && (
        <Wrapper key={collection._id}>
          <CollectionMeta
            title={collection.title}
            description={collection.description}
            collectionId={collection._id}
            onRemoveCB={() => {
              // @ts-ignore
              setCollection(null);
            }}
          />
          {collection.stories.length ? (
            <ShowStories collectionId={collection._id} />
          ) : (
            <Text size="sm" color="red" my={2}>
              Collection is empty
            </Text>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default Index;
