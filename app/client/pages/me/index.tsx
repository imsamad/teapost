import React from 'react';
import useUser from '../../lib/useUser';

const Index = () => {
  const { user } = useUser({ redirectTo: '/auth' });
  return <h1> {JSON.stringify(user)} Profile</h1>;
};

export default Index;
