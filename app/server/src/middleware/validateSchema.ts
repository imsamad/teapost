import { AnySchema, ValidationError } from 'yup';
import { Request, Response, NextFunction } from 'express';

import ErrorResponse from '../utils/ErrorResponse';

const validateSchema =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params,
        },
        { abortEarly: false }
      );

      return next();
    } catch (error: any) {
      // console.error('Error from validation ', Object.keys(error));

      return next(
        ErrorResponse(
          422,
          error.errors
            ? error.errors
            : 'Provide Proper Data,for further processing.'
        )
      );
    }
  };

export default validateSchema;
