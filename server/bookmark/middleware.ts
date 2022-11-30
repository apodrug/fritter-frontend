import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import {stringify} from 'uuid';
import BookmarkCollection from '../bookmark/collection';
import FreetCollection from '../freet/collection';

/**
 * Checks if a bookmark with id in req.params exists
 */
const isBookmarkExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.body.freetId);
  const userId = (req.session.userId as string) ?? '';
  const bookmark = validFormat ? await BookmarkCollection.findOne(userId, req.body.freetId) : '';
  if (!bookmark) {
    res.status(404).json({
      error: {
        freetNotFound: `Bookmark with ID ${req.params.id} does not exist.`
      }
    });
    return;
  }

  next();
};

/**
 * Checks if a freet with freetId in req.params exists
 */
const isFreetExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.query.freetId as string);
  const freet = validFormat ? await FreetCollection.findOne(req.query.freetId as string) : '';
  if (!freet) {
    res.status(404).json({
      error: {
        freetNotFound: `Freet with freet ID ${req.query.freetId} does not exist.`
      }
    });
    return;
  }

  next();
};

/**
 * Checks if a freet with freetId in req.body exists
 */
 const isFreetExistsBody = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.body.freetId as string);
  const freet = validFormat ? await FreetCollection.findOne(req.body.freetId as string) : '';
  if (!freet) {
    res.status(404).json({
      error: {
        freetNotFound: `Freet with freet ID ${req.body.freetId} does not exist.`
      }
    });
    return;
  }

  next();
};

/**
 * Checks if a user with userId as author id in req.query exists
 */
const isUserExists = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.user) {
    res.status(400).json({
      error: 'Provided username must be nonempty.'
    });
  }
};


/**
 * Checks if the current user is the author of the bookmark whose bookmark id is in req.params
 */
const isValidBookmarkModifier = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.body.freetId);
  const currentUser = (req.session.userId as string) ?? '';
  const bookmark = await BookmarkCollection.findOne(currentUser, req.body.freetId);
  const userId = bookmark.userId._id;
  if (req.session.userId !== userId.toString()) {
    res.status(403).json({
      error: 'Cannot modify other users\' bookmarks.'
    });
    return;
  }

  next();
};

export {
  isFreetExists,
  isUserExists,
  isBookmarkExists,
  isValidBookmarkModifier,
  isFreetExistsBody
};
