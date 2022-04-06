const users = [
  {
    _id: "6221be7444eaf2d6fc67b964",
    username: "imsamad",
    email: "imsamad@gmail.com",
    password: "Password@1206",
    role: "reader",
    fullName: "I M Samad",
    isEmailVerified: false,
    isAuthorised: true,
    tagLines: ["Programmer", "Author of example.com", " Technical Writer"],
  },
  {
    _id: "6221be8f44eaf2d6fc67b96a",

    username: "username1",
    email: "username1@gmail.com",
    password: "Password@1206",
    fullName: "User One",
    role: "reader",
    isEmailVerified: false,
    isAuthorised: true,
    tagLines: ["Programmer", "Author of example.com", " Technical Writer"],
  },
  {
    _id: "6221be9844eaf2d6fc67b96f",

    fullName: "User Two",
    username: "username2",
    email: "username2@gmail.com",
    password: "Password@1206",
    role: "reader",
    isEmailVerified: false,
    isAuthorised: true,
    tagLines: ["Programmer", "Author of example.com", " Technical Writer"],
  },
  {
    _id: "6221bea144eaf2d6fc67b974",
    fullName: "User Three",

    username: "username3",
    email: "username3@gmail.com",
    password: "Password@1206",
    role: "reader",
    isEmailVerified: false,
    isAuthorised: true,
    tagLines: ["Programmer", "Author of example.com", " Technical Writer"],
  },
  {
    _id: "6221beaa44eaf2d6fc67b979",
    username: "username4",
    fullName: "User Four",

    email: "username4@gmail.com",
    password: "Password@1206",
    role: "reader",
    isEmailVerified: false,
    isAuthorised: true,
    tagLines: ["Programmer", "Author of example.com", " Technical Writer"],
  },
  {
    _id: "6221beb144eaf2d6fc67b97e",
    fullName: "User Five",

    username: "username5",
    email: "username5@gmail.com",
    password: "Password@1206",
    role: "reader",
    isEmailVerified: false,
    isAuthorised: true,
    tagLines: ["Programmer", "Author of example.com", " Technical Writer"],
  },
];
export default users;
import axios from "axios";
import { lorem } from "../../src/lib/utils";
export const createUsers = async () => {
  const { data: users } = await axios.get<
    { name: string; email: string; username: string }[]
  >(`https://jsonplaceholder.typicode.com/users`);

  return users.map(({ name, username, email }) => ({
    fullName: name,
    username,
    email,
    profilePic: "https://i.pravatar.cc/300",
    role: "reader",
    password: "Password@1206",
    isEmailVerified: true,
    isAuthorised: true,
    tagLines: [
      lorem.generateWords(2),
      lorem.generateWords(2),
      lorem.generateWords(2),
    ],
  }));
};
