import StoryWrapper from './StoryWrapper';
import StoryMeta from './StoryMeta';
import StoryDetailsAndAction from './StoryDetails';

const Index = ({ story }: any) => {
  return (
    <StoryWrapper>
      <StoryMeta
        author={story.author}
        tag={story.tags[0]}
        createdAt={story.updatedAt || story.createdAt}
        slug={story.slug}
      />
      <StoryDetailsAndAction
        id={story.id || story._id}
        titleImage={story.titleImage}
        title={story.title}
        subtitle={story.subtitle}
        slug={story.slug}
      />
    </StoryWrapper>
  );
};

export default Index;
