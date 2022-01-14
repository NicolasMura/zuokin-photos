import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, promises } from 'fs';
import { extname } from 'path';


export const imageFileFilter = (req, file, callback) => {
  const ext = extname(file.originalname);
  // if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4)$/)) {
  // if (!['.mp4', '.json', '.js', '.ts'].includes(ext)) {
    if (!['.jpg', 'jpeg', 'png', 'gif', '.mp4'].includes(ext)) { // --> marche pas sur MacOSX ?
    req.fileValidationError = 'Invalid file type';
    return callback(
      new HttpException('Invalid file type', HttpStatus.FORBIDDEN),
      false
    );
  }
  return callback(null, true);
};

export const mediaFileFilter = (req, file, callback) => {
  const ext = extname(file.originalname);
  if (!['.jpg', 'jpeg', 'png', 'gif', '.mp4'].includes(ext)) { // --> marche pas sur MacOSX ?
    req.fileValidationError = 'Invalid file type';
    return callback(
      new HttpException(ext + ' forbidden : ' + 'Invalid file type - Only jpg|jpeg|png|gif|mp4 files are allowed!', HttpStatus.FORBIDDEN),
      false
    );
  }
  return callback(null, true);
};

export const editFileName = (req, file, callback) => {
  return callback(null, file.originalname);
};

export const getDatePath = (date) => {
  return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
}

export const getDirPath = (dirPath) => {
  try {
    if (!existsSync(dirPath)) promises.mkdir(dirPath, { recursive: true });
    return dirPath;
  } catch (error) {
    console.log(error.message);
  }
}
