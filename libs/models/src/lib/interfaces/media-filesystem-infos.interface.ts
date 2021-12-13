export interface IFileSystemInfos {
  directoryHandle: {
    kind: string;
    name: string;
  };
  webkitRelativePath: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
}
