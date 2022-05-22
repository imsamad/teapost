import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Heading, HStack, Spacer } from '@chakra-ui/react';
import DeleteStoryBtn from '@compo/DeleteStoryBtn';
import TSIconButton from '@compo/UI/TSIconButton';
import { useField } from 'formik';
import { useRouter } from 'next/router';
import AutoSave from './AutoSave';
import Collab from './Collab';

import IsPublished from './IsPublished';
const Index = () => {
  const [{ value }] = useField('_id');

  const router = useRouter();
  return (
    <HStack justifyContent="flex-end" my="4" wrap="wrap">
      <HStack borderRadius="md" p="1">
        <Heading fontSize="md">History</Heading>
        <TSIconButton
          as="a"
          // @ts-ignore
          target="_blank"
          variant="outline"
          colorScheme="blue"
          // @ts-ignore
          href={`/me/stories/history/${value}`}
          size="xs"
          icon={<ExternalLinkIcon />}
          aria-label="History"
        />
      </HStack>
      <Spacer />
      <Collab />
      <AutoSave />
      <IsPublished />
      <DeleteStoryBtn
        storyIds={[value]}
        postDeleteCB={() => {
          router.push('/me');
        }}
      />
    </HStack>
  );
};

export default Index;
