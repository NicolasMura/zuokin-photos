import * as Joi from 'joi';
// import { User, UserDocument } from '../users/user.schema';
// import { UserDocument } from '../users/user.schema';
import { User } from '@zuokin-photos/models';

/**
* @export
* @class AuthValidation
* @extends Validation
*/
// export class AuthValidation extends Validation {
export class AuthValidation {

  createUser(params: User): Joi.ValidationResult {
  // createUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
    const userProfileSchema: Joi.Schema = Joi.object().keys({
      name: Joi.string(),
      gender: Joi.string(),
      location: Joi.string(),
      picture: Joi.string()
    }).required();

    const userSchema: Joi.Schema = Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      mobile: Joi.string().allow(''),
      profile: userProfileSchema
    });

    return userSchema.validate(params)
    // return Joi.validate(params, userSchema, { allowUnknown: true });
  }

  // getUser(params: IUserModel): any {
  //   const userSchema: Joi.Schema = Joi.object().keys({
  //     password: Joi.string().required(),
  //     email: Joi.string().email().required()
  //   });

  //   return Joi.valid(params, userSchema);
  // }
}
