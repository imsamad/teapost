import { Avatar, HStack, Text } from '@chakra-ui/react';
import MyLink from '../../../MyLink';
import { useRouter } from 'next/router';
type propTypes = {
  username: string;
  email: string;
  id: string;
};

const Index = ({ author }: any) => {
  const router = useRouter();
  return (
    <MyLink
      href={`/@/${author.username}`}
      _hover={{
        color: 'blue.500',
      }}
    >
      <HStack>
        <Avatar size="2xs" name={author.username} src={author.profilePic} />

        <Text fontWeight={600} fontSize="sm" ml={1}>
          {author.username}
        </Text>
      </HStack>
    </MyLink>
  );
};

export default Index;
