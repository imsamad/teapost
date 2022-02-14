import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { GiQuill } from 'react-icons/gi';
import { GetServerSideProps } from 'next';
import { applyServerSideCookie } from 'next-universal-cookie';
import { useRouter } from 'next/router';

import MyInput from '../../../../components/FormFields/Input';
import Published from '../../../../components/StoryForm/Published';
import axios, { AxiosRequestConfig } from 'axios';
import TagSelect from '.././../../../components/StoryForm/Tags';
import AddTags from '../../../../components/StoryForm/Tags/AddTags';
import { changeSlug, submitStory } from '../../../../lib/createStory';
import Quill from '../../../../components/Quill';
import { useEffect } from 'react';

const StoryForm = ({ story, accessToken }: any) => {
  const router = useRouter();
  const toast = useToast();
  const saveToast = (title: string, position?: any) =>
    toast({
      title,
      status: 'success',
      duration: 1000,
      isClosable: true,
      position: position || 'bottom',
    });
  const changeSlugToast = () =>
    toast({
      title: 'This slug already existed.',
      status: 'error',
      duration: 5000,
      variant: 'subtle',
      position: 'top-right',
      isClosable: true,
    });

  useEffect(() => {
    const unloadCallback = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      return '';
    };
    window.addEventListener('beforeunload', unloadCallback);
    return () => window.removeEventListener('beforeunload', unloadCallback);
  }, []);

  const handleStorySlugChange =
    (reqObj: { id: string; slug: string }) => async () => {
      changeSlug(reqObj, accessToken)
        .then((res) => {
          router.push(`/me/story/write/${reqObj.slug}`, undefined, {
            shallow: true,
          });
          saveToast('Slug Changed.', 'top-right');
        })
        .catch((err: any) => {
          changeSlugToast();
        });
    };

  return (
    <Box p={[0, 4]}>
      <HStack justifyContent="center">
        <Icon as={GiQuill} />
        <Heading textAlign="center" mx="2" size="lg">
          Write a story
        </Heading>
      </HStack>

      <Formik
        initialValues={{
          title: '',
          slug: '',
          subtitle: '',
          body: '',
          keywords: '',
          tags: [],
          additionalTags: [],
          isPublished: story.isPublished || false,
          ...story,
        }}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          const data = await submitStory(values, accessToken);
          actions.resetForm();
          actions.setValues(data);
          actions.setSubmitting(false);
          saveToast('Saved Changes.');
        }}
      >
        {(formikProps: any) => {
          return (
            <Form>
              <HStack justifyContent="flex-end" my="4">
                <Flex justifyContent="center" alignItems="center">
                  <Text size="md" mx="4">
                    Published
                  </Text>
                  {/* <MySwitch name="isPublished" size="md" /> */}
                  <Published />
                </Flex>
              </HStack>
              <Divider my="4" />
              <SimpleGrid gap={2}>
                <SimpleGrid columns={[1, 2, 2]} gap={4}>
                  <MyInput
                    name="title"
                    placeholder="Title"
                    label="Title"
                    size="sm"
                  />
                  <HStack>
                    <MyInput
                      name="slug"
                      placeholder="Slug"
                      label="Slug"
                      size="sm"
                    />
                    <Button
                      size="sm"
                      alignSelf="self-end"
                      onClick={handleStorySlugChange({
                        slug: formikProps.values.slug,
                        id: formikProps.values.id,
                      })}
                    >
                      Save
                    </Button>
                  </HStack>
                  <TagSelect />
                  <Stack alignItems="center">
                    <MyInput
                      name="subtitle"
                      placeholder="Subtitle"
                      label="Subtitle"
                      size="sm"
                    />
                    <AddTags />
                  </Stack>
                </SimpleGrid>
                <MyInput
                  name="keywords"
                  placeholder="Keywords"
                  label="Keywords"
                  size="sm"
                />

                <Quill />
                <Button
                  variant="solid"
                  colorScheme="blue"
                  disabled={!formikProps.dirty}
                  isLoading={formikProps.isSubmitting}
                  loadingText="Submitting"
                  type="submit"
                >
                  Submit
                </Button>
              </SimpleGrid>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
  query,
}): Promise<any> => {
  applyServerSideCookie(req, res);
  const allCookies = req.cookies;
  const userAuthCookie = process.env.AUTH_SESSION as string,
    refreshTokenCookie = process.env.REFRESH_AUTH_SESSION as string;

  // @ts-ignore
  const slug = params.slug || query.slug;
  if (!allCookies[userAuthCookie]) {
    return {
      redirect: {
        destination: `/auth?redirectTo=/me/story/create/${slug}`,
        permanent: false,
      },
    };
  }
  // @ts-ignore
  const accessToken = JSON.parse(allCookies[userAuthCookie]).accessToken,
    refToken = allCookies[refreshTokenCookie];

  const axiosArgs: AxiosRequestConfig = {
    method: 'POST',
    url: process.env.API_URL + '/story',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    data: {
      slug,
    },
  };

  try {
    const { data } = await axios(axiosArgs);

    return {
      props: {
        story: data.data,
        accessToken,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default StoryForm;
