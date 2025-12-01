import AppError from '@/types/AppError';
import env from '@/types/env';
import HttpStatus from '@/types/HttpStatus.enum';
import type { RequestHandler } from 'express';

export const authenticate: RequestHandler = (req, res, next) => {
  try {
    // TODO: Replace this with a dedicated API Key service call in v2
    const key = req.headers['x-api-key'];

    if (key !== env.API_KEY) {
      throw new AppError(
        "Invalid API Key (include in header 'x-api-key')",
        HttpStatus.UNAUTHORIZED
      );
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
