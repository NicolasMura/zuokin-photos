import { IMediaFileSystemInfos } from '@zuokin-photos/models';

export class MediaFileSystemInfos implements IMediaFileSystemInfos {
  constructor(
    public directoryHandle: {
      kind: string | undefined;
      name: string | undefined;
    },
    public webkitRelativePath: string,
    public lastModified: number,
    public lastModifiedDate: Date,
    public name: string,
    public size: number,
    public type: string
  ) {
    this.directoryHandle = directoryHandle;
    this.webkitRelativePath = webkitRelativePath;
    this.lastModified = lastModified;
    this.lastModifiedDate = lastModifiedDate;
    this.name = name;
    this.size = size;
    this.type = type;
  }
}