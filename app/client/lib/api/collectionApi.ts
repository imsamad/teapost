import axios from "../axios";

export const createCollection = async (reqBody: any) => {
  try {
    const { data } = await axios.post("/collection", reqBody);
    return data;
  } catch (err: any) {
    return false;
  }
};

export const deleteCollection = async (collId: string) => {
  try {
    const { data } = await axios.delete("/collection/" + collId);
    return data;
  } catch (err: any) {
    return false;
  }
};

export const addToCollection = async (
  reqObj: {
    addTo: string[];
    removeFrom: string[];
  },
  storyId: string
) => {
  try {
    const { data } = await axios.put(
      `/collection/addstories/${storyId}`,
      reqObj
    );
    return data;
  } catch (err: any) {
    throw err?.response?.data || "Invalid Data";
  }
};
