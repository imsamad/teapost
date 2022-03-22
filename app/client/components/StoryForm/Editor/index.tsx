import {
  Box,
  Collapse,
  Progress,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CustomError } from "@compo/FormFields";
import { submitStory } from "@lib/api/storyApi";
import * as React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Router from "next/router";

import { setOptions } from "./config/options";
import SaveButtonStyles from "./config/saveButtonStyles";
import { useField } from "formik";

export default function App() {
  const isLoading = useDisclosure();

  const [{ value }, { error, touched }, { setValue, setError }] =
    useField<string>("content");

  const toast = useToast();
  const onSave = async (ctx: string) => {
    isLoading.onOpen();
    submitStory({
      values: {
        content: ctx,
        slug: Router.query.slug as string,
      },
      type: "content",
    })
      .then(() => {
        toast({
          status: "success",
          title: "Saved succefully",
          isClosable: true,
          variant: "top-accent",
        });
      })
      .catch((errors) => {
        console.log("errors ", errors);
        setError(errors.message || "Invalid data");
        toast({
          status: "error",
          title: "Try again.",
          isClosable: true,
          variant: "top-accent",
        });
      })
      .finally(() => {
        isLoading.onClose();
      });
  };
  return (
    <Box className="App" zIndex="1">
      <CustomError errors={error} isError={Boolean(error && touched)} />
      <Collapse in={isLoading.isOpen}>
        {isLoading.isOpen && <Progress size="xs" isIndeterminate />}
      </Collapse>
      <SunEditor
        setContents={value}
        onChange={setValue}
        setAllPlugins={true}
        setOptions={setOptions()}
        autoFocus={false}
        onSave={onSave}
      />
      <SaveButtonStyles />
    </Box>
  );
}
