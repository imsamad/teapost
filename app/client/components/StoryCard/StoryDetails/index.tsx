import { Box, Center, Heading, HStack, Stack } from "@chakra-ui/react";
// @ts-ignore
import { Image } from "cloudinary-react";
import StoryActions from "../StoryActions";
import MyLink from "../../MyLink";
import storyType from "@lib/types/storyType";

const index = ({
  story: {
    _id,
    titleImage,
    title,
    subtitle,
    slug,
    meta: { likedBy, dislikedBy },
  },
}: {
  story: storyType;
}) => {
  return (
    <HStack>
      <Stack pr="15px" flex="1">
        <MyLink href={`/story/${slug}`}>
          <Stack role="group">
            <Heading
              my="4px"
              as="h1"
              fontWeight={600}
              fontSize="md"
              color="rgb(41,41,41)"
              textOverflow="ellipsis"
              noOfLines={[3, 2]}
              _dark={{
                color: "gray.200",
              }}
              _groupHover={{ color: "rgba(41,41,41,0.8)" }}
            >
              {title}
            </Heading>

            <Box display={["none", "none", "-webkit-box"]}>
              <Heading
                my="8px"
                as="h1"
                fontWeight={500}
                fontSize="lg"
                color="rgb(117,117,117)"
                noOfLines={[0, 1, 2]}
                textOverflow="ellipsis"
                _dark={{
                  color: "gray.300",
                }}
                _groupHover={{ color: "rgba(117,117,117,0.7)" }}
              >
                {subtitle}
              </Heading>
            </Box>
          </Stack>
        </MyLink>
        <StoryActions
          storyId={_id}
          like={likedBy.length}
          dislike={dislikedBy.length}
        />
      </Stack>
      <MyLink href={`/story/${slug}`}>
        <Center minW="85px" w={["110px", "120px", "200px"]}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
            // @ts-ignore
            publicId={titleImage?.split("/").pop().split(".")[0]}
            width={200}
            height={134}
            crop="scale"
          />
        </Center>
      </MyLink>
    </HStack>
  );
};

export default index;
