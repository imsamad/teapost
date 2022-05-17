import StoryType, { StoryFormType } from '@lib/types/StoryType';
import UserType from '@lib/types/UserType';
import { impStoryFields } from '@lib/utils';
import axios from '../axios';

interface SubmitStoryType extends Partial<Omit<StoryFormType, '_id'>> {
  _id: string;
}

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

export const publishedStory = async ({
  isPublished,
  storyId,
}: {
  isPublished: boolean;
  storyId: string;
}) => {
  try {
    const { data } = await axios.put<{ story: StoryType }>(
      `/stories/published/${storyId}`,
      {
        isPublished,
      }
    );
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const getStories = async (page = 1, queryType?: string) => {
  try {
    let endpoint = `/stories`;
    if (queryType) endpoint += `?${queryType}&page=${page}`;
    const { data } = await axios.get<{
      stories: StoryType[];
      authors: UserType[];
      pagination: { next: number; prev: number; limit: number };
    }>(endpoint);
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

    const { data } = await axios.put(`/stories/collab/${storyId}`, body);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};
