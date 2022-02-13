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
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { GiQuill } from 'react-icons/gi';
import { GetServerSideProps } from 'next';
import { applyServerSideCookie } from 'next-universal-cookie';
import { useRouter } from 'next/router';

import MyInput from '../../../../components/FormFields/Input';
import MySwitch from '../../../../components/FormFields/Switch';

import axios, { AxiosRequestConfig } from 'axios';
import TagSelect from '.././../../../components/StoryForm/Tags';
import AddTags from '../../../../components/StoryForm/Tags/AddTags';
import { changeSlug, submitStory } from '../../../../lib/createStory';

const StoryForm = ({ story, accessToken }: any) => {
  const router = useRouter();
  const handleStorySlugChange =
    (reqObj: { id: string; slug: string }) => async () => {
      const res = await changeSlug(reqObj, accessToken);
      if (res) {
        router.push(`/me/story/write/${reqObj.slug}`, undefined, {
          shallow: true,
        });
      }
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
          ...story,
        }}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          const data = await submitStory(values, accessToken);
          actions.resetForm();
          actions.setValues(data);
          actions.setSubmitting(false);
        }}
      >
        {(formikProps: any) => {
          typeof window !== 'undefined' &&
            localStorage.setItem(
              'storyform',
              JSON.stringify(formikProps.values)
            );
          return (
            <Form>
              <HStack justifyContent="flex-end" my="4">
                <Flex justifyContent="center" alignItems="center">
                  <Text size="md" mx="4">
                    Published
                  </Text>
                  <MySwitch name="isPublished" size="md" />
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
                <MyInput
                  name="body"
                  placeholder="Body"
                  label="Body"
                  size="sm"
                />
                <Button type="submit">Submit</Button>
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
    // console.log('=======data ', data);

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
