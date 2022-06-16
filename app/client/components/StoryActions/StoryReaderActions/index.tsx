import { ButtonGroup } from '@chakra-ui/react';

import LikeAndDislike from './LikeAndDislike';
import CollectionDrawer from '@compo/CollectionDrawer';
import ShareButton from '@compo/ShareButton';
import Comments from '@compo/Comments';
import StoryType from '@lib/types/StoryType';

const StoryReaderActions = ({ story }: { story: StoryType }) => {
  return (
    <ButtonGroup spacing={0} alignItems="center">
      <LikeAndDislike
        storyId={story._id}
        noOfLikes={story.noOfLikes}
        noOfDislikes={story.noOfDislikes}
      />
      <Comments storyId={story._id} noOfComments={story.noOfComments} />
      <CollectionDrawer storyId={story._id} />
      <ShareButton
        share={{
          text: story.subtitle,
          title: story.title,
          url: '/story/' + story.slug,
        }}
      />
    </ButtonGroup>
  );
};

export default StoryReaderActions;
