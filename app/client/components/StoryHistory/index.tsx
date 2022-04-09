import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";

import { StoryHistoryType } from "@lib/types/StoryHistoryType";
import StoryForm from "@compo/StoryForm";
import { readAbleDate } from "@lib/utils";
import HistoryAction from "./HistoryAction";

const Index = ({ storyHistory }: { storyHistory: StoryHistoryType }) => {
  const [instances, setInstances] = useState<StoryHistoryType["instances"]>(
    storyHistory?.instances || []
  );
  return (
    <Box p="2">
      <Heading textAlign="center" fontSize="2xl">
        History
      </Heading>
      {instances.length <= 0 ? (
        <Heading fontSize="xl" textAlign="center" my="10" fontStyle="italic">
          No History found for this story ...
        </Heading>
      ) : (
        <>
          <HistoryAction
            storyId={storyHistory._id}
            isAll={true}
            setInstances={setInstances}
          />
          {instances.map((instance) => {
            return (
              <Accordion key={instance._id} allowToggle>
                <AccordionItem>
                  <AccordionButton
                    _focus={{ outline: "none" }}
                    _expanded={{ bg: "gray.400", color: "white" }}
                  >
                    <Heading fontSize="md" flex="1" textAlign="left">
                      Till {readAbleDate(instance.createdAt, true)}
                    </Heading>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <HistoryAction
                      historyId={instance._id}
                      storyId={storyHistory._id}
                      setInstances={setInstances}
                    />
                    <StoryForm
                      story={{
                        ...JSON.parse(instance.story),
                        isFromHistory: true,
                      }}
                    />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            );
          })}
        </>
      )}
    </Box>
  );
};

export default Index;
