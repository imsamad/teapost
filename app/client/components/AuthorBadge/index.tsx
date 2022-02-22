import { Avatar, Circle, Flex, Text } from '@chakra-ui/react';
type propTypes = {
  image: string;
  full_name: string;
  short_name: string;
};

const index = ({ image, full_name, short_name }: propTypes) => {
  return (
    <Flex alignItems="center">
      <Circle size="20px" bgColor="pink">
        <Text fontSize="10px" lineHeight="10px">
          H
        </Text>
      </Circle>
      {/* <Avatar size="xs" name={full_name} src={image} /> */}
      <Text
        fontSize="15px"
        fontWeight={600}
        // color="rgba(41,41,41)"
        lineHeight="13px"
        ml={1}
      >
        {short_name}
      </Text>
    </Flex>
  );
};

export default index;
