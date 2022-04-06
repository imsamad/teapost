import { getRndInteger, lorem } from "../../src/lib/utils";

const secondaries = [
  {
    _id: "62319aa773ec61adcafb7147",
    user: "6221be7444eaf2d6fc67b964",
    primary: "62319a8a73ec61adcafb713c",
    text: "Second Awesome",
  },
  {
    _id: "62319aaa73ec61adcafb714b",
    user: "6221be7444eaf2d6fc67b964",
    primary: "62319a8a73ec61adcafb713c",
    text: "Second Awesome ",
  },
  {
    _id: "62319ab773ec61adcafb714f",
    user: "6221be7444eaf2d6fc67b964",
    secondaryUser: "6221be7444eaf2d6fc67b964",
    secondary: "62319aaa73ec61adcafb714b",
    primary: "62319a8a73ec61adcafb713c",
    text: "Tertiary awesome",
  },
  {
    _id: "62319ab873ec61adcafb7153",
    user: "6221be7444eaf2d6fc67b964",
    secondaryUser: "6221be7444eaf2d6fc67b964",
    secondary: "62319aaa73ec61adcafb714b",
    primary: "62319a8a73ec61adcafb713c",
    text: "Tertiary awesome",
  },
  {
    _id: "6231a5da629c6d9059f64fbd",
    user: "6221be7444eaf2d6fc67b964",
    primary: "62319ac173ec61adcafb7160",
    text: "Second Awesome",
  },
  {
    _id: "6231a5e4629c6d9059f64fca",
    user: "6221be7444eaf2d6fc67b964",
    primary: "62319ac173ec61adcafb7160",
    text: "Second Awesome",
  },
  {
    user: "6221be7444eaf2d6fc67b964",
    primary: "62321d9f30045292fd1dc658",
    text: "Second Awesome",
    _id: "62321db730045292fd1dc65c",
  },
  {
    user: "6221be7444eaf2d6fc67b964",
    primary: "62321d9f30045292fd1dc658",
    text: "Second Awesome",
    _id: "62321dd930045292fd1dc660",
  },
  {
    user: "6221be7444eaf2d6fc67b964",
    secondaryUser: "6221be7444eaf2d6fc67b964",
    secondary: "62321deb30045292fd1dc664",
    primary: "62321d9f30045292fd1dc658",
    text: "Tertiary awesome",
    _id: "62321e2b30045292fd1dc66a",
  },
  {
    user: "6221be7444eaf2d6fc67b964",
    secondaryUser: "6221be7444eaf2d6fc67b964",
    secondary: "62321deb30045292fd1dc664",
    primary: "62321d9f30045292fd1dc658",
    text: "Tertiary awesome",
    _id: "62321e3830045292fd1dc66e",
  },
  {
    user: "6221be7444eaf2d6fc67b964",
    secondaryUser: "6221be7444eaf2d6fc67b964",
    secondary: "62321e3830045292fd1dc66e",
    primary: "62321d9f30045292fd1dc658",
    text: "Tertiary awesome",
    _id: "62321e6830045292fd1dc672",
  },
  {
    user: "6221be7444eaf2d6fc67b964",
    primary: "62321d9f30045292fd1dc658",
    text: "Second Awesome",
    _id: "62321e7d30045292fd1dc676",
  },
  {
    user: "6221be7444eaf2d6fc67b964",
    primary: "62321d8530045292fd1dc654",
    text: "Second Awesome",
    _id: "62321f543cce7420c68b4b6b",
  },
];
export default secondaries;

import usersSeed from "./users";
export const createSecondaries = ({
  userIds = usersSeed.map((user) => user._id),
  primaryIds,
  qty = 100,
}: {
  primaryIds: string[];
  userIds?: string[];
  qty?: number;
}) => {
  const comment = (index: number, primary: number) => ({
    user: userIds[index],
    primary: primaryIds[primary],
    text: lorem.generateSentences(1),
  });

  let comments = [];
  for (var j = 0; j < primaryIds.length; j++) {
    for (var i = 0; i < qty; i++) {
      comments.push(comment(getRndInteger(0, userIds.length), j));
    }
  }
  return comments;
};

import users from "./users";

export const secondaryReply = ({
  primary,
  userIds = users.map((user) => user._id),
  secondary,
  secondaryUser,
  qty = 100,
}: {
  primary: string;
  userIds?: string[];
  secondary: string;
  secondaryUser: string;
  qty: number;
}) => {
  const comment = (index: number) => ({
    user: userIds[index],
    secondaryUser: secondaryUser,
    secondary: secondary,
    primary: primary,
    text: lorem.generateSentences(1),
  });

  let comments = [];

  for (var i = 0; i < qty; i++)
    comments.push(comment(i % (userIds.length - 1)));

  return comments;
};
