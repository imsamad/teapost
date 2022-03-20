import { DeleteIcon } from "@chakra-ui/icons";
// EditIcon
import {
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";

import StoryCollectionType from "@lib/types/StoryCollectionType";
import { deleteCollection } from "@lib/api/collectionApi";
import { useProfile } from "../Context";

type CollRowProps = {
  collection: StoryCollectionType;
  sendObj: { partOf: string[]; removeFrom: string[] };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
};

const CollectionRow = ({
  isDisabled,
  collection,
  handleChange,
  sendObj,
}: CollRowProps) => {
  const { mutateProfile } = useProfile();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handleDelete = () => {
    onOpen();
    deleteCollection(collection._id).finally(() => {
      mutateProfile();
      onClose();
    });
  };

  return (
    <HStack mb="2">
      <HStack flex="1" overflow="hidden">
        <Checkbox
          isChecked={sendObj.partOf.includes(collection._id)}
          onChange={handleChange}
          isDisabled={isDisabled}
          icon={<CustomIcon />}
          colorScheme="cyan"
          size="lg"
          w="full"
        >
          <Text color="black" fontWeight={500} fontSize="md" noOfLines={1}>
            {collection.title}
          </Text>
        </Checkbox>
      </HStack>

      {collection?.title?.toLowerCase() != "read later" && (
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Call Sage"
          isRound
          isLoading={isOpen}
          size="xs"
          icon={<DeleteIcon color="red.500" />}
          onClick={handleDelete}
        />
      )}

      {/* <IconButton
        variant="outline"
        colorScheme="teal"
        isRound
        aria-label="Call Sage"
        size="xs"
        icon={<EditIcon color="red.500" />}
      /> */}
    </HStack>
  );
};
function CustomIcon(props: any) {
  const { isIndeterminate, isChecked, ...rest } = props;

  const d = isIndeterminate
    ? "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.917,1,1,0,1,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.255a1,1,0,1,1-2,0,4,4,0,1,1,5.6,3.666Z"
    : "M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z";

  return (
    <Icon viewBox="0 0 24 24" {...rest}>
      <path fill="currentColor" d={d} />
    </Icon>
  );
}
export default CollectionRow;
