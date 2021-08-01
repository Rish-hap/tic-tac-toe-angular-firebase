import { UploadedFile } from "../models/upload-file";
import { File } from "../models/file";

export interface FileUpload {
    upload: (files: File[]) => Promise<UploadedFile[]>;
}