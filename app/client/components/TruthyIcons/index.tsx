import { CheckCircleIcon } from '@chakra-ui/icons';
import { ImCross } from 'react-icons/im';
const TruthyIcons = ({ value }: { value: boolean }) => {
  return (
    <>
      {value ? <CheckCircleIcon color="green.500" /> : <ImCross color="red" />}
    </>
  );
};

export default TruthyIcons;
