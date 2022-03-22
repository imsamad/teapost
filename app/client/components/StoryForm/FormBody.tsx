import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { memo, useState } from "react";
import IsPublished from "./IsPublished";

import MetaFields from "./MetaFields";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});

const FormBody = () => {
  // return (
  //   <>
  //     <IsPublished setExpand={setExpand} /> <MetaFields /> <Editor />
  //   </>
  // );
  return (
    <>
      <IsPublished />
      <Accordion defaultIndex={[0]} allowToggle allowMultiple>
        <AccordionItem border="1px" isFocusable>
          <AccordionButton
            _focus={{ outline: "none" }}
            _expanded={{ bg: "gray.400", color: "white" }}
          >
            <Heading fontSize="md" flex="1" textAlign="left">
              Fill Story Meta
            </Heading>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>
            <MetaFields />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem mt="4px" border="1px">
          <AccordionButton
            _focus={{ outline: "none" }}
            _expanded={{ bg: "gray.400", color: "white" }}
          >
            <Heading fontSize="md" flex="1" textAlign="left">
              Content
            </Heading>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>
            <Editor />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default memo(FormBody);
