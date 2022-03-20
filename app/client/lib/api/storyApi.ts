import axios from "../axios";

export const submitStory = async (val: any) => {
  let storyObjKey: any = [
    "id",
    "title",
    "subtitle",
    "slug",
    "tags",
    "body",
    "keywords",
    "additionalTags",
    "titleImage",
  ];
  let storyObj: any = { isPublished: val.isPublished };
  storyObjKey.forEach((key: string) => {
    if (val[key]?.length) storyObj[key] = val[key];
  });
  try {
    const { data } = await axios.post("/stories", { ...storyObj });
    return data;
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
    console.log("Error from api commentOnStory", err);
    return false;
  }
};
