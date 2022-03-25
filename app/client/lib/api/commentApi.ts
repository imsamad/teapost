import axios from "../axios";

export const commentActions = async ({
  isPrimary,
  text,
  commentId,
  type,
}: {
  isPrimary: boolean;
  text?: string;
  commentId: string;
  type: "edit" | "delete" | "reply";
}) => {
  try {
    let axiosInstance = axios;
    if (type == "reply")
      axiosInstance.post(
        `/comments/reply/to/${
          isPrimary ? "primary" : "secondary"
        }/${commentId}`,
        { text }
      );
    else if (type == "edit")
      axiosInstance.put(
        `/comments/${isPrimary ? "primary" : "secondary"}/${commentId}`,
        { text }
      );
    else if (type == "delete")
      axiosInstance.delete(
        `/comments/${isPrimary ? "primary" : "secondary"}/${commentId}`
      );
    else if (type == "onstory")
      axiosInstance.put(
        `/stories/${isPrimary ? "primary" : "secondary"}/${commentId}`
      );
    // @ts-ignore
    const { data } = await axiosInstance;
    return data;
  } catch (err) {
    return false;
  }
};

export const likeOrDislikeComment = async ({
  isLike,
  undo,
  isPrimary,
  commentId,
}: {
  isLike: boolean;
  undo: boolean;
  isPrimary: boolean;
  commentId: string;
}) => {
  try {
    let endpoint: string = `/comments/${isLike ? "like" : "dislike"}`;
    if (undo) endpoint = `${endpoint}/undo`;
    endpoint = `${endpoint}/${
      isPrimary ? "primary" : "secondary"
    }/${commentId}`;

    const { data } = await axios.put(endpoint);
    return data;
  } catch (err) {
    return false;
  }
};

export const getCommentsOfStory = async (storyId: string) => {
  try {
    const { data } = await axios.get(`/comments/story/${storyId}`);
    return data;
  } catch (err) {
    return false;
  }
};

export const getRepliesOf = async (primaryId: string) => {
  try {
    const { data } = await axios.get(`/comments/replyof/${primaryId}`);
    return data;
  } catch (err) {
    return false;
  }
};
