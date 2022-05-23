import StoryType from '@lib/types/StoryType';
import UserType from '@lib/types/UserType';
import axios from '../axios';

export const blockUnBlockUsersAdminApi = async ({
  userIds,
  isBlock,
}: {
  userIds: string[];
  isBlock: boolean;
}) => {
  try {
    const { data } = await axios.put<{ message: string }>(
      isBlock ? '/admin/block' : '/admin/unblock',
      { userIds }
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const publishUnPublishStoriesAdminApi = async ({
  storyIds,
  isPublish,
}: {
  storyIds: string[];
  isPublish: boolean;
}) => {
  try {
    const { data } = await axios.put<{ message: string }>(
      isPublish ? '/admin/publish' : '/admin/unpublish',
      { storyIds }
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const giveMeDataAdminApi = async (
  dataType: 'users' | 'stories' | 'users,stories'
) => {
  try {
    const { data } = await axios.get<{
      users: UserType[];
      stories: StoryType[];
    }>(`/admin/giveMeData?data=${dataType}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
