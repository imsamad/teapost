import { HStack, Spacer } from '@chakra-ui/react';

import Author from './Author';
import StoryInfo from './StoryInfo';

const index = ({ author, tag, createdAt, slug }: any) => {
  return (
    <HStack>
      <Author author={author} />
      <Spacer />
      <StoryInfo tag={tag} createdAt={createdAt} />
    </HStack>
  );
};

export default index;
