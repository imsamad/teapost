import { EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Button, Link, VStack } from '@chakra-ui/react';
import DeleteStoryBtn from '@compo/DeleteStoryBtn';
import { useResetData } from '@compo/ReactTableCtxProvider';
import StoryType from '@lib/types/StoryType';
import { CellProps } from 'react-table';

const StoryActions = (props: CellProps<StoryType>) => {
  const slug = props.cell.row.original.slug;
  const storyId = props.value;
  const isPublished = props.cell.row.original.isPublished;
  const { resetData } = useResetData();

  return (
    <VStack my={2}>
      {isPublished ? (
        <Link href={`/story/${slug}`} isExternal>
          <Button
            size="sm"
            rightIcon={<ExternalLinkIcon mx="2px" />}
            colorScheme="blue"
          >
            Visit
          </Button>
        </Link>
      ) : null}
      <Link href={`/me/stories/edit/${storyId}`} isExternal>
        <Button size="sm" rightIcon={<EditIcon mx="2px" />} colorScheme="green">
          Edit
        </Button>
      </Link>
      <DeleteStoryBtn
        storyIds={[storyId]}
        postDeleteCB={() => {
          resetData();
        }}
      />
    </VStack>
  );
};

export default StoryActions;
