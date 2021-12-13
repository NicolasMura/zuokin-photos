import * as bcrypt from 'bcrypt';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Logger } from '@nestjs/common';
import { IUser, IUserProfile } from '../interfaces/user.interface';

// export type UserDocument = User & Document; // ??

@Schema({
  versionKey: false,
  _id: false
})
export class UserProfile extends Document implements IUserProfile {
  @Prop({ default: 'Bob' })
  name!: string;

  @Prop({ default: '' })
  gender!: string;

  @Prop({ default: '' })
  location!: string;

  @Prop({ default: '' })
  picture!: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);

@Schema({
  collection: 'users',
  versionKey: false
})
export class User extends Document implements IUser {
  @Prop()
  username!: string;

  @Prop({ unique: true, required: true })
  email!: string;

  @Prop()
  mobile!: string;

  @Prop()
  password!: string;

  @Prop({default: false})
  isAdmin!: boolean;

  @Prop()
  created_at!: Date;

  @Prop()
  profile!: UserProfile;

  comparePassword!: (password: string) => Promise < boolean > ;
  // gravatar: (size: number) => string;

  // constructor(
  //   username: string,
  //   email: string,
  //   mobile: string,
  //   isAdmin: boolean,
  //   created_at: Date,
  //   profile: UserProfile,
  //   schtroumpfs?: User[],
  //   _id?: string
  // ) {
  //   super();

  //   this.username = username;
  //   this.email = email;
  //   this.mobile = mobile;
  //   this.isAdmin = isAdmin;
  //   this.created_at = created_at;
  //   this.profile = profile;
  //   this.schtroumpfs = schtroumpfs;
  //   this._id = _id;
  // }
}

export const UserSchema = SchemaFactory.createForClass(User);

/**
* Method for comparing passwords
*/
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise < boolean > {
  try {
    const match: boolean = await bcrypt.compare(candidatePassword, this.password);

    return match;
  } catch (error) {
    Logger.error(error);
    return error;
    // throw new Error('Invalid password or email');
  }
};

/**
* Save hashed password
*/
// eslint-disable-next-line
UserSchema.pre<User>('save', async function(next: Function) {
  // eslint-disable-next-line
  const user: User = this;

  // if (!user.isModified('password')) {
  //   return next();
  // }

  console.log(user);
  try {
    const salt: string = await bcrypt.genSalt(10);

    const hash: string = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});
