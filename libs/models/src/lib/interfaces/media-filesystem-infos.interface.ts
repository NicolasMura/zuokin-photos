export interface IFilesystemInfos {
  directoryHandle: {
    webkitRelativePath: string;
    lastModified: number;
  };
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
}
