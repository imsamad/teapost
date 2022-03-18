import StoryWrapper from "./StoryWrapper";
import StoryMeta from "./StoryMeta";
import StoryDetailsAndAction from "./StoryDetails";
import StoryType from "@lib/types/StoryType";

const Index = ({ story }: { story: StoryType }) => {
  return (
    <StoryWrapper>
      <StoryMeta story={story} />
      <StoryDetailsAndAction story={story} />
    </StoryWrapper>
  );
};

export default Index;
