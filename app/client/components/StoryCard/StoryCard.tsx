import StoryWrapper from "./StoryWrapper";
import StoryMeta from "./StoryMeta";
import StoryDetailsAndAction from "./StoryDetails";
import storyType from "@lib/types/storyType";

const Index = ({ story }: { story: storyType }) => {
  return (
    <StoryWrapper>
      <StoryMeta story={story} />
      <StoryDetailsAndAction story={story} />
    </StoryWrapper>
  );
};

export default Index;
