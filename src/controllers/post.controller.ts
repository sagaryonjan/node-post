import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import * as postService from '../services/post.service';
import NotFoundError from '../core/exceptions/NotFoundError';

/**
 * Get all posts with paginate data
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const fetchAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await postService.fetchAllWithFilterAndPage(req.query);
      
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Get post by id
 * 
 * @param req object
 * @param res object
 * @param next function
 */
export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await postService.getPostById(Number(req.params.id));
    if(!data) { throw new NotFoundError("Post not found."); }
    
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Create Post
 * 
 * @param req object
 * @param res object
 * @param next function
 */
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await postService.create(req.body);
    
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Update post by Id
 * 
 * @param req object
 * @param res object
 * @param next function
 */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await postService.getPostById(Number(req.params.id));
    if(!data) { throw new NotFoundError("Post not found."); }

    const updatedPost = await postService.update(Number(req.params.id), req.body);
   
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: updatedPost
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Delete post by Id
 * 
 * @param req object
 * @param res object
 * @param next function
 */
export const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await postService.getPostById(Number(req.params.id));
    if(!data) { throw new NotFoundError("Post not found."); }
    
    await postService.deleteById(Number(req.params.id));
    
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: 'Post deleted successfully.'
    });
  } catch (err) {
    next(err);
  }
}