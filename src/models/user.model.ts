import Table from '../core/enums/table.enum';
import BaseModel from './base.model';

/**
 * User Model
 */
export class User extends BaseModel {
  public static table: string = Table.USERS;
}

export default User;
