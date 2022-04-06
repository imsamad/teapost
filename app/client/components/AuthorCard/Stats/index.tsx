import { HStack, Text } from "@chakra-ui/react";
import React from "react";

const index = ({
  numOfStories,
  numOfFollowers,
}: {
  numOfStories: number;
  numOfFollowers: number;
}) => {
  return (
    <HStack>
      <Text
        borderLeft="4px"
        borderBottom="1px"
        pl="4"
        mr="10px"
        borderColor="purple"
      >
        Stories {numOfStories}
      </Text>

      <Text borderLeft="4px" borderBottom="1px" pl="4" borderColor="purple">
        Followers {numOfFollowers}
      </Text>
    </HStack>
  );
};

export default index;
