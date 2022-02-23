import StoryWrapper from './StoryWrapper';
import StoryMeta from './StoryMeta';
import StoryDetailsAndAction from './StoryDetails';
import MyLink from '../MyLink';

const Index = ({ story }: any) => {
  return (
    <MyLink
      href={`/story/${story.slug}`}
      _active={{
        bgColor: 'transparent',
        boxShadow: 'none',
        WebkitTapHighlightColor: 'transparent',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        MozBackfaceVisibility: 'hidden',
      }}
      _focus={{
        bgColor: 'transparent',
        boxShadow: 'none',
        WebkitTapHighlightColor: 'transparent',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        MozBackfaceVisibility: 'hidden',
      }}
    >
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
    </MyLink>
  );
};

export default Index;
