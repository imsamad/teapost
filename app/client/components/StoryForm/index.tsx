import { Button, HStack, Text, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { submitStory } from '@lib/api/storyApi';

import FormBody from './FormBody';
import StoryType, { StoryFormType } from '@lib/types/StoryType';
import { mutate } from 'swr';
import { impStoryFields } from '@lib/utils';

const initValues: StoryFormType = {
  _id: '',
  title: '',
  titleImage: '',
  subtitle: '',
  slug: '',
  keywords: '',

  content: '',

  tags: [],
  additionalTags: [],

  isPublished: false,
  collabWith: [],
};

const Index = ({ story }: { story: Partial<StoryType> }) => {
  const router = useRouter();
  useEffect(() => {
    const unloadCallback = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      return '';
    };
    // window.addEventListener('beforeunload', unloadCallback);
    // return () => window.removeEventListener('beforeunload', unloadCallback);
  }, []);
  const toast = useToast();
  const saveToast = (title: string, position?: any) =>
    toast({
      title,
      status: 'success',
      duration: 1000,
      isClosable: true,
      position: position || 'bottom',
    });

  useEffect(() => {
    localStorage.setItem('story', JSON.stringify(impStoryFields(story)));
    return () => localStorage.removeItem('story');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Formik
      initialValues={{
        ...initValues,
        ...story,
      }}
      onSubmit={async (values, actions) => {
        const crtStorySlug = router.query.slug;
        actions.setSubmitting(true);

        const data = await submitStory({
          values,
          type: 'meta',
          storeResToLocal: true,
        });

        if (values.additionalTags.length) {
          await mutate(`${process.env.NEXT_PUBLIC_API_URL}/tags`);
        }
        if (
          router.route == '/me/story/write/[slug]' &&
          crtStorySlug !== data.story.slug
        ) {
          router.push(`/me/story/write/${data.story.slug}`, undefined, {
            shallow: true,
          });
        }

        actions.setSubmitting(false);

        actions.setValues({
          ...initValues,
          ...data.story,
        });
        if (data?.message?.slug) {
          actions.setFieldError('slug', data.message.slug);
          actions.setFieldTouched('slug', true);
        }

        saveToast('Saved Changes.');
      }}
    >
      <Form>
        <FormBody />
      </Form>
    </Formik>
  );
};
export default Index;
