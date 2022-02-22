import {
  Badge,
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Square,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import AuthorBadge from '../AuthorBadge';
import StoryCardActions from '../StoryCardActions';

const imageUrl = `https://res.cloudinary.com/dnkb5aetl/image/upload/c_scale,w_200,h_134/v1645525350/iqlkldocqxn9gg6pw58l.jpg`;
const heading = `The First Step To An inclusive work culture Getting Your colleaguses
Rights The First S The First Step To An inclusive work culture Getting
Your colleaguses Rights The First S`;
const subheading = `It’s your responsibility to appreciate and celebrate the diversity of
your coworkers It’s your responsibility to appreciate and celebrate
the diversity of your coworkers`;
const red = '0px solid red';
const black = '0px solid black';
const green = '0px solid green';
const Index = () => {
  // Here's the signature
  const value = useColorModeValue('rgba(41,41,41)', 'gray.100');
  return (
    <Stack
      my={4}
      p="8px"
      shadow="md"
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      overflow="hidden"
      // alignItems="center"
      h={['155px', '155px', '210px']}
    >
      <HStack fontSize={['10px', '13px']} border={black}>
        <AuthorBadge
          image="https://bit.ly/tioluwani-kolawole"
          full_name="Kola Tioluwani"
          short_name="imsamad"
        />

        <Spacer />
        <StoryMeta />
      </HStack>
      <Flex border={red}>
        <Box pr="15px" flex="1">
          <Heading
            my="4px"
            as="h1"
            fontWeight={700}
            fontSize={['16px', '22px']}
            // color={value}
            // color="rgba(41,41,41)"
            textOverflow="ellipsis"
            // lineHeight="28px"
            noOfLines={[3, 2]}
          >
            {heading + heading}
            {/* {heading.substring(0, 90)} */}
          </Heading>
          <Box display={['none', 'none', '-webkit-box']}>
            <Heading
              m="0"
              my="8px"
              as="h1"
              fontWeight={400}
              size="16px"
              // color="rgba(117,117,117)"
              noOfLines={[0, 1, 2]}
              textOverflow="ellipsis"
              // lineHeight="20px"
            >
              {subheading + subheading}
            </Heading>
          </Box>

          <StoryCardActions />
        </Box>
        <Center
          border="0px solid red"
          minW="85px"
          w={['110px', '120px', '200px']}
        >
          <Image src={imageUrl} alt="altsdcs" />
        </Center>
      </Flex>
    </Stack>
  );
};

const StoryMeta = () => {
  return (
    <HStack
      spacing={2}
      // display={['none', 'none', 'flex']}
      alignItems="center"
    >
      <CustomBadges
        // @ts-ignore
        fontWeight={100}
      >
        |
      </CustomBadges>

      {/* <HStack display={['none', 'none', 'flex']} alignItems="center"> */}
      <CustomBadges>6 min</CustomBadges>
      <CustomBadges>~</CustomBadges>
      <Box bgColor="gray.200" px="2px" borderRadius="md">
        <CustomBadges> Removed</CustomBadges>
      </Box>

      <CustomBadges>~</CustomBadges>
      {/* </HStack> */}
      <CustomBadges>{`Feb 17`}</CustomBadges>
    </HStack>
  );
};

const CustomBadges = ({ children, ...rest }: { children: React.ReactNode }) => {
  return (
    <Text
      // fontSize={13}
      fontWeight={400}
      // color="rgba(117,117,117)"
      lineHeight="20px"
      whiteSpace="nowrap"
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Index;
