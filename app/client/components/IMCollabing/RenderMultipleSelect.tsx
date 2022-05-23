import { Button, useDisclosure } from '@chakra-ui/react';
import { useResetData } from '@compo/ReactTableCtxProvider';
import { unCollabMeMultipleApi } from '@lib/api/storyApi';

const RenderMultipleSelect = ({ selectedRows }: { selectedRows: any }) => {
  const storyIds = selectedRows.map((d: any) => d.original._id);

  const isUnCollabing = useDisclosure();
  const { resetData } = useResetData();
  const handleClick = () => {
    // tableInstance.stateReducer((state,actions))
    var res = confirm('Do you want to uncollab from the stories?');
    if (!res) return;
    isUnCollabing.onOpen();
    unCollabMeMultipleApi(storyIds)
      .then(() => {
        resetData();
      })
      .catch(() => {})
      .finally(() => {
        isUnCollabing.onClose();
      });
  };

  return (
    <>
      <Button
        colorScheme="red"
        onClick={handleClick}
        isLoading={isUnCollabing.isOpen}
        loadingText="UnCollabing..."
      >
        UnCollab {storyIds.length > 1 && 'All'}
      </Button>
    </>
  );
};

export default RenderMultipleSelect;
