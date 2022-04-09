import MyAccount from "@compo/MyAccount";
import React from "react";

import DashboardHeader from "@compo/DashboardHeader";
const Index = () => {
  return (
    <>
      <DashboardHeader type="account" />
      <MyAccount />
    </>
  );
};

export default Index;
