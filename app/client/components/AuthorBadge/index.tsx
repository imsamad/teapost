import { Avatar, Flex, Text } from '@chakra-ui/react';
type propTypes = {
  image: string;
  full_name: string;
  short_name: string;
};

const index = ({ image, full_name, short_name }: propTypes) => {
  return (
    <Flex alignItems="center">
      <Avatar size="xs" name={full_name} src={image} />
      <Text fontSize="md" ml="2" isTruncated>
        {short_name}
      </Text>
    </Flex>
  );
};

export default index;
