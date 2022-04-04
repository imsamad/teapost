import { ButtonGroup, ThemingProps } from "@chakra-ui/react";

// import Collections from "./CommAndColl";
import LikeAndDislike from "./LikeAndDislike";
import CommentDrawer from "@compo/CommentDrawer";
import CollectionDrawer from "@compo/CollectionDrawer";
import ShareButton from "@compo/ShareButton";

const Index = ({
  storyId,
  noOfLikes,
  noOfDislikes,
  noOfComments,
  share,
}: {
  storyId: string;
  noOfLikes: number;
  noOfDislikes: number;
  noOfComments: number;
  share: {
    title: string;
    text: string;
    url: string;
  };
}) => {
  return (
    <ButtonGroup spacing={0} alignItems="center">
      <LikeAndDislike
        storyId={storyId}
        noOfLikes={noOfLikes}
        noOfDislikes={noOfDislikes}
      />
      <CommentDrawer storyId={storyId} noOfComments={noOfComments} />
      <CollectionDrawer storyId={storyId} />
      <ShareButton share={share} />
    </ButtonGroup>
  );
};

export default Index;
