import { useDisclosure } from '@chakra-ui/react';
import DeleteStoryBtn from '@compo/DeleteStoryBtn';
import { useResetData } from '@compo/ReactTableCtxProvider';
import TSButton from '@compo/UI/TSButton';
import { publishManyStoriesApi } from '@lib/api/storyApi';

import { TableInstance } from 'react-table';

const MultipleRowSelected = ({
  selectedRow,
}: {
  selectedRow: any | TableInstance<any>;
}) => {
  const storyIds = selectedRow.map((d: any) => d.original._id);
  const isPublishing = useDisclosure();
  const isUnPublishing = useDisclosure();
  const { resetData } = useResetData();
  const handlePublish = (isPublish: boolean) => {
    isPublish ? isPublishing.onOpen() : isUnPublishing.onOpen();

    publishManyStoriesApi({ storyIds, isPublish })
      .then(() => {
        resetData();
      })
      .catch(() => {})
      .finally(() => {
        isPublish ? isPublishing.onClose() : isUnPublishing.onClose();
      });
  };

  return (
    <>
      <DeleteStoryBtn
        storyIds={storyIds}
        postDeleteCB={async () => {
          await resetData();
        }}
      />
      <TSButton
        size="sm"
        isLoading={isPublishing.isOpen}
        colorScheme="green"
        onClick={() => handlePublish(true)}
        loadingText="Publishing..."
      >
        Published {storyIds.length > 1 && 'All'}
      </TSButton>
      <TSButton
        size="sm"
        isLoading={isUnPublishing.isOpen}
        colorScheme="orange"
        onClick={() => handlePublish(false)}
        variant="outline"
        loadingText="Unpublishing..."
      >
        Un-Published {storyIds.length > 1 && 'All'}
      </TSButton>
    </>
  );
};

export default MultipleRowSelected;
