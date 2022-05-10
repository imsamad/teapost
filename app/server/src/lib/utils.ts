import { NextFunction, Request, Response } from 'express';
import slugify from 'slugify';
import crypto from 'crypto';
import path from 'path';
import { nanoid } from 'nanoid';
import { AnySchema } from 'yup';
import { convert } from 'html-to-text';
import { peelUserDoc, UserDocument } from '../models/User';
import { signJwt } from './jwt';
import { isValidObjectId } from 'mongoose';

import { LoremIpsum } from 'lorem-ipsum';
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
  crypto.randomBytes(num).toString('hex');

export const createHash = (str: string) =>
  crypto.createHash('sha256').update(str).digest('hex');

export const typeOf = (
  val: any,
  type: 'string' | 'array' | 'object' | 'map' | 'set' | 'mongoId' | 'boolean',
  label?: string
) => {
  const result =
    val == 'undefined' || typeof val == 'undefined'
      ? false
      : type == 'mongoId'
      ? isValidObjectId(val)
      : val.constructor.name.toLowerCase() == type;
  if (label) {
    console.log('from typeOf ', label);
    console.log('val ', val.constructor.name.toLowerCase());
    console.log('type ', type);
    console.log('result ', result);
  }
  return result;
};

export const trimInside = (
  str: string,
  minLength: number,
  maxLength = Infinity,
  joinBy = ' '
): boolean => {
  if (!str || typeof str != 'string') return false;
  let splitted = str.split(/\s/g);
  let filteredVoidStr = splitted.filter((val: string) => val !== '');
  let joined = filteredVoidStr.join(joinBy);

  return joined.length >= minLength && joined.length < maxLength ? true : false;
};

export type ErrorResponseType = {
  statusCode: number;
  message: string | string[] | {};
};

// export const ErrorResponse = (
//   statusCode: number,
//   message: string | string[] | {}
// ): ErrorResponseType => {
//   return { statusCode, message };
// };
export function ErrorResponse(
  statusCode: number,
  message: string | string[] | {}
) {
  // @ts-ignore
  if (!new.target) return new ErrorResponse(statusCode, message);

  // @ts-ignore
  this.statusCode = statusCode;
  // @ts-ignore
  this.message = message;
}

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
    else throw new Error('Provide proper data');
  } catch (yupError: any) {
    let errors: { [name: string]: string[] } = {};

    if (yupError?.inner?.length) {
      yupError?.inner?.forEach((inner: any) => {
        const key = inner.params.label || inner.params.path || inner.path;
        if (!errors[key]?.length) errors[key] = [];
        errors[key].push(...inner.errors);
      });
    } else {
      errors = {
        [yupError?.params?.label || yupError.params.path || yupError.path]:
          yupError.errors || yupError.message,
      };
    }

    throw Object.keys(errors).length ? errors : 'Provide proper data';
  }
};

export const saveImageLocally = async (file: any, appUrl: string) => {
  try {
    let fileName = slugify(path.parse(file.name).name);
    fileName = fileName + nanoid(10) + path.extname(file.name);

    const savePath = path.join(
      __dirname,
      '../../',
      'public',
      'uploads',
      'image',
      fileName
    );

    const res = await file.mv(savePath);

    return { ...res, url: `${appUrl}/image/${fileName}`, result: true };
  } catch (err) {
    return { result: false };
  }
};

export const sendTokens = async (
  user: UserDocument,
  statusCode: number,
  res: Response,
  message?: any
) => {
  const resData = {
    status: 'ok',
    user: peelUserDoc(user),
    message,
    accessToken: signJwt({ user: user._id }),
  };

  return res.status(statusCode).json(resData);
};

export const monthList = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function formatAMPM(date: Date) {
  var hours = date.getHours();
  var minutes: string | number = date.getMinutes();
  var sec: string | number = date.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  sec = sec < 10 ? '0' + sec : sec;

  var strTime = hours + ':' + minutes + ' ' + ampm;
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
  d = d < 10 ? '0' + d : d;
  m = m < 10 ? '0' + m : m;

  // let dmy = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  let dmy = `${d}-${m}-${y}`;

  return !isFull ? dmy : `${dmy}, ${formatAMPM(date)}`;
};
