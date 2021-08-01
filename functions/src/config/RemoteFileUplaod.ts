// import { inject, injectable } from "tsyringe";

// import { UploadedFile } from "../models/upload-file";
// import { File } from "../models/file";


// import { FileUpload } from "@/domain/usecases";
// import { FileUploader } from "@/application/protocols";
// import { FileUploadError } from "@/domain/errors";

// @injectable()
// export class RemoteFileUpload implements FileUpload {
//   constructor(
//     @inject("FileUploader")
//     private readonly fileUploader: FileUploader
//   ) {}

//   async upload(files: File[]): Promise<UploadedFile[]> {
//     const uploadedFiles = await this.fileUploader.upload(files);

//     if (!uploadedFiles) {
//       throw new FileUploadError();
//     }

//     return uploadedFiles as UploadedFile[];
//   }
// }