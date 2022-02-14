import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
export const submitStory = async (val: any, accessToken: string) => {
  let storyObjKey: any = [
    'id',
    'title',
    'subtitle',
    'slug',
    'tags',
    'body',
    'keywords',
    'additionalTags',
  ];
  let storyObj: any = { isPublished: false };
  storyObjKey.forEach((key: string) => {
    if (val[key]?.length) storyObj[key] = val[key];
  });
  try {
    console.log('storyObj ', storyObj);
    const { data } = await axios({
      method: 'POST',
      url: `${apiUrl}/story`,
      data: storyObj,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('data ', data.data);
    return data.data;
  } catch (err: any) {
    console.log('err ', err?.response);
  }
};

export const changeSlug = async (
  reqBody: { id: string; slug: string },
  accessToken: string
) => {
  try {
    const { data } = await axios({
      method: 'PUT',
      url: `${apiUrl}/story/changeslug`,
      data: reqBody,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return data.data;
  } catch (err: any) {
    throw err.response.data;
  }
};
