export declare class FileUploadService {
    siteUrl: string;
    digest: string;
    siteRelativeUrl: string;
    fileUpload(file: any, documentLibrary: string, fileName: string, digest: string): Promise<unknown>;
    createDummyFile(fileName: any, libraryName: any): Promise<unknown>;
    convertDataBinaryString(data: any): string;
    executeAsync(endPointUrl: any, data: any, requestHeaders: any): Promise<unknown>;
    uploadFileChunk(id: any, libraryPath: any, fileName: any, chunk: any, data: any, byteOffset: any): Promise<unknown>;
    uploadFile(result: any, id: any, libraryPath: any, fileName: any, chunks: any, index: any, byteOffset: any, chunkPercentage: any, resolve: any, reject: any): void;
    getUploadMethod(offset: any, length: any, total: any): "finishupload" | "startupload" | "continueupload";
    convertFileToBlobChunks(result: any, byteOffset: any, chunkInfo: any): string;
    guid(): string;
}
//# sourceMappingURL=chunk.d.ts.map