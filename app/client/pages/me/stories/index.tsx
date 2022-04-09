import MyStories from "@compo/MyStories";
import React from "react";

import DashboardHeader from "@compo/DashboardHeader";
const Index = () => {
  return (
    <>
      <DashboardHeader type="stories" />
      <MyStories />
    </>
  );
};

export default Index;
