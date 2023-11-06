import BadRequestError from "../core/exceptions/BadRequestError";
import { PostInterface } from "../core/interfaces";
import { getPageParams, paginateData } from "../core/utils/paginate";
import Post from '../models/post.model';
import User from "../models/user.model";

export const fetchAllWithPage = async (query:any) => {
  const pageParams = getPageParams(query);

  const posts = await Post.fetchAllWithPage(pageParams);
  const totalPost = await Post.count();

  return paginateData(posts, pageParams, totalPost.count);
}

export const getPostById = (id: number) => {
  return Post.findById(id);
}

export const create = async (attribute: PostInterface) => {

  const user = await User.findById(attribute.user_id);
  if(!user) throw new BadRequestError('User not found. Please add the valid user_id')

  const [id] = await Post.insert(attribute);

  return {id, ...attribute};
}

export const update = async (id: number, attribute: PostInterface) => {
  const user = await User.findById(attribute.user_id);
  if(!user) throw new BadRequestError('User not found. Please add the valid user_id')
  
  await Post.update({id}, attribute);

  return {id, ...attribute};
}

export const deleteById = (id: number) => {
  return Post.deleteById(id);
}