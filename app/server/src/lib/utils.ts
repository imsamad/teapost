import { NextFunction, Request, Response } from "express";
import slugify from "slugify";
import crypto from "crypto";
import path from "path";
import { nanoid } from "nanoid";
import { AnySchema } from "yup";
import { convert } from "html-to-text";
import { UserDocument } from "../models/User";
import { signJwt } from "./jwt";
import * as yup from "yup";
import { isValidObjectId } from "mongoose";

import { LoremIpsum } from "lorem-ipsum";
// const LoremIpsum = require("lorem-ipsum").LoremIpsum;

export const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export function getRndInteger(min: number, max: number, include = false) {
  return Math.floor(Math.random() * (max - min + (include ? 1 : 0))) + min;
}

export const readingTime = (html: string) => {
  if (!html) return 0;
  const string = convert(html, {
    wordwrap: 80,
  });
  const words = string.trim().split(/\s+/).length;
  const wpm = 200;
  const time = Math.ceil(words / wpm);
  return time;
};

export const randomBytes = (num = 20) =>
  crypto.randomBytes(num).toString("hex");

export const createHash = (str: string) =>
  crypto.createHash("sha256").update(str).digest("hex");

export const typeOf = (
  val: any,
  type: string | "string" | "array" | "object"
) => {
  return !val || val == "undefined" || typeof val == "undefined"
    ? false
    : val.constructor.name.toLowerCase() === type.toLowerCase();
};

export const trimExtra = (
  str: string,
  minLength: number,
  maxLength = Infinity,
  joinBy = " "
): boolean => {
  if (!str) return false;
  let splitted = str.split(/\s/g);
  let filteredVoidStr = splitted.filter((val: string) => val !== "");
  let joined = filteredVoidStr.join(joinBy);
  return joined.length >= minLength && joined.length < maxLength ? true : false;
};

export type ErrorResponseType = {
  statusCode: number;
  message: string | string[] | {};
};

export const ErrorResponse = (
  statusCode: number,
  message: string | string[] | {}
): ErrorResponseType => {
  return { statusCode, message };
};

/*
export function ErrorResponseConstrutorType(
  statusCode: number,
  message: string | string[] | {}
): ErrorResponseType {
  // if (!new.target) return new ErrorResponse(statusCode, message);
  return { this.statusCode=statusCode; this.message=message };
}
*/

export const validateYupSchema = async (
  schema: AnySchema,
  data: any,
  abortEarly = false
) => {
  try {
    const res = await schema.validate(data, { abortEarly });
    if (res) return true;
    else throw new Error("Provide proper data");
  } catch (yupError: any) {
    console.log("yupError", yupError);
    let finalError: { [name: string]: string[] } = {};
    let fieldsAddedToFinalError: string[] = Object.keys(finalError);

    /**
      if abortEarly then 
      yupError structure would be
      params:{
        label:@string ,
        path:@string
      },
      errors: [],
      message:@string
     */
    if (!yupError?.inner?.length) {
      finalError = {
        [yupError.params.label || yupError.params.path]:
          yupError.errors || yupError.message,
      };
    } else {
      /**
       structure of yupError
       yuperror={
         inner:[
          params:{
            path:@string ,
            label:@string
          },
          errors:[ @string , @string ]
         ]
       }
       convert to
       finalError ={
         [yupError.params.lebal: @unique ]:[ @map_all_related_error_from_yupError_inner ]
       }
       */
      yupError.inner.forEach((error: any) => {
        const crntField = error.params.label || error.params.path;
        const isCrntFieldAddedToFinalErr =
          fieldsAddedToFinalError.includes(crntField);
        if (!isCrntFieldAddedToFinalErr) {
          let errorOfCrntField: any = [];
          yupError.inner.forEach((err: any) => {
            const { params, errors } = err;
            if (params.label == crntField || params.path == crntField)
              errorOfCrntField.push(...errors);
          });
          finalError = { ...finalError, [crntField]: errorOfCrntField };
        }
      });
    }

    throw Object.keys(finalError).length ? finalError : "Provide proper data";
  }
};

export const saveImageLocally = async (file: any, appUrl: string) => {
  try {
    let fileName = slugify(path.parse(file.name).name);
    fileName = fileName + nanoid(10) + path.extname(file.name);

    const savePath = path.join(
      __dirname,
      "../../",
      "public",
      "uploads",
      "image",
      fileName
    );

    const res = await file.mv(savePath);

    return { ...res, url: `${appUrl}/image/${fileName}`, result: true };
  } catch (err) {
    return { result: false };
  }
};

export const peelUserDoc = (user: UserDocument) => {
  // @ts-ignore
  user = user?.toObject ? user?.toObject() : user;
  let { isEmailVerified, isAuthorised, updatedAt, password, id, __v, ...rest } =
    user;
  return rest;
};

export const sendTokens = async (
  user: UserDocument,
  statusCode: number,
  res: Response,
  message?: any
) => {
  const resData = {
    status: "ok",

    user: peelUserDoc(user),
    message,
    accessToken: signJwt(
      { user: user._id },
      {
        expiresIn: "7d",
      }
    ),
  };

  return res.status(statusCode).json(resData);
};

export const strSchema = (
  label: string,
  {
    isRequired = false,
    prettyLabel,
    min = 1,
    max = Infinity,
    isMongoId,
  }: Partial<{
    isRequired: boolean;
    prettyLabel: string;
    min: number;
    max: number;
    isMongoId: boolean;
  }>
) => {
  let schema = yup
    .string()
    .typeError(`${prettyLabel || label} must be string type.`)
    .label(label)
    .trim();
  if (isRequired) {
    let lenMsg = `${prettyLabel || label} must `;
    if (max != Infinity) {
      lenMsg += ` have more than ${min} & less than oor equal to ${max} characters.`;
    } else {
      lenMsg += ` have more than or equal to ${min} characters.`;
    }
    schema.required(`${prettyLabel || label} is required`);
    if (isMongoId)
      schema.test(label, `${prettyLabel || label} must be valid id`, (val) => {
        return isValidObjectId(val);
      });
    else
      schema.test(label, lenMsg, (val: any) => {
        return trimExtra(val, min, max);
      });
  }

  return schema;
};

export const strArrSchema = (
  label: string,
  {
    isRequired = false,
    unique = true,
    prettyLabel,
    min,
    max,
    isMongoId,
    strMin,
    strMax,
  }: Partial<{
    isRequired: boolean;
    prettyLabel: string;
    min: number;
    max: number;
    isMongoId: boolean;
    strMin: number;
    strMax: number;
    unique: boolean;
  }>
) => {
  let lenMsg = "";
  if (isMongoId) {
    lenMsg = `${prettyLabel || label} must be valid ids.`;
  } else if (strMax) {
    lenMsg += `${label} must have less than or equal to ${strMax} characters`;
  } else if (strMin) {
    lenMsg += `${label} must have more than or equal to ${strMin} characters`;
  }

  let schema = yup
    .array()
    .label(label)
    .typeError(`${prettyLabel || label} must be array`)
    .test(label, lenMsg, (val: any) => {
      if (!val) return !isRequired ? true : false;

      if (new Set(val).size != val?.length || (min && val?.length < min))
        return false;
      else if (isMongoId) return val?.every((val: any) => isValidObjectId(val));
      else if (unique) return new Set(val).size == val.length;
      else if (strMin && strMax)
        return val.every((val: any) => trimExtra(val, strMin, strMax));
      else if (strMin)
        return val.every((val: any) => trimExtra(val, strMin, Infinity));
      else if (strMax)
        return val.every((val: any) => trimExtra(val, 0, strMax));
    });

  if (min) schema.min(min);
  max && schema.max(max);
  isRequired && schema.required(`${prettyLabel || label} is required`);

  return schema;
};
export const monthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatAMPM(date: Date) {
  var hours = date.getHours();
  var minutes: string | number = date.getMinutes();
  var sec: string | number = date.getSeconds();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  sec = sec < 10 ? "0" + sec : sec;

  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export const readAbleDate = (
  value: Date,

  isFull = true
) => {
  // let date: any = new Date(value);
  let date = value;
  let d: string | number = date.getDate(),
    m: string | number = date.getMonth() + 1,
    y: string | number = date.getFullYear();
  d = d < 10 ? "0" + d : d;
  m = m < 10 ? "0" + m : m;

  // let dmy = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  let dmy = `${d}-${m}-${y}`;

  return !isFull ? dmy : `${dmy}, ${formatAMPM(date)}`;
};
/**
 

  {
    d = true,
    m = true,
    y = true,
    h = true,
    mi = true,
    s = true,
    z = true,
    seperator = "-",
    isFull,
  }: {
    d?: boolean;
    m?: boolean;
    y?: boolean;
    h?: boolean;
    mi?: boolean;
    s?: boolean;
    z?: boolean;
    seperator: string;
    isFull: boolean;
  }
 */
