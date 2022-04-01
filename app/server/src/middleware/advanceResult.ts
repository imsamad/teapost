import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

const advancedResults =
  (
    populate?: string[],
    stringPatterns?: string[],
    outerFields?: [
      {
        name: string;
        model: Model<any>;
        attachWith: string;
      }
    ]
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // Copy req.query
    let reqQuery: any = { ...req.query };

    // Fields to exclude
    const removeFields = ["select", "sort", "populate"];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    stringPatterns?.forEach((pattern) => {
      if (reqQuery[pattern]) {
        if (!reqQuery?.$or) reqQuery.$or = [];
        reqQuery.$or = [
          ...reqQuery?.$or,
          {
            //@ts-ignore
            [pattern]: new RegExp(reqQuery[pattern], "gi"),
          },
        ];

        delete reqQuery[pattern];
      }
    });

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    reqQuery = JSON.parse(queryStr);

    // Select Fields
    if (req.query.select) {
      // @ts-ignore
      reqQuery.select = req.query.select?.split(",").join(" ");
    }

    // Sort
    if (req.query.sort) {
      //@ts-ignore
      reqQuery.sort = req.query.sort?.split(",").join(" ");
    } else {
      // reqQuery.sort = "-createdAt";
    }

    if (req.query.populate) {
      //@ts-ignore
      reqQuery.populate = req.query.populate?.split(",").join(" ");
    }
    if (populate) {
      if (!reqQuery.populate) reqQuery.populate = [];
      reqQuery.populate.push(populate);
    }

    let { select, sort, populate: populateClone, ...rest } = reqQuery;
    req.query = { query: rest, select, sort, populate: populateClone };

    next();
  };

export { advancedResults };
