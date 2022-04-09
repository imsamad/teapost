import { StoryHistoryType } from "@lib/types/StoryHistoryType";
import axios from "../axios";

export const deleteStoryHistory = async ({
  historyId,
  storyId,
  isAll,
}: {
  historyId?: StoryHistoryType["_id"];
  storyId: string;
  isAll: boolean;
}) => {
  try {
    let endpoint = `/storyhistories`;
    if (isAll) endpoint += `/${storyId}`;
    else endpoint += `/${storyId}/${historyId}`;

    const { data } = await axios.delete(endpoint);

    return data.data;
  } catch (err: any) {
    throw err.response.data;
  }
};
