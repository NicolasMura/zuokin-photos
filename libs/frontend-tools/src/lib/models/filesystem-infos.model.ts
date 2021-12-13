import { IFilesystemInfos } from "@zuokin-photos/models";

export class FilesystemInfos implements IFilesystemInfos {
  constructor(
    public directoryHandle: {
      webkitRelativePath: string;
      lastModified: number;
    },
    public lastModifiedDate: Date,
    public name: string,
    public size: number,
    public type: string
  ) {
    this.directoryHandle = directoryHandle;
    this.name = name;
    this.size = size;
    this.type = type;
  }
}