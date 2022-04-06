import {
  Box,
  Collapse,
  Heading,
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Progress,
  Switch,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { submitStory } from "@lib/api/storyApi";
import { StoryFormType } from "@lib/types/StoryType";
import { impStoryFields } from "@lib/utils";
import { useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { BsFillInfoSquareFill } from "react-icons/bs";
const Index = () => {
  const { values } = useFormikContext<StoryFormType>();

  const [autoSave, setAutoSave] = useState(true);

  let intervalRef = useRef<any>();
  // const isLoading = useDisclosure();
  const saveChanges = () => {
    const initialStory = localStorage.getItem("story"),
      changedStory = JSON.stringify(impStoryFields(values));

    if (!autoSave || initialStory == changedStory) {
      clearInterval(intervalRef.current);
      return;
    }
    // isLoading.onOpen();
    submitStory({
      type: "autoSave",
      values,
      storeResToLocal: true,
    })
      .then((data) => {})
      .finally(() => {
        // isLoading.onClose();
        clearInterval(intervalRef.current);
      });
  };

  useEffect(() => {
    if (!autoSave) return;
    intervalRef.current = setInterval(() => saveChanges(), 10000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleChange = () => {
    if (autoSave) {
      clearInterval(intervalRef.current);
      setAutoSave(false);
      return;
    }
    intervalRef.current = setInterval(() => saveChanges(), 10000);
    setAutoSave(true);
  };
  return (
    <VStack
      border="0px"
      textAlign="justify"
      justifySelf="flex-end"
      alignSelf="flex-end"
    >
      <HStack border="0px">
        <Heading size="sm">Auto Save</Heading>
        <Switch
          outline="none"
          border="0"
          _focus={{ outline: "none", border: 0 }}
          _active={{ outline: "none", border: 0 }}
          colorScheme="cyan"
          size="lg"
          isChecked={autoSave}
          value={autoSave ? 1 : 0}
          onChange={() => handleChange()}

          // onChange={handleChange}
        />

        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label="autoSave title"
              icon={<BsFillInfoSquareFill />}
              size="sm"
              border="0"
              outline="none"
              variant="outline"
              _focus={{
                outline: "none",
              }}
            />
          </PopoverTrigger>
          <Portal>
            <PopoverContent
              _focus={{
                outline: "none",
              }}
              border="4px"
              borderColor="teal"
            >
              <PopoverArrow />
              <PopoverHeader>
                <Text size="xs" colorScheme="blue" fontWeight={800}>
                  Auto-save Changes /10 sec
                </Text>
              </PopoverHeader>
              <PopoverCloseButton />
            </PopoverContent>
          </Portal>
        </Popover>
      </HStack>
      {/* <Box w="100%">
        <Collapse in={isLoading.isOpen} animateOpacity>
          <HStack>
            <Box w="100%">
              <Progress size="xs" isIndeterminate />
            </Box>
            <Text
              textAlign="center"
              size="5px"
              color="muted"
              textStyle="italic"
            >
              Auto-Saving...
            </Text>
          </HStack>
        </Collapse>
      </Box> */}
    </VStack>
  );
};

export default Index;
