var _spPageContextInfo;
var SP;
var FileUploadService = /** @class */ (function () {
    function FileUploadService() {
        this.siteUrl = "http://sps2016-hta";
        this.digest = "";
        this.siteRelativeUrl = "/"; //_spPageContextInfo.webServerRelativeUrl != "/" ? _spPageContextInfo.webServerRelativeUrl : "";  
    }
    FileUploadService.prototype.fileUpload = function (file, documentLibrary, fileName, digest) {
        var _this = this;
        this.digest = digest;
        return new Promise(function (resolve, reject) {
            _this.createDummyFile(fileName, documentLibrary).then(function (result) {
                var fr = new FileReader();
                var offset = 0;
                // the total file size in bytes...  
                var total = file.size;
                // 1MB Chunks as represented in bytes (if the file is less than a MB, seperate it into two chunks of 80% and 20% the size)...  
                var length = parseInt("1000000") > total ? Math.round(total * 0.8) : parseInt("1000000");
                var chunks = [];
                //reads in the file using the fileReader HTML5 API (as an ArrayBuffer) - readAsBinaryString is not available in IE!  
                fr.readAsArrayBuffer(file);
                fr.onload = function (evt) {
                    while (offset < total) {
                        //if we are dealing with the final chunk, we need to know...  
                        if (offset + length > total) {
                            length = total - offset;
                        }
                        //work out the chunks that need to be processed and the associated REST method (start, continue or finish)  
                        chunks.push({
                            offset: offset,
                            length: length,
                            method: _this.getUploadMethod(offset, length, total)
                        });
                        offset += length;
                    }
                    //each chunk is worth a percentage of the total size of the file...  
                    var chunkPercentage = (total / chunks.length) / total * 100;
                    if (chunks.length > 0) {
                        //the unique guid identifier to be used throughout the upload session  
                        var id = _this.guid();
                        //Start the upload - send the data to S  
                        _this.uploadFile(evt.target.result, id, documentLibrary, fileName, chunks, 0, 0, chunkPercentage, resolve, reject);
                    }
                };
            });
        });
    };
    FileUploadService.prototype.createDummyFile = function (fileName, libraryName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Construct the endpoint - The GetList method is available for SharePoint Online only.  
            var serverRelativeUrlToFolder = "decodedurl='" + _this.siteRelativeUrl + "/" + libraryName + "'";
            var endpoint = _this.siteUrl + "/_api/Web/GetFolderByServerRelativeUrl('/VideoMediaGallery')/files" + "/add(overwrite=true, url='" + fileName + "')";
            var headers = {
                "accept": "application/json;odata=verbose"
            };
            _this.executeAsync(endpoint, _this.convertDataBinaryString(2), headers).then(function (file) { return resolve(true); }).catch(function (err) { return reject(err); });
        });
    };
    // Base64 - this method converts the blob arrayBuffer into a binary string to send in the REST request  
    FileUploadService.prototype.convertDataBinaryString = function (data) {
        var fileData = '';
        var byteArray = new Uint8Array(data);
        for (var i = 0; i < byteArray.byteLength; i++) {
            fileData += String.fromCharCode(byteArray[i]);
        }
        return fileData;
    };
    FileUploadService.prototype.executeAsync = function (endPointUrl, data, requestHeaders) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // var scriptbase = "http://sps2016-hta/_layouts/15/";
            // $.getScript(scriptbase + "SP.RequestExecutor.js", function() {
            //     // using a utils function we would get the APP WEB url value and pass it into the constructor...  
            //     let executor = new SP.RequestExecutor(this.siteUrl);  
            //     // Send the request.  
            //     executor.executeAsync({  
            //         url: endPointUrl,  
            //         method: "POST",  
            //         body: data,  
            //         binaryStringRequestBody: true,  
            //         headers: requestHeaders,  
            //         success: offset => resolve(offset),  
            //         error: err => reject(err.responseText)  
            //     });
            // }); 
            $.ajax({
                url: endPointUrl,
                type: "post",
                data: data,
                processData: false,
                headers: {
                    accept: "application/json;odata=verbose",
                    "X-RequestDigest": _this.digest,
                    "content-length": data.byteLength,
                },
                success: function (offset) { return resolve(offset); },
                error: function (err) { return reject(err.responseText); }
            });
        });
    };
    //this method sets up the REST request and then sends the chunk of file along with the unique indentifier (uploadId)  
    FileUploadService.prototype.uploadFileChunk = function (id, libraryPath, fileName, chunk, data, byteOffset) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var offset = chunk.offset === 0 ? '' : ',fileOffset=' + chunk.offset;
            //parameterising the components of this endpoint avoids the max url length problem in SP (Querystring parameters are not included in this length)  
            var endpoint = _this.siteUrl + "/_api/web/getfilebyserverrelativeurl('" + _this.siteRelativeUrl + "/" + libraryPath + "/" + fileName + "')/" + chunk.method + "(uploadId=guid'" + id + "'" + offset + ")";
            var headers = {
                "Accept": "application/json; odata=verbose",
                "Content-Type": "application/octet-stream"
            };
            _this.executeAsync(endpoint, data, headers).then(function (offset) { return resolve(offset); }).catch(function (err) { return reject(err); });
        });
    };
    //the primary method that resursively calls to get the chunks and upload them to the library (to make the complete file)  
    FileUploadService.prototype.uploadFile = function (result, id, libraryPath, fileName, chunks, index, byteOffset, chunkPercentage, resolve, reject) {
        var _this = this;
        //we slice the file blob into the chunk we need to send in this request (byteOffset tells us the start position)  
        var data = this.convertFileToBlobChunks(result, byteOffset, chunks[index]);
        //upload the chunk to the server using REST, using the unique upload guid as the identifier  
        this.uploadFileChunk(id, libraryPath, fileName, chunks[index], data, byteOffset).then(function (value) {
            var isFinished = index === chunks.length - 1;
            index += 1;
            var percentageComplete = isFinished ? 100 : Math.round((index * chunkPercentage));
            //More chunks to process before the file is finished, continue  
            if (index < chunks.length) {
                _this.uploadFile(result, id, libraryPath, fileName, chunks, index, byteOffset, chunkPercentage, resolve, reject);
            }
            else {
                resolve(value);
            }
        }).catch(function (err) {
            console.log('Error in uploadFileChunk! ' + err);
            reject(err);
        });
    };
    //Helper method - depending on what chunk of data we are dealing with, we need to use the correct REST method...  
    FileUploadService.prototype.getUploadMethod = function (offset, length, total) {
        if (offset + length + 1 > total) {
            return 'finishupload';
        }
        else if (offset === 0) {
            return 'startupload';
        }
        else if (offset < total) {
            return 'continueupload';
        }
        return null;
    };
    //this method slices the blob array buffer to the appropriate chunk and then calls off to get the BinaryString of that chunk  
    FileUploadService.prototype.convertFileToBlobChunks = function (result, byteOffset, chunkInfo) {
        var arrayBuffer = result.slice(chunkInfo.offset, chunkInfo.offset + chunkInfo.length);
        return this.convertDataBinaryString(arrayBuffer);
    };
    FileUploadService.prototype.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    return FileUploadService;
}());
export { FileUploadService };
//# sourceMappingURL=chunk.js.map