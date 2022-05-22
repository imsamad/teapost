import { Button } from '@chakra-ui/react';
import MyLink from '@compo/MyLink';
import { nanoid } from 'nanoid';
import { FaPenNib } from 'react-icons/fa';

const WriteBtn = () => {
  return (
    <MyLink href={`/me/stories/write/${nanoid(10)}`}>
      <Button leftIcon={<FaPenNib />} colorScheme="linkedin">
        Write +
      </Button>
    </MyLink>
  );
};

export default WriteBtn;
