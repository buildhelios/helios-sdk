import { invokeGenerateImageFn } from "@buildhelios/fn-clients";
import { FileRecord, GenerateImageRequest } from "@buildhelios/types";

export const generateImageAsync=(request:GenerateImageRequest):Promise<FileRecord>=>{
    return invokeGenerateImageFn(request);
}
