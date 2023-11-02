import { PostInterface } from "../core/interfaces";
import { getPageParams, paginateData } from "../core/utils/paginate";
import Post from '../models/post.model';

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
  const [id] = await Post.insert(attribute);

  return {id, ...attribute};
}

export const update = async (id: number, attribute: PostInterface) => {
  await Post.update({id}, attribute);

  return {id, ...attribute};
}

export const deleteById = (id: number) => {
  return Post.deleteById(id);
}