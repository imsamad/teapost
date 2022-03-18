import { Box, Divider, Heading } from "@chakra-ui/react";
import { ChangeEvent } from "react";

import { useProfile } from "../Context";
import NewCollection from "../NewCollection";
import CollectionRow from "./CollectionRow";

const Body = ({ storySelected, sendObj, setSendObj }: any) => {
  const { profile } = useProfile();

  const handleChange =
    (collId: string) => (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setSendObj((pre: any) => ({
          ...pre,
          removeFrom: pre.removeFrom.filter((coll: string) => coll != collId),
          addTo: [...pre.addTo, collId],
        }));
      } else {
        setSendObj((pre: any) => ({
          ...pre,
          addTo: pre.addTo.filter((coll: string) => coll != collId),
          removeFrom: [...pre.removeFrom, collId],
        }));
      }
    };

  return (
    <>
      <NewCollection />
      <Heading fontSize="md" textAlign="center" my="2">
        Add To
      </Heading>
      <Divider />
      <Box p="2">
        {profile?.storyCollections?.map((collection) => (
          <CollectionRow
            sendObj={sendObj}
            storySelected={storySelected}
            handleChange={handleChange(collection._id)}
            key={collection._id}
            collection={collection}
          />
        ))}
      </Box>
    </>
  );
};

export default Body;
