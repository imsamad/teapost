import MyLink from '@compo/MyLink';
import TSButton from '@compo/UI/TSButton';
import { nanoid } from 'nanoid';
import { FaPenNib } from 'react-icons/fa';

const WriteBtn = () => {
  return (
    <MyLink href={`/me/stories/write/${nanoid(10)}`}>
      <TSButton leftIcon={<FaPenNib />} colorScheme="green">
        Write +
      </TSButton>
    </MyLink>
  );
};

export default WriteBtn;
