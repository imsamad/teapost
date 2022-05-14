import { CombineComment } from '@lib/types/CommentTypes';
import axios from '../axios';

export const addCommentApi = async (storyId: string, text: string) => {
  try {
    const { data } = await axios.post<{ comment: CombineComment }>(
      `/comments/primaries/${storyId}`,
      {
        text,
      }
    );
    return data;
  } catch (err: any) {
    throw err.response?.data;
  }
};

export const likeOrDislikeCommentApi = async ({
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
    let endpoint: string = `/comments/grade/${commentId}/${
      isPrimary ? 'primary' : 'secondary'
    }`;
    let reqBody: any = {};
    isLike ? (reqBody.isLike = true) : (reqBody.isDislike = true);
    undo && (reqBody.undo = true);

    const { data } = await axios.patch<{ comment: CombineComment }>(
      endpoint,
      reqBody
    );

    return data;
    // return true;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getComments = async (storyId: string, isPrimary: boolean) => {
  try {
    const { data } = await axios.get<{ comments: CombineComment[] }>(
      `/comments/${isPrimary ? 'primaries' : 'secondaries'}/${storyId}`
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

export const updateCommentApi = async (prop: {
  commentId: string;
  text: string;
  isPrimary: boolean;
}) => {
  try {
    let endpoint = `/comments/${prop.isPrimary ? 'primaries' : 'secondaries'}/${
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

export const deleteCommentApi = async (prop: {
  commentId: string;
  isPrimary: boolean;
}) => {
  try {
    let endpoint = `/comments/${prop.isPrimary ? 'primaries' : 'secondaries'}/${
      prop.commentId
    }`;

    const { data } = await axios.delete<{ comment: CombineComment }>(endpoint);

    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const replyCommentApi = async (prop: {
  commentId: string;
  text: string;
  isPrimary: boolean;
}) => {
  try {
    let endpoint = `/comments/secondaries`;
    if (!prop.isPrimary) endpoint += '/reply';
    endpoint += `/${prop.commentId}`;

    const { data } = await axios.post<{ comment: CombineComment }>(endpoint, {
      text: prop.text,
    });
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};
