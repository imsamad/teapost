import { NextFunction, Request, Response } from "express";

import { isValidObjectId } from "mongoose";
import { typeOf } from "../lib/utils";
import StoryMeta from "../models/StoryMeta";

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
    { key: "title", type: "strPattern" },
    { key: "subtitle", type: "strPattern" },

    { key: "slug", type: "string" },

    { key: "tags", type: "mongoIdArr" },
    { key: "author", type: "mongoIdArr" },
    // Belongs to storyMeta have to handle carefully
  ];

  allowedFields.forEach(async ({ key, type }) => {
    if (type == "mongoIdArr" && req.query?.[key]?.length) {
      // @ts-ignore
      const arr = req?.query[key].split(",");
      if (isArrOfMongooseObjectId(arr)) {
        // @ts-ignore
        reqQuery[key] = {};
        // @ts-ignore
        reqQuery[key]["$in"] = arr;
      }
    } else if (type == "strPattern" && typeOf(req.query?.[key], type)) {
      // @ts-ignore
      reqQuery[key] = new RegExp(`${req.query?.[key]}`, "gi");
    } else if (type == "string" && typeOf(req.query?.[key], type)) {
      // @ts-ignore
      reqQuery[key] = req.query[key];
    }
  });

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

    if (like?.gt > 0)
      // If 1 then index 0,must be there
      query[`likedBy.${Number(like.gt)}`] = exist;
    //  If 1 then index 1 must be there
    else if (like?.gte > 0) query[`likedBy.${Number(like.gte - 1)}`] = exist;
    // If 5 ,then index 4 must not be exist
    else if (like?.lt > 0) query[`likedBy.${like.lt - 1}`] = notExist;
    //  If 5, then index 5 must be there
    else if (like?.lte > 0) query[`likedBy.${Number(like.lte)}`] = notExist;

    if (dislike?.gt > 0) query[`dislikedBy.{${Number(like.gt)}}`] = exist;
    else if (dislike?.gte > 0)
      query[`dislikedBy.{${Number(like.gte - 1)}}`] = exist;
    else if (dislike?.lt > 0) query[`dislikedBy.${like.lt - 1}`] = notExist;
    else if (dislike?.lte > 0)
      query[`dislikedBy.${Number(like.lte)}`] = notExist;

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
  next();
};
