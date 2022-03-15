import { NextFunction, Request, Response } from "express";

import { isValidObjectId } from "mongoose";
import { typeOf } from "../lib/utils";
import StoryMetaModel from "../models/StoryMetaModel";

export const filter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let reqQuery: Partial<{
    title: string;
    subtitle: string;
    like: Partial<{ gt: number; lt: number; gte: number; lte: number }>;
    dislike: Partial<{ gt: number; lt: number; gte: number; lte: number }>;
    tags: string[];
    author: string[];
  }> = {};

  let allowedFields = [
    { key: "title", type: "string" },
    { key: "subtitle", type: "string" },
    { key: "like", type: "object" },
    { key: "dislike", type: "object" },
    { key: "tags", type: "stringArr" },
    { key: "author", type: "stringArr" },
  ];

  allowedFields.forEach(async ({ key, type }: any) => {
    if (type == "stringArr" && req.query?.[key]?.length) {
      // @ts-ignore
      const arr = req?.query[key].split(",");
      if (arr.every((ar: any) => isValidObjectId(ar)))
        // @ts-ignore
        reqQuery[key] = arr;
    } else if (typeOf(req.query?.[key], type)) {
      // @ts-ignore
      reqQuery[key] = req.query[key];
    }
  });

  let likeOrDislike: any;

  if (typeOf(reqQuery?.like, "object") || typeOf(reqQuery?.dislike, "object")) {
    const like: any = reqQuery.like,
      dislike: any = reqQuery.dislike,
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
      likeOrDislike = StoryMetaModel.find(query).select("_id").lean();
  }

  const finalQuery = () =>
    new Promise(async (resolve) => {
      let obj: any = {};
      if (reqQuery.tags) {
        obj.tags = {};
        obj.tags.$in = reqQuery.tags;
      }
      if (reqQuery.title) obj.title = new RegExp(`${reqQuery.title}`, "gi");
      if (reqQuery.subtitle)
        obj.subtitle = new RegExp(`${reqQuery.subtitle}`, "gi");
      if (reqQuery.author) {
        obj.author = {};
        obj.author.$in = reqQuery.author;
      }

      if (likeOrDislike) {
        const likeOrDislikeRes = await likeOrDislike;
        if (likeOrDislikeRes.length) {
          let $in = likeOrDislikeRes.map((story: any) => story._id.toString());
          obj = { ...obj, _id: { $in } };

          resolve(obj);
        } else {
          return res.json({
            status: "ok",
            stories: [],
          });
        }
      } else {
        resolve(obj);
      }
    });

  req.query = {};
  //   @ts-ignore
  req.query = await finalQuery();
  next();
};
