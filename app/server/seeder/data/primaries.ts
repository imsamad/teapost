import { getRndInteger, lorem } from "../../src/lib/utils";

export const primaries = [
  {
    _id: "62319a8a73ec61adcafb713c",
    user: "6221be7444eaf2d6fc67b964",
    story: "6246f5a68e399c2b1c3382e8",
    text: "Awesome",
  },
  {
    _id: "62319ac173ec61adcafb7160",
    user: "6221be7444eaf2d6fc67b964",
    story: "6246f5a68e399c2b1c3382e8",
    text: "Awesome",
  },
  {
    user: "6221be7444eaf2d6fc67b964",
    story: "6246f5a68e399c2b1c3382e9",
    text: "Awesome",
    _id: "62321d8530045292fd1dc654",
  },
  {
    user: "6221be7444eaf2d6fc67b964",
    story: "6246f5a68e399c2b1c3382e9",
    text: "Awesome",
    _id: "62321d9f30045292fd1dc658",
  },
];
import users from "./users";

export const createPrimaries = ({
  userIds = users.map((id) => id._id),
  storyIds,
  qty,
}: {
  userIds?: string[];
  storyIds: string[];
  qty: number;
}) => {
  const comment = (index: number, story: number) => ({
    index,
    user: userIds[index],
    story: storyIds[story],
    text: lorem.generateSentences(1),
  });

  let comments = [];
  for (var s = 0; s < storyIds.length; s++) {
    for (var i = 0; i < qty; i++)
      comments.push(
        comment(getRndInteger(0, userIds?.length || users?.length), s)
      );
  }
  return comments;
};
