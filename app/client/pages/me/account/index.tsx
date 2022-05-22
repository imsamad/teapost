import MyAccount from '@compo/MyAccount';

import DashboardHeader from '@compo/DashboardHeader';
const Index = () => {
  return (
    <>
      <DashboardHeader type="account" />
      <MyAccount />
    </>
  );
};

export default Index;
