import { Box, Center, Flex, Heading, Stack } from '@chakra-ui/react';
// @ts-ignore
import { Image } from 'cloudinary-react';
import StoryActions from '../StoryActions';
import MyLink from '../../MyLink';

const index = ({ id, titleImage, title, subtitle, slug }: any) => {
  return (
    <Flex>
      <Stack pr="15px" flex="1">
        <MyLink href={`/story/${slug}`}>
          <Box role="group">
            <Heading
              my="4px"
              as="h1"
              fontWeight={600}
              fontSize="md"
              color="rgb(41,41,41)"
              textOverflow="ellipsis"
              noOfLines={[3, 2]}
              _dark={{
                color: 'gray.200',
              }}
              _groupHover={{ color: 'rgba(41,41,41,0.7)' }}
            >
              {title}
            </Heading>

            <Box display={['none', 'none', '-webkit-box']}>
              <Heading
                my="8px"
                as="h1"
                fontWeight={500}
                fontSize="lg"
                color="rgb(117,117,117)"
                noOfLines={[0, 1, 2]}
                textOverflow="ellipsis"
                _dark={{
                  color: 'gray.300',
                }}
                _groupHover={{ color: 'rgba(117,117,117,0.7)' }}
              >
                {subtitle}
              </Heading>
            </Box>
          </Box>
        </MyLink>
        <StoryActions storyId={id} />
      </Stack>
      <MyLink href={`/story/${slug}`}>
        <Center minW="85px" w={['110px', '120px', '200px']}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            cloudName="dnkb5aetl"
            publicId={titleImage.split('/').pop().split('.')[0]}
            width={200}
            height={134}
            crop="scale"
          />
        </Center>{' '}
      </MyLink>
    </Flex>
  );
};

export default index;
