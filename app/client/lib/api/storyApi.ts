import StoryType, { StoryFormType } from '@lib/types/StoryType';
import { impStoryFields } from '@lib/utils';

import axios from '../axios';

interface SubmitStoryType extends Partial<Omit<StoryFormType, '_id'>> {
  _id: string;
}

export const deleteManyStoriesApi = async (storyIds: string[]) => {
  try {
    const data = await axios.delete<{ stories: StoryType[] }>(
      `/stories/deletemany`,
      {
        data: { storyIds },
      }
    );

    return data;
  } catch (err: any) {
    throw err?.response?.data || err?.response;
  }
};

export const publishManyStoriesApi = async ({
  storyIds,
  isPublish,
}: {
  storyIds: string[];
  isPublish: boolean;
}) => {
  try {
    const data = await axios.patch<{ stories: StoryType[] }>(
      `/stories/${isPublish ? 'published' : 'unpublished'}many`,
      {
        storyIds,
      }
    );

    return data;
  } catch (err: any) {
    throw err?.response?.data || err?.response;
  }
};

export const submitStory = async ({
  values,
  type,
  storeResToLocal,
}: {
  values: SubmitStoryType;
  type: 'meta' | 'content' | 'image' | 'autoSave';
  storeResToLocal?: boolean;
}) => {
  let allowedFields = [
    'title',
    'subtitle',
    'slug',
    'keywords',
    'titleImage',
    'additionalTags',
  ];
  let data: any = {};
  data.id = values._id;
  if (type == 'content') {
    data.content = values.content;
  } else if (type == 'image') {
    data.titleImage = values.titleImage;
  } else {
    allowedFields.forEach((key: string) => {
      // @ts-ignore
      if (values?.[key]?.length) data[key] = values[key];
    });
    data.tags = values.tags;
    if (type == 'autoSave') {
      data.content = values.content;
    }
  }
  try {
    const res = await axios.put<{
      story: StoryType;
      message: any;
    }>(`/stories/${values._id}`, data);
    if (storeResToLocal) {
      localStorage.setItem(
        'story',
        JSON.stringify(impStoryFields(res.data.story))
      );
    }
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const changeSlug = async (reqBody: { id: string; slug: string }) => {
  try {
    const { data } = await axios.put('/stories/changeslug', {
      ...reqBody,
    });
    return data.data;
  } catch (err: any) {
    throw err.response.data;
  }
};

type gradeStoryType = {
  storyId: string;
  isLike: boolean;
  undo: boolean;
};

export const likeOrDislikeStoryApi = async (
  props: gradeStoryType
): Promise<{ story: StoryType }> => {
  try {
    let body = {
      isLike: props.isLike,
      undo: props.undo,
    };
    const { data } = await axios.patch<{ story: StoryType }>(
      `/stories/grade/${props.storyId}`,
      body
    );
    return data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const commentOnStory = async ({
  storyId,
  text,
}: {
  storyId: string;
  text: string;
}) => {
  try {
    const { data } = await axios.post(`/comments/primaries/${storyId}`, {
      text,
    });
    return data;
  } catch (err) {
    return false;
  }
};

export const publishedStoryApi = async ({
  isPublished,
  storyId,
}: {
  isPublished: boolean;
  storyId: string;
}) => {
  try {
    const { data } = await axios.patch<{ story: StoryType }>(
      `/stories/${isPublished ? 'published' : 'unpublished'}/${storyId}`,
      {
        isPublished,
      }
    );
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const getMyStoriesApi = async (type?: 'my' | 'iamcollabing') => {
  try {
    const { data } = await axios.get<{
      stories: StoryType[];
    }>(`/stories/${type}`);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const collabWithApi = async (
  storyId: string,
  body: { addAuthors?: string[]; removeAuthors?: string[] }
) => {
  try {
    if (!body.addAuthors?.length) delete body.addAuthors;
    if (!body.removeAuthors?.length) delete body.removeAuthors;
    if (!body.removeAuthors?.length && !body.addAuthors?.length) return;

    const { data } = await axios.put<{ story: StoryType }>(
      `/stories/collab/${storyId}`,
      body
    );
    return data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const unCollabMeApi = async (storyId: string) => {
  console.log('storyId from collam api', storyId);
  if (!storyId) throw Error('Story is must');
  try {
    const { data } = await axios.put<{
      story: StoryType;
    }>(`/stories/uncollabme/${storyId}`);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const unCollabMeMultipleApi = async (storyIds: string[]) => {
  try {
    const { data } = await axios.put<{
      message: string;
    }>(`/stories/uncollabmemany`, { storyIds });
    return data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
export const deleteMeApi = async () => {
  try {
    const { data } = await axios.delete<{
      message: string;
    }>(`/auth`);
    return data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
