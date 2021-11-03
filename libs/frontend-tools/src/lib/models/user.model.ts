import { IUser, IUserProfile } from '@zuokin-photos/models';

export class User implements IUser {
  // userId: number;
  username: string;
  email: string;
  mobile: string;
  password?: string;
  isAdmin: boolean;
  created_at: Date;
  profile: IUserProfile;
  // tslint:disable-next-line: variable-name
  _id?: string;

  constructor(
    // userId: number,
    username: string,
    email: string,
    mobile: string,
    isAdmin = false,
    created_at: Date,
    profile: IUserProfile,
    // tslint:disable-next-line: variable-name
    _id?: string
  ) {
    // this.userId = userId;
    this.username = username;
    this.email = email;
    this.mobile = mobile;
    this.isAdmin = isAdmin;
    this.created_at = created_at;
    this.profile = profile;
    this._id = _id;
  }
}
