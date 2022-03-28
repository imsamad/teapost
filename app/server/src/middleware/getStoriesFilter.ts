import { NextFunction, Request, Response } from "express";

import { isValidObjectId } from "mongoose";
import { typeOf } from "../lib/utils";
import StoryMeta from "../models/StoryMeta";
import Tag from "../models/Tag";
import User from "../models/User";

const isArrOfMongooseObjectId = (arr: string[]) =>
  arr.every((val) => isValidObjectId(val));

export const filter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let reqQuery: Partial<{
    title: string;
    slug: string;
    subtitle: string;

    tags: { $in: string[] };
    author: { $in: string[] };

    like: Partial<{ gt: number; lt: number; gte: number; lte: number }>;
    dislike: Partial<{ gt: number; lt: number; gte: number; lte: number }>;
  }> = {};

  let allowedFields: { key: string; type: string }[] = [
    { key: "id", type: "objIdArr" },

    { key: "title", type: "strPattern" },
    { key: "subtitle", type: "strPattern" },

    { key: "slug", type: "string" },
  ];

  allowedFields.forEach(async ({ key, type }) => {
    if (type == "strPattern" && typeOf(req.query?.[key], "string")) {
      // @ts-ignore
      if (!reqQuery?.$or) reqQuery.$or = [];
      // @ts-ignore
      reqQuery.$or.push({ [key]: new RegExp(`${req.query?.[key]}`, "gi") });
    } else if (type == "string" && typeOf(req.query?.[key], type)) {
      // @ts-ignore
      reqQuery[key] = req.query[key];
    } else if (type == "objIdArr" && typeOf(req.query?.[key], "string")) {
      // @ts-ignore
      const arr: string[] = req.query?.[key]?.split(",");
      console.log("arrarr ", isArrOfMongooseObjectId(arr));
      if (arr && isArrOfMongooseObjectId(arr)) {
        // @ts-ignore
        reqQuery._id = {};
        // @ts-ignore
        reqQuery._id.$in = arr;
      }
    }
  });
  if (typeOf(req.query?.tags, "string")) {
    let titles: string[] = [], // @ts-ignore
      objIds: string[] = req.query.tags.split(",").filter((str: any) => {
        if (isValidObjectId(str)) return str;
        else titles.push(str);
      });

    if (titles.length) {
      const tags = await Tag.find({ title: { $in: titles } });
      if (tags.length) {
        tags.forEach((tag) => objIds.push(tag._id.toString()));
        // @ts-ignore
        reqQuery.tags = {};
        // @ts-ignore
        reqQuery.tags.$in = objIds;
      } else if (objIds.length) {
        // @ts-ignore
        reqQuery.tags = {};
        // @ts-ignore
        reqQuery.tags.$in = objIds;
      } else {
        return res.json({
          status: "ok",
          stories: [],
        });
      }
    } else if (objIds.length) {
      // @ts-ignore
      reqQuery.tags = {};
      // @ts-ignore
      reqQuery.tags.$in = objIds;
    }
  }

  if (typeOf(req.query?.author, "string")) {
    let author: string[] = [], // @ts-ignore
      objIds: string[] = req.query.author.split(",").filter((str: any) => {
        if (isValidObjectId(str)) return str;
        else author.push(str);
      });

    if (author.length) {
      const users = await User.find({ username: { $in: author } });

      if (users.length) {
        users.forEach((user) => objIds.push(user._id.toString()));
        // @ts-ignore
        reqQuery.author = {};
        // @ts-ignore
        reqQuery.author.$in = objIds;
      } else if (!objIds.length) {
        return res.json({
          status: "ok",
          stories: [],
        });
      } else {
        // @ts-ignore
        reqQuery.author = {};
        // @ts-ignore
        reqQuery.author.$in = objIds;
      }
    } else if (objIds.length) {
      // @ts-ignore
      reqQuery.author = {};
      // @ts-ignore
      reqQuery.author.$in = objIds;
    }
  }
  let likeOrDislike: any;

  if (
    typeOf(req.query?.like, "object") ||
    typeOf(req.query?.dislike, "object")
  ) {
    const like: any = req.query.like,
      dislike: any = req.query.dislike,
      query: any = {},
      exist = { $exists: true },
      notExist = { $exists: false };

    if (like?.eq > 0)
      // If ==  2 then index 2,must be not be prsent only  0,1 docs present
      query[`likedBy.${Number(like.eq)}`] = notExist;
    else if (like?.gt > 0)
      // If >  2 then index 2,must be that means 0,1,2 docs present
      query[`likedBy.${Number(like.gt)}`] = exist;
    //  If >= 2 then index 1 must be there
    else if (like?.gte > 0) query[`likedBy.${Number(like.gte) - 1}`] = exist;
    // If 5 ,then index 4 must not be exist
    else if (like?.lt > 0) query[`likedBy.${like.lt - 1}`] = notExist;
    //  If 5, then index 5 must be there
    else if (like?.lte > 0) query[`likedBy.${Number(like.lte)}`] = notExist;

    if (dislike?.eq >= 0) query[`dislikedBy.{${Number(like.eq)}}`] = notExist;
    if (dislike?.gt > 0) query[`dislikedBy.{${Number(like.gt)}}`] = exist;
    else if (dislike?.gte > 0)
      query[`dislikedBy.{${Number(like.gte - 1)}}`] = exist;
    else if (dislike?.lt > 0) query[`dislikedBy.${like.lt - 1}`] = notExist;
    else if (dislike?.lte > 0)
      query[`dislikedBy.${Number(like.lte)}`] = notExist;
    console.log("query ", query);
    if (Object.keys(query).length)
      likeOrDislike = StoryMeta.find(query).select("_id").lean();
  }

  const getIDs = () =>
    new Promise(async (resolve) => {
      if (!likeOrDislike) return resolve({});

      const stories = await likeOrDislike;
      if (!stories.length) {
        return res.json({
          status: "ok",
          message: "No stories founds with this amount of like/dislike",
          stories: [],
        });
      }

      resolve({
        _id: {
          $in: stories.map((story: any) => story._id.toString()),
        },
      });
    });

  //   @ts-ignore
  const selectComments = req.query?.select?.includes("comments");
  req.query = {};
  //   @ts-ignore
  req.query = { ...reqQuery, ...(await getIDs()) };
  if (selectComments) req.query.select = "comments";
  console.log("query ", req.query);
  next();
};
