import React from 'react';
import ImageUploader from '@compo/ImageUploader';

import { updateProfileApi } from '@lib/api/authApi';
import { HStack } from '@chakra-ui/react';
import { useAuthCtx } from '@compo/Context';

const ProfilePic = () => {
  const { auth, setAuth } = useAuthCtx();

  return (
    <>
      <HStack justifyContent="center" my={2}>
        <ImageUploader
          imageUrl={auth?.user?.profilePic}
          imageUploadCB={async (profilePic: string) => {
            updateProfileApi({
              type: 'profilePic',
              reqBody: { profilePic },
            }).then((res) => {
              setAuth({ accessToken: res.accessToken, user: res.user });
            });
          }}
          imageDeleteCB={async () => {
            updateProfileApi({
              type: 'profilePic',
              reqBody: { profilePic: '' },
            }).then((res) => {
              setAuth({ accessToken: res.accessToken, user: res.user });
            });
          }}
        />
      </HStack>
    </>
  );
};

export default ProfilePic;
