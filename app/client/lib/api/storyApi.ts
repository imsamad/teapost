import { StoryFormType } from "@lib/types/StoryType";
import axios from "../axios";

interface SubmitStoryType extends Partial<Omit<StoryFormType, "_id">> {
  _id: string;
}

export const submitStory = async ({
  values,
  type,
}: {
  values: SubmitStoryType;
  type: "additionalTags" | "meta" | "content" | "image";
}) => {
  let allowedFields = [
    "id",
    "title",
    "subtitle",
    "slug",
    "keywords",
    "titleImage",
    "additionalTags",
  ];
  let data: any = {};

  // if (type == "additionalTags") {
  //   data.additionalTags = values.additionalTags;
  // } else

  if (type == "content") {
    values._id && (data.id = values._id);
    values.slug && (data.slug = values.slug);
    data.content = values.content;
  } else if (type == "image") {
    values._id && (data.id = values._id);
    values.slug && (data.slug = values.slug);
    data.titleImage = values.titleImage;
  } else {
    allowedFields.forEach((key: string) => {
      // @ts-ignore
      if (values?.[key]?.length) data[key] = values[key];
    });
    data.tags = values.tags;
  }
  try {
    const res = await axios.put(`/stories/${values._id}`, data);
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const changeSlug = async (reqBody: { id: string; slug: string }) => {
  try {
    const { data } = await axios.put("/stories/changeslug", {
      ...reqBody,
    });
    return data.data;
  } catch (err: any) {
    throw err.response.data;
  }
};
type axiosObjType = Partial<{ like: number; dislike: number }>;

type gradeStoryType = {
  storyId: string;
  isLike: boolean;
  undo: boolean;
};

export const likeOrDislikeStory = async (props: gradeStoryType) => {
  try {
    let endpoint = props.isLike ? "/stories/like/" : "/stories/dislike/";
    endpoint += props.undo ? `undo/${props.storyId}` : props.storyId;

    const { data } = await axios.put(`${endpoint}`);
    return data;
  } catch (err: any) {
    // throw err.response.data;
    return false;
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
    const { data } = await axios.put(`/stories/comment/${storyId}`, { text });
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
    const { data } = await axios.put(`/stories/published/${storyId}`, {
      isPublished,
    });
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};
