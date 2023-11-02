import Table from '../core/enums/table.enum';
import BaseModel from './base.model';
/**
 * Post Model
 */
export class Post extends BaseModel {
  public static table: string = Table.POSTS;

  static fetchAllWithPage(
    pageParams: { page: number; pageSize: number },
  ) {
    const offset = (pageParams.page - 1) * pageParams.pageSize;
    const posts = this.query();

    posts.offset(offset).limit(pageParams.pageSize);

    return posts;
  }

  static count() {
    return this.query().count('*', {as: 'count'}).first();
  }

  static truncate () {
    return this.query().truncate();
  }
}

export default Post;
