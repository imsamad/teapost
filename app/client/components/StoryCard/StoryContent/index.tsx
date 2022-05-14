import { Box, Center, Heading, HStack, Stack, Image } from '@chakra-ui/react';

import StoryActions from '../../StoryActions';
import MyLink from '../../MyLink';
import StoryType from '@lib/types/StoryType';
import FallbackImage from '@compo/FallbackImage';
import { cloudinaryUrl, placeholderImage } from '@lib/utils';

const index = ({ story }: { story: StoryType }) => {
  return (
    <HStack>
      <Stack pr="15px" flex="1">
        <MyLink href={`/story/${story.slug}`} scroll={false}>
          <Stack role="group">
            <Heading
              my="4px"
              as="h1"
              fontWeight={700}
              fontSize="md"
              color="rgb(41,41,41)"
              textOverflow="ellipsis"
              noOfLines={[3, 2]}
              _dark={{
                color: 'gray.200',
              }}
              _groupHover={{ color: 'rgba(41,41,41,0.8)' }}
            >
              {story.title}
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
                {story.subtitle}
              </Heading>
            </Box>
          </Stack>
        </MyLink>
        <StoryActions
          storyId={story._id}
          noOfLikes={story?.noOfLikes || 0}
          noOfDislikes={story?.noOfDislikes || 0}
          noOfComments={story.noOfComments}
          share={{
            text: story.subtitle,
            title: story.title,
            url: '/story/' + story.slug,
          }}
        />
      </Stack>
      <MyLink href={`/story/${story.slug}`}>
        <Center
          minW="85px"
          overflow="hidden"
          w={['110px', '120px', '200px']}
          zIndex={2}
        >
          <Image
            src={cloudinaryUrl({
              src: story.titleImage,
              width: 200,
              height: 200,
            })}
            fallback={
              <FallbackImage
                width={200}
                height={150}
                title={story.title}
                tryAgain={story.titleImage}
              />
            }
            width={200}
            // htmlWidth={150}
            alt={story.title}
            fallbackSrc={placeholderImage(200, 150)}
          />
        </Center>
      </MyLink>
    </HStack>
  );
};

export default index;
