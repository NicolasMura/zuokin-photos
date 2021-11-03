export interface IUserProfile {
  name: string;
  gender: string;
  location: string;
  picture: string;
}

export interface IUser {
  // userId: number;
  username: string;
  email: string;
  mobile: string;
  password?: string;
  isAdmin: boolean;
  created_at: Date;
  profile: IUserProfile;
  _id?: string;
}
