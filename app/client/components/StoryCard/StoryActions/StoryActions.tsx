import { ButtonGroup, ThemingProps } from "@chakra-ui/react";

import CommentsAndCollections from "./CommAndColl";
import LikeAndDislike from "./LikeAndDislike";

const Index = ({
  storyId,
  like,
  dislike,
  btnSize = "xs",
  displayFull = false,
}: {
  storyId: string;
  like: number;
  dislike: number;
  btnSize?: ThemingProps<"Button">["size"];
  displayFull?: boolean;
}) => {
  // console.log({ like, dislike });
  return (
    <ButtonGroup spacing={3} alignItems="center">
      <LikeAndDislike
        storyId={storyId}
        like={like}
        dislike={dislike}
        size={btnSize}
        displayFull={displayFull}
      />
      <CommentsAndCollections
        storyId={storyId}
        size={btnSize}
        displayFull={displayFull}
      />
    </ButtonGroup>
  );
};

export default Index;