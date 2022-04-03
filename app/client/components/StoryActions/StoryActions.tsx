import { ButtonGroup, ThemingProps } from "@chakra-ui/react";

// import Collections from "./CommAndColl";
import LikeAndDislike from "./LikeAndDislike";
import CommentDrawer from "@compo/CommentDrawer";
import CollectionDrawer from "@compo/CollectionDrawer";

const Index = ({
  storyId,
  noOfLikes,
  noOfDislikes,
  noOfComments,
}: {
  storyId: string;
  noOfLikes: number;
  noOfDislikes: number;
  noOfComments: number;
}) => {
  return (
    <ButtonGroup spacing={3} alignItems="center">
      <LikeAndDislike
        storyId={storyId}
        noOfLikes={noOfLikes}
        noOfDislikes={noOfDislikes}
      />
      <CommentDrawer storyId={storyId} noOfComments={noOfComments} />
      <CollectionDrawer storyId={storyId} />
    </ButtonGroup>
  );
};

export default Index;
