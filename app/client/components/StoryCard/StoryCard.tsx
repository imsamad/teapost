import StoryWrapper from "./StoryWrapper";
import StoryMeta from "./StoryMeta";
import StoryContentAndAction from "./StoryContent";
import StoryType from "@lib/types/StoryType";

const Index = ({ story }: { story: StoryType }) => {
  return (
    <StoryWrapper>
      <StoryMeta story={story} />
      <StoryContentAndAction story={story} />
    </StoryWrapper>
  );
};

export default Index;
