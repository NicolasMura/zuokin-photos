import * as Joi from 'joi';
import { Media, MediaMetadata, FilesystemInfos } from '@zuokin-photos/models';

/**
* @export
* @class MediaValidation
* @extends Validation
*/
// export class MediaValidation extends Validation {
export class MediaValidation {

  createMedia(params: Media): Joi.ValidationResult {
  // createMedia(params: Media): Joi.ValidationResult<IMediaModel> {
    const mediaMetadataSchema: Joi.Schema = Joi.object().keys({
      creationTime: Joi.string(),
      width: Joi.string(),
      height: Joi.string(),
      video: {
        fps: Joi.number(),
        status: Joi.string()
      },
      photo: {
        cameraMake: Joi.string(),
        cameraModel: Joi.string(),
        focalLength: Joi.number(),
        apertureFNumber: Joi.number(),
        isoEquivalent: Joi.number(),
        exposureTime: Joi.string()
      }
    });

    const fileSystemInfosSchema: Joi.Schema = Joi.object().keys({
      directoryHandle: {
        kind: Joi.string(),
        name: Joi.string()
      },
      webkitRelativePath: Joi.string(),
      lastModified: Joi.number(),
      lastModifiedDate: Joi.date(),
      name: Joi.string(),
      size: Joi.number(),
      type: Joi.string()
    });

    const mediaSchema: Joi.Schema = Joi.object().keys({
      // id: Joi.string(),
      productUrl: Joi.string().required(),
      baseUrl: Joi.string().required(),
      mimeType: Joi.string().required(),
      mediaMetadata: mediaMetadataSchema,
      fileSystemInfos: fileSystemInfosSchema
    });

    return mediaSchema.validate(params)
    // return Joi.validate(params, mediaSchema, { allowUnknown: true });
  }

  // getMedia(params: IMediaModel): any {
  //   const mediaSchema: Joi.Schema = Joi.object().keys({
  //     password: Joi.string().required(),
  //     email: Joi.string().email().required()
  //   });

  //   return Joi.valid(params, mediaSchema);
  // }
}
