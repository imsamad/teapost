import {
  Box,
  Tag,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
  Collapse,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
const categories = [
  'News',
  'Sport',
  'Real',
  'World',
  'Travel',
  'Future',
  'Culture',
  'Weather',
  'Music',
  'News',
  'Sport',
  'Real',
  'World',
  'Travel',
  'Future',
  'Culture',
  'Weather',
  'Music',
  'News',
  'Sport',
  'Real',
  'World',
  'Travel',
  'Future',
  'Culture',
  'Weather',
  'Music',
  'News',
  'Sport',
  'Real',
  'World',
  'Travel',
  'Future',
  'Culture',
  'Weather',
  'Music',
  'News',
  'Sport',
  'Real',
  'World',
  'Travel',
  'Future',
  'Culture',
  'Weather',
  'Music',
  'News',
  'Sport',
  'Real',
  'World',
  'Travel',
  'Future',
  'Culture',
  'Weather',
  'Music',
];
const Index = () => {
  const { isOpen, onToggle } = useDisclosure();
  const color = useColorModeValue('gray.800', 'black');
  return (
    <Box px={[3, 6]} py="5">
      <Text fontSize="md" isTruncated align="center" mb="2">
        Find As Per Taste
      </Text>
      <Box pos="relative">
        <IconButton
          variant="outline"
          onClick={onToggle}
          pos="absolute"
          right="0"
          bottom="-2px"
          aria-label="Show more categories or tags."
          icon={!isOpen ? <TriangleDownIcon /> : <TriangleUpIcon />}
          size="xs"
          colorScheme="blue"
        />
        <Collapse startingHeight={32} in={isOpen}>
          <Wrap spacing="2" justify="center" pr="3">
            {categories.map((val, index) => (
              <WrapItem key={val + index}>
                <Tag
                  variant="solid"
                  bgColor="blue.400"
                  mr="4"
                  size="sm"
                  color={color}
                  p={2}
                  fontWeight="semibold"
                  borderRadius="full"
                >
                  {val}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Collapse>
      </Box>
    </Box>
  );
};

export default Index;
