import { UploadedFile } from "../models/upload-file";
import { File } from "../models/file";

export interface FileUploader {
  upload: (
    files: File | File[]
  ) => Promise<UploadedFile | UploadedFile[] | undefined>;
}