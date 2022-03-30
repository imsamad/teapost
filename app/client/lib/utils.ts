import { AnySchema } from "yup";
import * as yup from "yup";

export const trimExtra = (
  str: string | any,
  min: number,
  max = Infinity,
  join = " "
): boolean => {
  if (!str) return false;
  let splitted = str.split(" ");
  let filtered = splitted.filter((val: string) => val !== "");
  let joined = filtered.join(join);
  return joined.length >= min && joined.length <= max ? true : false;
};

export const typeOf = (
  val: any,
  type: string | "string" | "array" | "object"
) => val?.constructor?.name?.toLowerCase() === type.toLowerCase();

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

export const readAbleDate = (value: Date, isFull = false) => {
  let date: any = new Date(value);

  let dmy = `${date.getDate()} ${
    monthList[date.getMonth()]
  }, ${date.getFullYear()}`;

  let hour = date.getHours() > 12 ? date.getHours() % 12 : date.getHours();

  hour = Number(hour) >= 10 ? hour : `0${hour}`;
  hour += date.toLocaleTimeString().substring(2);

  let isAmPm = date.getHours() >= 12 ? "PM" : "AM";

  date = `${hour} ${isAmPm}`;

  return isFull ? `${dmy}, ${date}` : dmy;
};

export const strSchema = (
  label: string,
  {
    isRequired = false,
    prettyLabel,
    min = 1,
    max = Infinity,
  }: Partial<{
    isRequired: boolean;
    prettyLabel: string;
    min: number;
    max: number;
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
    prettyLabel,
    min,
    max,
    strMin,
    strMax,
  }: Partial<{
    isRequired: boolean;
    prettyLabel: string;
    min: number;
    max: number;
    strMin: number;
    strMax: number;
  }>
) => {
  let lenMsg = "";
  if (strMax) {
    lenMsg += `${label} must have less than or equal to ${strMax} characters`;
  } else if (strMin) {
    lenMsg += `${label} must have more than or equal to ${strMin} characters`;
  }

  let schema = yup
    .array()
    .label(label)
    .typeError(`${prettyLabel || label} must be array`)
    .test(label, lenMsg, (val: any) => {
      if (!val && !isRequired) return true;
      else if (strMin && strMax)
        return val.every((val: any) => trimExtra(val, strMin, strMax));
      else if (strMin)
        return val.every((val: any) => trimExtra(val, strMin, Infinity));
      else if (strMax)
        return val.every((val: any) => trimExtra(val, 0, strMax));
    });

  min && schema.min(min);
  max && schema.max(max);
  isRequired && schema.required(`${prettyLabel || label} is required`);

  return schema;
};
