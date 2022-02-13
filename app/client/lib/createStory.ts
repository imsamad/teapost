import axios from 'axios';

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
      url: `${process.env.NEXT_PUBLIC_API_URL}/story`,
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
