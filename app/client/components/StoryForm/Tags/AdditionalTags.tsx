import { AddIcon, CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { CustomError } from "@compo/FormFields";
import TSButton from "@compo/UI/TSButton";
import TagType from "@lib/types/TagType";
import { trimExtra } from "@lib/utils";
import { useField } from "formik";
import React, { useRef } from "react";

const AdditionalTags = ({
  tagsExisted,
}: {
  tagsExisted: TagType["title"][];
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const [{ value }, { touched, error }, { setValue, setError, setTouched }] =
    useField<string[]>("additionalTags");

  const handleAdd = () => {
    const val: string = ref?.current?.value!;
    if (val.length < 4 || !trimExtra(val, 4)) {
      setTouched(true, false);
      setError("Must be more then 4");
    } else if (value.includes(val) || tagsExisted?.includes(val)) {
      setError("It already exist");
    } else {
      setValue([...value, val]);
      //   @ts-ignore
      ref?.current?.value = "";
    }
  };

  const deleteTag = (tag: string) => () => {
    setValue(value.filter((val) => val != tag));
  };

  return (
    <Box my="2">
      {value.map((val, index) => (
        <TSButton
          key={val}
          leftIcon={<CheckCircleIcon />}
          colorScheme="green"
          size="xs"
          _hover={{
            bgColor: "green.400",
          }}
          onClick={deleteTag(val)}
          _focus={{
            bgColor: "green.400",
          }}
          m="1"
        >
          {val}
        </TSButton>
      ))}
      <FormControl size="md" my="2">
        <FormLabel htmlFor="additionalTags">Add Tags</FormLabel>
        <InputGroup size="sm">
          <Input ref={ref} name="additionalTags" id="additionalTags" />
          <InputRightElement width="4.5rem">
            <Button
              size="xs"
              variant="solid"
              colorScheme="blue"
              rightIcon={<AddIcon />}
              onClick={handleAdd}
            >
              Add
            </Button>
          </InputRightElement>
        </InputGroup>
        <CustomError errors={error} isError={Boolean(touched && error)} />
      </FormControl>
    </Box>
  );
};

export default AdditionalTags;
