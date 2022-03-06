import { NextFunction, Request, Response } from "express";
import slugify from "slugify";
import crypto from "crypto";
import path from "path";
import { nanoid } from "nanoid";
import { AnySchema } from "yup";
export const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export const randomBytes = (num = 20) =>
  crypto.randomBytes(num).toString("hex");

export const createHash = (str: string) =>
  crypto.createHash("sha256").update(str).digest("hex");

export const typeOf = (
  val: any,
  type: string | "string" | "array" | "object"
) => val.constructor.name.toLowerCase() === type.toLowerCase();

export const trimExtra = (
  str: string | any,
  length: number,
  join = " "
): boolean => {
  if (!str) return false;
  let splitted = str.split(" ");
  let filtered = splitted.filter((val: string) => val !== "");
  let joined = filtered.join(join);
  return joined.length >= length ? true : false;
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
    console.log("yupError ", yupError);
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
