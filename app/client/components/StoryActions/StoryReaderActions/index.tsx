import { ButtonGroup } from '@chakra-ui/react';

import LikeAndDislike from './LikeAndDislike';
import CollectionDrawer from '@compo/CollectionDrawer';
import ShareButton from '@compo/ShareButton';
import Comments from '@compo/Comments';

const StoryReaderActions = ({
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
      <Comments storyId={storyId} noOfComments={noOfComments} />
      <CollectionDrawer storyId={storyId} />
      <ShareButton share={share} />
    </ButtonGroup>
  );
};

export default StoryReaderActions;
