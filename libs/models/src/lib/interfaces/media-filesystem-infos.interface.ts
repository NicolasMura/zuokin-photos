export interface IMediaFileSystemInfos {
  directoryHandle: {
    kind: string | undefined;
    name: string | undefined;
  };
  webkitRelativePath: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
}
