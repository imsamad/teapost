import router from "next/router";
import { useEffect } from "react";
import { nanoid } from "nanoid";
const Index = () => {
  useEffect(() => {
    router.replace(`/me/story/write/${nanoid()}`);
  });
  return "redirect...";
};

export default Index;
