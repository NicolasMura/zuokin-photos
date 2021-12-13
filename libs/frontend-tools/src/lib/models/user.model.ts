import { IUser, IUserProfile } from '@zuokin-photos/models';

export class User implements IUser {
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
    username: string,
    email: string,
    mobile: string,
    isAdmin = false,
    created_at: Date,
    profile: IUserProfile,
    // tslint:disable-next-line: variable-name
    _id?: string
  ) {
    this.username = username;
    this.email = email;
    this.mobile = mobile;
    this.isAdmin = isAdmin;
    this.created_at = created_at;
    this.profile = profile;
    this._id = _id;
  }
}
