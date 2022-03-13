import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Stack,
  Box,
  FormLabel,
  Textarea,
  HStack,
  Collapse,
  useDisclosure,
  Heading,
  Divider,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { createCollection } from "../../lib/collectionApi";
import { trimExtra, typeOf } from "../../lib/utils";
import { useProfile } from "../Context";
import Input from "../FormFields/Input";
import TextArea from "../FormFields/TextArea";
const Index = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { profile, mutateProfile } = useProfile();

  const alreadyCreatedCollections = profile.storyCollections?.map(
    (collection) => collection.title.toLowerCase()
  );
  const toast = useToast();

  return (
    <>
      <HStack my="2">
        <Spacer />
        <Button
          leftIcon={isOpen ? <CloseIcon /> : <AddIcon />}
          size="xs"
          onClick={onToggle}
          colorScheme="teal"
        >
          {isOpen ? "Close" : "New"}
        </Button>
      </HStack>

      <Collapse in={isOpen} animateOpacity>
        {isOpen && (
          <Formik
            initialValues={{
              title: "",
              description: "",
            }}
            onSubmit={async (val, actions) => {
              let obj: any = { title: val.title };
              // @ts-ignore
              if (val.description) obj.description = val.description;
              const data = await createCollection(obj);

              if (data) {
                toast({
                  title: "Saved.",
                  status: "success",
                  duration: 1000,
                  isClosable: true,
                  position: "bottom",
                });
                actions.setSubmitting(false);
                actions.resetForm();
                mutateProfile();
              } else {
                toast({
                  title: "Unable to save , please retry.",
                  status: "error",
                  duration: 1000,
                  isClosable: true,
                  position: "bottom",
                });
                actions.setSubmitting(false);
              }
            }}
            validate={(value) => {
              let errors: { title?: string } = {};
              if (!value.title || !trimExtra(value.title, 1))
                errors.title = "Title is required.";
              if (
                alreadyCreatedCollections?.includes(value.title.toLowerCase())
              )
                errors.title = "This already exist";
              return errors;
            }}
          >
            {(formikProps) => {
              // console.log("formikProps ", formikProps);
              return (
                <Form>
                  <Stack rounded="md" border="1px" borderColor="gray.300" p="2">
                    <Heading fontSize="md" textAlign="center" fontWeight={400}>
                      Create new collection
                    </Heading>
                    <Divider />
                    <Input
                      isRequired={true}
                      label="Title"
                      name="title"
                      placeholder="Enter unique title"
                      size="sm"
                    />
                    <TextArea
                      name="description"
                      placeholder="Write a short & sweet description..."
                      label="Description"
                    />
                    <HStack>
                      <Button
                        variant="outline"
                        mr={3}
                        onClick={onClose}
                        size="sm"
                      >
                        Cancel
                      </Button>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        type="submit"
                        isLoading={formikProps.isSubmitting}
                        loadingText="Saving..."
                      >
                        Save
                      </Button>
                    </HStack>
                  </Stack>
                </Form>
              );
            }}
          </Formik>
        )}
      </Collapse>
    </>
  );
};

export default Index;
