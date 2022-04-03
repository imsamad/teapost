import { CombineComment } from "@lib/types/CommentTypes";
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
      axiosInstance.post(`/comments/reply/to/secondary/${commentId}`, { text });
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

export const addComment = async (storyId: string, text: string) => {
  try {
    const { data } = await axios.post<{ comment: CombineComment }>(
      `/comments/primaries/${storyId}`,
      {
        text,
      }
    );
    return data;
  } catch (err: any) {
    throw err.response.data;
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

    const { data } = await axios.put<{ comment: CombineComment }>(endpoint);
    return data;
    // return true;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const getComments = async (storyId: string, isPrimary: boolean) => {
  try {
    const { data } = await axios.get<{ comments: CombineComment[] }>(
      `/comments/${isPrimary ? "primaries" : "secondaries"}/${storyId}`
    );
    return data;
  } catch (err: any) {
    return err;
  }
};

export const getRepliesOf = async (primaryId: string) => {
  try {
    const { data } = await axios.get(`/comments/replyof/${primaryId}`);
    return data;
  } catch (err: any) {
    return err;
  }
};

export const updateComment = async (prop: {
  commentId: string;
  text: string;
  isPrimary: boolean;
}) => {
  try {
    let endpoint = `/comments/${prop.isPrimary ? "primaries" : "secondaries"}/${
      prop.commentId
    }`;

    const { data } = await axios.put<{ comment: CombineComment }>(endpoint, {
      text: prop.text,
    });

    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const deleteComment = async (prop: {
  commentId: string;
  isPrimary: boolean;
}) => {
  try {
    let endpoint = `/comments/${prop.isPrimary ? "primaries" : "secondaries"}/${
      prop.commentId
    }`;

    const { data } = await axios.delete<{ comment: CombineComment }>(endpoint);

    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const replyComment = async (prop: {
  commentId: string;
  text: string;
  isReplyToPrimary: boolean;
}) => {
  try {
    let endpoint = `/comments/secondaries`;
    if (!prop.isReplyToPrimary) endpoint += "/reply";
    endpoint += `/${prop.commentId}`;

    const { data } = await axios.post<{ comment: CombineComment }>(endpoint, {
      text: prop.text,
    });

    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};
