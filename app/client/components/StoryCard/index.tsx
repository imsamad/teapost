import StoryWrapper from './StoryWrapper';
import StoryMeta from './StoryMeta';
import StoryContent from './StoryContent';

import StoryType from '@lib/types/StoryType';

const StoryCard = ({ story }: { story: StoryType }) => {
  return (
    <StoryWrapper>
      <StoryMeta story={story} />
      <StoryContent story={story} />
    </StoryWrapper>
  );
};

export default StoryCard;
