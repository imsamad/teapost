import React, { createContext, useContext, useEffect, useState } from "react";

import { CombineComment } from "../../../../lib/types/CommentTypes";
import Comment from "../Comment";

const Ctx = createContext<{
  addedComments: CombineComment[];
  setAddComments: (comment: CombineComment, isDelete?: boolean) => void;
  noOfReplies: number;
  setNoOfReplies: (num: number) => void;
}>({
  addedComments: [],
  setAddComments: (comment, isDelete) => {},
  noOfReplies: 0,
  setNoOfReplies: (num) => {},
});

export const CtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [addedComments, setAddCommentsState] = useState<CombineComment[]>([]);
  const [noOfReplies, setNoOfRepliesState] = useState(0);
  const setNoOfReplies = (num: number) => {
    setNoOfRepliesState(num + noOfReplies);
  };
  const setAddComments = (comment: CombineComment, isDelete = false) => {
    if (isDelete) setAddCommentsState([]);
    else setAddCommentsState((pre) => [...pre, comment]);
  };
  return (
    <Ctx.Provider
      value={{ addedComments, setAddComments, noOfReplies, setNoOfReplies }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useCTX = () => useContext(Ctx);

export const Render = () => {
  const { addedComments } = useCTX();

  return (
    <>
      {addedComments.map((comment) => (
        <Comment key={comment._id} isPrimary={false} comment={comment} />
      ))}
    </>
  );
};
