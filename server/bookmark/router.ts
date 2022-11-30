import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import BookmarkCollection from './collection';
import * as FreetCollection from '../freet/collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as bookmarkValidator from '../bookmark/middleware';
import * as util from './util';
import * as freetUtil from '../freet/util';

const router = express.Router();

/**
 * Get all the bookmarks
 *
 * @name GET /api/bookmarks
 *
 * @return {BookmarkResponse[]} - A list of all the bookmarks sorted in descending
 *                      order by date modified
 */
/**
 * Get all bookmarks a user has made.
 *
 * @name GET /api/bookmarks?author=USERNAME
 *
 * @return {ReactResponse[]} - An array of bookmarks created by user
 * @throws {400} - If username is not given
 * @throws {404} - If no user has given authorId
 *
 */
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if authorId query parameter was supplied
    if (req.query.author !== undefined) {
      next();
      return;
    }
    const allReacts = await BookmarkCollection.findAll();
    const response = allReacts.map(util.constructBookmarkResponse);
    res.status(200).json(response);
  },
  [
    userValidator.isAuthorExists
  ],
  async (req: Request, res: Response) => {
    const authorBookmarks = await BookmarkCollection.findAllBookmarkedFreetsByUsername(req.query.author as string);
    const response = authorBookmarks.map(freetUtil.constructFreetResponse);
    res.status(200).json(response);
  }
);


/**
 * Create a new bookmark.
 *
 * @name POST /api/bookmarks
 *
 * @return {BookmarkResponse} - The created bookmark
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the freet doesnt exist
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    bookmarkValidator.isFreetExistsBody
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const reaction = await BookmarkCollection.addOne(userId, req.body.freetId);
    
    res.status(201).json({
      message: 'Your bookmark was created successfully.',
      reaction: util.constructBookmarkResponse(reaction)
    });
  }
);

/**
 * Delete a bookmark
 *
 * @name DELETE /api/bookmarks/
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the bookmarkId is not valid
 */
router.delete(
  '/',
  [
    userValidator.isUserLoggedIn,
    bookmarkValidator.isFreetExistsBody
    // bookmarkValidator.isValidBookmarkModifier
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    await BookmarkCollection.deleteOne(userId, req.body.freetId);
    res.status(200).json({
      message: 'Your bookmark was deleted successfully.'
    });
  }
);

export {router as bookmarkRouter};
