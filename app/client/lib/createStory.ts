// @ts-ignore
import axios from '#axios';

export const submitStory = async (val: any) => {
  let storyObjKey: any = [
    'id',
    'title',
    'subtitle',
    'slug',
    'tags',
    'body',
    'keywords',
    'additionalTags',
    'titleImage',
  ];
  let storyObj: any = { isPublished: false };
  storyObjKey.forEach((key: string) => {
    if (val[key]?.length) storyObj[key] = val[key];
  });
  try {
    const { data } = await axios.post('/story', { ...storyObj });
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const changeSlug = async (reqBody: { id: string; slug: string }) => {
  try {
    const { data } = await axios.put('/story/changeslug', {
      ...reqBody,
    });
    return data.data;
  } catch (err: any) {
    throw err.response.data;
  }
};
