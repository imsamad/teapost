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
let categories = [
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
    <Box py="6">
      <Text
        fontSize="md"
        isTruncated
        align="center"
        mb="2"
        fontWeight="bold"
        fontStyle="italic"
      >
        Find As Per Taste
      </Text>
      <Box pos="relative" pr="12">
        <IconButton
          variant="outline"
          onClick={onToggle}
          pos="absolute"
          right="0"
          top="0"
          aria-label="Show more categories or tags."
          icon={!isOpen ? <TriangleDownIcon /> : <TriangleUpIcon />}
          size="xs"
          colorScheme="blue"
        />
        <Collapse startingHeight={32} in={isOpen} endingHeight={100}>
          <Wrap
            spacing="4"
            justify="center"
            pr="3"
            maxHeight={100}
            overflowY={isOpen ? 'auto' : 'hidden'}
          >
            {categories.map((val, index) => (
              <WrapItem key={val + index}>
                <Tag
                  variant="solid"
                  bgColor="blue.400"
                  color={color}
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
