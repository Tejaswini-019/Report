/*! *****************************************************************************
Author :
EMail  :
***************************************************************************** */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { SPHttpClient, DigestCache, } from "@microsoft/sp-http";
import * as utilities from '../utils/utilities';
import * as moment from 'moment';
import * as constants from "../utils/constants";
import * as enums from '../utils/enums';
import * as $ from "jquery";
import { SPComponentLoader } from '@microsoft/sp-loader';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
require("../styles/custom.scss");
//require('SPServices');
//require('../js/jquery.SPServices.js');
if (window.location.href.indexOf("/_layouts/15/workbench.aspx")) {
    require('../../shared/styles/workbench.scss');
}
var SPService = /** @class */ (function () {
    /**
     * Service constructor
     * @inheritdoc
     * import SPService from '../../../utilities/SPService';
     * @example
     * const ApiHelper: SPService = new SPService(this.props.context);
     */
    function SPService(_pageContext) {
        var _this = this;
        this.context = _pageContext;
        this.moment = moment;
        this.utils = utilities;
        this.constant = constants;
        this.enum = enums;
        this.absoluteUrl = _pageContext.pageContext.web.absoluteUrl;
        this.serverRelativeUrl = _pageContext.pageContext.web.serverRelativeUrl;
        this.rootSite = this.absoluteUrl.indexOf("/sites/") > -1 ? this.absoluteUrl.split(_pageContext.pageContext.web.serverRelativeUrl)[0] : _pageContext.pageContext.site.absoluteUrl;
        var rootURL = this.serverRelativeUrl.split("/");
        this.rootURL = "/" + rootURL[1] + "/" + rootURL[2];
        this.pageContextInfo = _pageContext.pageContext.legacyPageContext;
        /** Load Css */
        // SPComponentLoader.loadCss(this.absoluteUrl + this.constant.CSS_FONTS);
        // SPComponentLoader.loadCss(this.absoluteUrl + this.constant.CSS_DATATABLE);
        SPComponentLoader.loadCss(this.absoluteUrl + this.constant.CSS_STYLE);
        SPComponentLoader.loadCss(this.absoluteUrl + this.constant.CSS_BOOTSTRAP);
        SPComponentLoader.loadCss(this.absoluteUrl + this.constant.CSS_JQUERYUI);
        SPComponentLoader.loadCss('https://fonts.googleapis.com/css?family=Lato');
        SPComponentLoader.loadCss(this.absoluteUrl + this.constant.CSS_FONTAWESOME);
        SPComponentLoader.loadCss(this.absoluteUrl + this.constant.CSS_SUMMERNOTE);
        // SPComponentLoader.loadCss(this.absoluteUrl + this.constant.CSS_FONTAWESOMEALL);
        SPComponentLoader.loadCss(this.absoluteUrl + this.constant.CSS_CUSTOM);
        // SPComponentLoader.loadCss(this.rootSite + this.constant.CSS_MATERIALDESIGNICONS);
        // SPComponentLoader.loadCss(this.rootSite + this.constant.CSS_SUSS);
        // SPComponentLoader.loadCss(this.rootSite + this.constant.CSS_DATATABLE);
        // SPComponentLoader.loadCss(this.rootSite + this.constant.CSS_TREEVIEW);
        // SPComponentLoader.loadCss(this.rootSite + this.constant.CSS_FONTAWESOME5);
        /** Load JS*/
        SPComponentLoader.loadScript(this.absoluteUrl + this.constant.JS_JQUERY).then(function () {
            SPComponentLoader.loadScript(_this.absoluteUrl + _this.constant.JS_BOOTSTRAP);
            SPComponentLoader.loadScript(_this.absoluteUrl + _this.constant.JS_BOOTSTRAPBUNDLE);
            // SPComponentLoader.loadScript(this.absoluteUrl + this.constant.JS_FONTAWESOME);
            // SPComponentLoader.loadScript( this.absoluteUrl + this.constant.JS_DATATABLE);
            // SPComponentLoader.loadScript( this.absoluteUrl + this.constant.JS_JQUERYUI);
            // SPComponentLoader.loadScript( this.absoluteUrl + this.constant.JS_OFFCANVAS);
            // SPComponentLoader.loadScript( this.absoluteUrl + this.constant.JS_HOVERABLECOLLAPSE);
            // SPComponentLoader.loadScript( this.absoluteUrl + this.constant.JS_MISC);
        });
        //To get the digest value for AJAX post call
        var digestCache = _pageContext.serviceScope.consume(DigestCache.serviceKey);
        digestCache
            .fetchDigest(_pageContext.pageContext.web.serverRelativeUrl)
            .then(function (digest) {
            _this.digest = digest;
        });
    }
    /*=====================================================
            To check the folder is Exists
      =======================================================*/
    /**
     *
     * @private
     * @returns {Promise<bpolean>}
     * @memberof spservices
     */
    SPService.prototype.isFolderExists = function (serverRelativeUrl, siteUrl, createIfNotExists) {
        if (siteUrl === void 0) { siteUrl = ""; }
        if (createIfNotExists === void 0) { createIfNotExists = false; }
        return __awaiter(this, void 0, void 0, function () {
            var url, exists, isCreated, folderUrl, fData, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        siteUrl = siteUrl == "" ? this.absoluteUrl : siteUrl;
                        url = siteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + serverRelativeUrl + "')/Exists";
                        return [4 /*yield*/, this.get(url)];
                    case 1:
                        exists = _a.sent();
                        isCreated = false;
                        if (!(exists.ok && !exists.data.value && createIfNotExists)) return [3 /*break*/, 3];
                        folderUrl = siteUrl + "/_api/web/Folders";
                        fData = {
                            ServerRelativeUrl: serverRelativeUrl
                        };
                        return [4 /*yield*/, this.post(folderUrl, fData)];
                    case 2:
                        result = _a.sent();
                        isCreated = result.ok;
                        _a.label = 3;
                    case 3: return [2 /*return*/, exists.ok ? exists.data.value ? true : isCreated : false];
                }
            });
        });
    };
    /*=====================================================
            To check the file is Exists
      =======================================================*/
    /**
     *
     * @private
     * @returns {Promise<bpolean>}
     * @memberof spservices
     */
    SPService.prototype.isFileExists = function (serverRelativeUrl, siteUrl) {
        if (siteUrl === void 0) { siteUrl = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var url, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        siteUrl = siteUrl == "" ? this.absoluteUrl : siteUrl;
                        url = siteUrl + "/_api/Web/GetFileByServerRelativeUrl('" + serverRelativeUrl + "')/Exists";
                        return [4 /*yield*/, this.get(url)];
                    case 1:
                        exists = _a.sent();
                        return [2 /*return*/, exists.ok ? exists.data.value : false];
                }
            });
        });
    };
    /*=====================================================
            To get Document Type Icon using MapToIcon
      =======================================================*/
    /**
     *
     * @private
     * @returns {Promise<any>}
     * @memberof spservices
     */
    SPService.prototype.getDocumentTypeIcon = function (fileName, progId, size) {
        if (progId === void 0) { progId = ''; }
        if (size === void 0) { size = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var url, icon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.absoluteUrl + "/_api/web/maptoicon(filename='" + fileName + "', progid='" + progId + "', size=" + size + ")";
                        return [4 /*yield*/, this.get(url)];
                    case 1:
                        icon = _a.sent();
                        return [2 /*return*/, icon.ok ? icon.data.MapToIcon : icon.error];
                }
            });
        });
    };
    /*=====================================================
              Convert UTC time to Local
      =======================================================*/
    /**
     *
     * @private
     * @returns {Promise<string>}
     * @memberof spservices
     */
    SPService.prototype.getLocalTime = function (utcTime) {
        return __awaiter(this, void 0, void 0, function () {
            var dateIsoString, uri, localTime, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (typeof utcTime === "string") {
                            dateIsoString = utcTime;
                        }
                        else {
                            //dateIsoString = utcTime.toISOString();
                            dateIsoString = this.utils.dateAdd(utcTime, "minute", utcTime.getTimezoneOffset() * -1).toISOString();
                        }
                        uri = this.absoluteUrl + "/_api/web/RegionalSettings/TimeZone/utcToLocalTime(@date)?@date='" + dateIsoString + "'";
                        return [4 /*yield*/, this.get(uri)];
                    case 1:
                        localTime = _a.sent();
                        return [2 /*return*/, localTime.data.value];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /*=====================================================
              Convert Local time to UTC
      =======================================================*/
    /**
     *
     * @private
     * @returns {Promise<string>}
     * @memberof spservices
     */
    SPService.prototype.getUtcTime = function (localTime) {
        return __awaiter(this, void 0, void 0, function () {
            var dateIsoString, uri, utcTime, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (typeof localTime === "string") {
                            dateIsoString = localTime;
                        }
                        else {
                            //dateIsoString = localTime.toLocaleString();
                            dateIsoString = this.utils.dateAdd(localTime, "minute", localTime.getTimezoneOffset() * -1).toISOString();
                        }
                        uri = this.absoluteUrl + "/_api/web/RegionalSettings/TimeZone/localTimeToUTC(@date)?@date='" + dateIsoString + "'";
                        return [4 /*yield*/, this.get(uri)];
                    case 1:
                        utcTime = _a.sent();
                        return [2 /*return*/, utcTime.data.value];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /*=====================================================
              Uploaded Document using  Rest API
      =======================================================*/
    /**
     * You can upload files up to 2 GB with the REST API.
     * @param serverRelativeUrl Server Relative Url of the folder or library.
     * @param elementId String that specifies the ID value.
     * @param metadata Metadata for the document (optional).
     * @example
     * var serverRelativeUrl = "/sites/rootsite/subsite/shared documents",
     * var elementId = "getFile"
     */
    SPService.prototype.uploadFileToFolderUsingRestApi = function (serverRelativeUrl, elementId, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var _metadata, fileInput, fileName, arrayBuffer, fileCollectionEndpoint, response, fileListItemUri, listItem, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _metadata = JSON.parse(JSON.stringify(metadata));
                        fileInput = (document.getElementById(elementId));
                        if (fileInput.files.length == 0)
                            return [2 /*return*/, "File is empty"];
                        fileName = fileInput.files.item(0).name;
                        return [4 /*yield*/, this.utils.getFileBuffer(elementId)];
                    case 1:
                        arrayBuffer = _a.sent();
                        fileCollectionEndpoint = this.absoluteUrl + "/_api/web/getfolderbyserverrelativeurl('" + serverRelativeUrl + "')/files/add(overwrite=true, url='" + fileName + "')";
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 10, , 11]);
                        return [4 /*yield*/, $.ajax({
                                url: fileCollectionEndpoint,
                                type: "post",
                                data: arrayBuffer,
                                processData: false,
                                headers: {
                                    accept: "application/json;odata=verbose",
                                    "X-RequestDigest": this.digest,
                                    "content-length": arrayBuffer.byteLength,
                                },
                            })];
                    case 3:
                        response = _a.sent();
                        console.log(fileName + " successfully uploaded in " + serverRelativeUrl);
                        if (!(_metadata != undefined)) return [3 /*break*/, 8];
                        if (!response.d.hasOwnProperty("ListItemAllFields")) return [3 /*break*/, 6];
                        fileListItemUri = response.d.ListItemAllFields.__deferred.uri;
                        return [4 /*yield*/, this.GETByRestAPI(fileListItemUri)];
                    case 4:
                        listItem = _a.sent();
                        _metadata["__metadata"] = { type: "" + listItem.data.d.__metadata.type };
                        return [4 /*yield*/, this.UPDATEByRestAPI(listItem.data.d.__metadata.uri, _metadata)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 6: return [2 /*return*/, response];
                    case 7: return [3 /*break*/, 9];
                    case 8: return [2 /*return*/, response];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [2 /*return*/, err_1];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /*=====================================================
              Uploaded Document using  SPHttpClient
      =======================================================*/
    /**
     * You can upload files up to 2 GB with SPHttpClient.
     * @param serverRelativeUrl Server Relative Url of the folder or library.
     * @param elementId String that specifies the ID value.
     * @param metadata Metadata for the document (optional).
     * @param fileInput File input value
     * @example
     * var serverRelativeUrl = "/sites/rootsite/subsite/shared documents",
     * var elementId = "getFile"
     */
    SPService.prototype.uploadFileToFolder = function (serverRelativeUrl, elementId, metadata, file, site) {
        if (site === void 0) { site = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var fileInput, fileName, _file, fileCollectionEndpoint, header, httpClientOptions;
            var _this = this;
            return __generator(this, function (_a) {
                fileInput = (document.getElementById(elementId));
                if (file == undefined)
                    if (fileInput.files.length == 0)
                        return [2 /*return*/, "File is empty"];
                fileName = file != undefined ? file.name : fileInput.files.item(0).name;
                _file = file != undefined ? file : fileInput.files.item(0);
                // Construct the endpoint.
                site = site == "" ? this.absoluteUrl : site;
                fileCollectionEndpoint = site + "/_api/web/GetFolderByServerRelativeUrl('" + serverRelativeUrl + "')/files/add(overwrite=true,url='" + fileName + "')";
                header = {
                    accept: "application/json",
                    "Content-type": "application/json",
                };
                httpClientOptions = {
                    body: _file,
                    headers: header,
                };
                // Send the request and return the response.
                // This call returns the SharePoint file.
                return [2 /*return*/, this.context.spHttpClient
                        .post(fileCollectionEndpoint, SPHttpClient.configurations.v1, httpClientOptions)
                        .then(function (res) {
                        return res.json().then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            var _metadata, fileListItemUri, listItem, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log(fileName + " successfully uploaded in " + serverRelativeUrl);
                                        if (!(metadata != undefined)) return [3 /*break*/, 5];
                                        _metadata = JSON.parse(JSON.stringify(metadata));
                                        if (!response.hasOwnProperty("@odata.id")) return [3 /*break*/, 3];
                                        fileListItemUri = response["@odata.id"] + "/ListItemAllFields";
                                        return [4 /*yield*/, this.GETByRestAPI(fileListItemUri)];
                                    case 1:
                                        listItem = _a.sent();
                                        return [4 /*yield*/, this.update(listItem.data.d.__metadata.uri, _metadata)];
                                    case 2:
                                        result = _a.sent();
                                        return [2 /*return*/, result];
                                    case 3: return [2 /*return*/, response];
                                    case 4: return [3 /*break*/, 6];
                                    case 5: return [2 /*return*/, response];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); }, function (error) {
                            console.error(error);
                            return error;
                        });
                    })];
            });
        });
    };
    /*=====================================================
              update List Item using  Rest API
      =======================================================*/
    /**
     * To update the list item with the REST API.
     * @param itemUrl URI of the item to update.
     * @param metadata Metadata for the item.
     * @example
     * var itemUrl = "https://contoso.sharepoint.com/sites/rootsite/subsite/_api/web/lists/getbytitle('Documents')/items(1)",
     */
    SPService.prototype.UPDATEByRestAPI = function (itemUrl, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _metadata, itemMetadata, body, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = itemUrl;
                        _metadata = JSON.parse(JSON.stringify(metadata));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!!_metadata.hasOwnProperty("__metadata")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.GETByRestAPI(itemUrl)];
                    case 2:
                        itemMetadata = _a.sent();
                        _metadata["__metadata"] = itemMetadata.data.d.__metadata;
                        _a.label = 3;
                    case 3:
                        body = JSON.stringify(_metadata);
                        response = $.ajax({
                            url: url,
                            type: "post",
                            data: body,
                            headers: {
                                accept: "application/json;odata=verbose",
                                "X-RequestDigest": this.digest,
                                "content-Type": "application/json;odata=verbose",
                                "IF-MATCH": "*",
                                "X-HTTP-Method": "MERGE",
                            },
                        });
                        return [2 /*return*/, response.then(function () {
                                var response = {
                                    ok: true,
                                    status: 200,
                                    statusText: 'success',
                                    error: undefined,
                                    type: 'update',
                                    url: url
                                };
                                return response;
                            }, function (err) {
                                var response = {
                                    ok: false,
                                    status: err.status,
                                    statusText: err.statusText,
                                    error: err.responseJSON.error,
                                    type: 'update',
                                    url: url
                                };
                                return response;
                            })];
                    case 4:
                        error_3 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_3)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /*=====================================================
              update List Item using  SPHTTPClient
      =======================================================*/
    /**
     * To update the list item with the SPHTTPClient.
     * @param itemUrl URI of the item to update.
     * @param metadata Metadata for the item.
     * @example
     * var itemUrl = "https://contoso.sharepoint.com/sites/rootsite/subsite/_api/web/lists/getbytitle('Documents')/items(1)",
     */
    SPService.prototype.update = function (itemUrl, metadata) {
        var url = itemUrl;
        var _metadata = JSON.parse(JSON.stringify(metadata));
        //To remove the __metadata property if exists
        if (_metadata.hasOwnProperty("__metadata")) {
            delete _metadata.__metadata;
        }
        var header = {
            Accept: "application/json;odata=nometadata",
            "Content-type": "application/json;odata=nometadata",
            "odata-version": "",
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE",
        };
        var httpClientOptions = {
            headers: header,
            body: JSON.stringify(_metadata),
        };
        // Send the request and return the promise.
        // This call does not return response content from the server.
        return this.context.spHttpClient
            .post(url, SPHttpClient.configurations.v1, httpClientOptions)
            .then(function (response) {
            var res = {
                ok: response.ok,
                status: response.status,
                statusText: response.statusText,
                error: undefined,
                type: response.type,
                url: response.url
            };
            if (!response.ok) {
                return response.json().then(function (responseJSON) {
                    res.error = responseJSON["odata.error"];
                    return res;
                });
            }
            else {
                return res;
            }
        }, function (error) {
            console.error(error);
            var response = {
                ok: false,
                status: 500,
                statusText: 'failed',
                error: error,
                type: 'update',
                url: url
            };
            return response;
        });
    };
    /*=====================================================
              update List Item by id using  Rest API
      =======================================================*/
    /**
     * To update item by id
     * @param listName List name.
     * @param itemId Item Id.
     */
    SPService.prototype.updateItemById = function (listName, itemId, metadata, site) {
        if (site === void 0) { site = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var id, _metadata, uri, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (typeof itemId === "string") ? parseInt(itemId) : itemId;
                        _metadata = JSON.parse(JSON.stringify(metadata));
                        site = site == "" ? this.absoluteUrl : site;
                        uri = site + ("/_api/web/lists/getbytitle('" + listName + "')/items(" + id + ")");
                        return [4 /*yield*/, this.update(uri, _metadata)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /*=====================================================
              Retrieve List Item using  Rest API
      =======================================================*/
    /**
     * To get the list item with the REST API..
     * @param itemUrl URI of the item to retrieve.
     * @example
     * var itemUrl = "https://contoso.sharepoint.com/sites/rootsite/subsite/_api/web/lists/getbytitle('Documents')/items",
     */
    SPService.prototype.GETByRestAPI = function (ItemUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                response = $.ajax({
                    url: ItemUrl,
                    type: "get",
                    headers: { accept: "application/json;odata=verbose" },
                });
                return [2 /*return*/, response.then(function (res) {
                        if (res.d.hasOwnProperty("__next")) {
                            res.d["hasNext"] = true;
                        }
                        else {
                            res.d["hasNext"] = false;
                        }
                        var response = {
                            ok: true,
                            status: 200,
                            statusText: 'success',
                            data: res,
                            error: undefined,
                            type: 'retrieve',
                            url: ItemUrl
                        };
                        return response;
                    }, function (err) {
                        var response = {
                            ok: false,
                            status: err.status,
                            statusText: err.statusText,
                            error: err.responseJSON.error,
                            type: 'retrieve',
                            url: ItemUrl
                        };
                        return response;
                    })];
            });
        });
    };
    /*=====================================================
              Retrieve List Item using  SPHTTPClient
      =======================================================*/
    /**
     * To retrieve the list item with the SPHTTPClient.
     * @param itemUrl URI of the item to retrieve.
     * @example
     * var itemUrl = "https://contoso.sharepoint.com/sites/rootsite/subsite/_api/web/lists/getbytitle('Documents')/items",
     */
    SPService.prototype.get = function (itemUrl) {
        // Send the request and return the promise.
        // This call does not return response content from the server.
        return this.context.spHttpClient
            .get(itemUrl, SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json().then(function (responseJSON) {
                var error = undefined;
                if (!response.ok) {
                    error = {
                        code: responseJSON.error.code,
                        message: {
                            lang: "en-US",
                            value: responseJSON.error.message
                        }
                    };
                }
                var res = {
                    ok: response.ok,
                    status: response.status,
                    statusText: response.statusText,
                    data: responseJSON,
                    error: error,
                    type: response.type,
                    url: response.url
                };
                return res;
            }, function (error) {
                var err = {
                    ok: response.ok,
                    status: response.status,
                    statusText: response.statusText,
                    error: error,
                    type: response.type,
                    url: response.url
                };
                return err;
            });
        }, function (error) {
            var err = {
                ok: false,
                status: 500,
                statusText: 'failed',
                error: error,
                type: 'post',
                url: itemUrl
            };
            return err;
        });
    };
    /*=====================================================
              Add List Item using  Rest API
      =======================================================*/
    /**
     * To add the list item with the REST API.
     * @param itemUrl URI of the item to add.
     * @param metadata Metadata for the item.
     * @example
     * var itemUrl = "https://contoso.sharepoint.com/sites/rootsite/subsite/_api/web/lists/getbytitle('Documents')/items",
     */
    SPService.prototype.POSTByRestAPI = function (itemUrl, metadata) {
        if (metadata === void 0) { metadata = { "__metadata": "" }; }
        return __awaiter(this, void 0, void 0, function () {
            var url, _metadata, itemMetadata, body, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = itemUrl;
                        _metadata = JSON.parse(JSON.stringify(metadata));
                        if (!!_metadata.hasOwnProperty("__metadata")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.GETByRestAPI(itemUrl)];
                    case 1:
                        itemMetadata = _a.sent();
                        _metadata["__metadata"] = itemMetadata.data.d.__metadata;
                        _a.label = 2;
                    case 2:
                        body = JSON.stringify(_metadata);
                        return [4 /*yield*/, $.ajax({
                                url: url,
                                type: "post",
                                data: body,
                                headers: {
                                    Accept: "application/json;odata=verbose",
                                    "Content-Type": "application/json;odata=verbose",
                                    "X-RequestDigest": this.digest,
                                },
                            })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /*=====================================================
              Add Item using  SPHTTPClient
      =======================================================*/
    /**
     * To add the list item with the SPHTTPClient.
     * @param itemUrl URI of the item to add.
     * @param metadata Metadata for the item.
     * @example
     * var itemUrl = "https://contoso.sharepoint.com/sites/rootsite/subsite/_api/web/lists/getbytitle('Documents')/items",
     */
    SPService.prototype.post = function (itemUrl, metadata, httpClientOptions) {
        if (metadata === void 0) { metadata = {}; }
        if (httpClientOptions === void 0) { httpClientOptions = undefined; }
        var url = itemUrl;
        var _metadata = JSON.parse(JSON.stringify(metadata));
        //To remove the __metadata property if exists
        if (_metadata.hasOwnProperty("__metadata")) {
            delete _metadata.__metadata;
        }
        var header = {
            Accept: "application/json;odata=nometadata",
            "Content-type": "application/json;odata=nometadata",
            "odata-version": "",
        };
        if (this.utils.isNullOrUndefined(httpClientOptions)) {
            httpClientOptions = {
                headers: header,
                body: JSON.stringify(_metadata),
            };
        }
        // Send the request and return the promise.
        // This call does not return response content from the server.
        return this.context.spHttpClient
            .post(url, SPHttpClient.configurations.v1, httpClientOptions)
            .then(function (response) {
            console.log("Item successfully added");
            return response;
        }, function (error) {
            console.error(error);
            return error;
        });
    };
    /*=====================================================
              delete List Item using  Rest API
      =======================================================*/
    /**
     * To delete the list item with the REST API.
     * @param itemUrl URI of the item to delete.
     * @example
     * var itemUrl = "https://contoso.sharepoint.com/sites/rootsite/subsite/_api/web/lists/getbytitle('Documents')/items(1)",
     */
    SPService.prototype.deleteByRestAPI = function (itemUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = itemUrl;
                        return [4 /*yield*/, $.ajax({
                                url: url,
                                type: "post",
                                headers: {
                                    // Accept header: Specifies the format for response data from the server.
                                    Accept: "application/json;odata=verbose",
                                    //Content-Type header: Specifies the format of the data that the client is sending to the server
                                    "Content-Type": "application/json;odata=verbose",
                                    // IF-MATCH header: Provides a way to verify that the object being changed has not been changed since it was last retrieved.
                                    // "IF-MATCH":"*", will overwrite any modification in the object, since it was last retrieved.
                                    "IF-MATCH": "*",
                                    //X-HTTP-Method:  The MERGE method updates only the properties of the entity , while the PUT method replaces the existing entity with a new one that you supply in the body of the post
                                    "X-HTTP-Method": "delete",
                                    // X-RequestDigest header: When you send a post request, it must include the form digest value in X-RequestDigest header
                                    "X-RequestDigest": this.digest,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /*=====================================================
              delete List Item using  SPHTTPClient
      =======================================================*/
    /**
     * To delete the list item with the SPHTTPClient.
     * @param itemUrl URI of the item to delete.
     * @example
     * var itemUrl = "https://contoso.sharepoint.com/sites/rootsite/subsite/_api/web/lists/getbytitle('Documents')/items(1)",
     */
    SPService.prototype.delete = function (itemUrl) {
        var url = itemUrl;
        var header = {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=verbose',
            'odata-version': '',
            'IF-MATCH': "*",
            'X-HTTP-Method': 'DELETE'
        };
        var httpClientOptions = {
            headers: header,
        };
        // Send the request and return the promise.
        // This call does not return response content from the server.
        return this.context.spHttpClient
            .post(url, SPHttpClient.configurations.v1, httpClientOptions)
            .then(function (response) {
            console.log("Item successfully deleted");
            return response;
        }, function (error) {
            console.error(error);
            return error;
        });
    };
    /*=====================================================
              delete List Item using  SPHTTPClient
      =======================================================*/
    /**
     * To delete the list item using Id with the SPHTTPClient.
     * @param listName List name.
     * @param itemId Item Id.
     */
    SPService.prototype.deleteItemById = function (listName, itemId) {
        return __awaiter(this, void 0, void 0, function () {
            var id, uri, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (typeof itemId === "string") ? parseInt(itemId) : itemId;
                        uri = this.absoluteUrl + ("/_api/web/lists/getbytitle('" + listName + "')/items(" + id + ")");
                        return [4 /*yield*/, this.delete(uri)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /*=====================================================
              Upload multiple files using SPHTTPClient
      =======================================================*/
    /**
     * You can upload multiple files with the SPHTTPClient.
     * @param serverRelativeUrl Server Relative Url of the folder or library.
     * @param elementId String that specifies the ID value.
     * @param metadata Metadata for the document (optional).
     * @example
     * var serverRelativeUrl = "/sites/rootsite/subsite/shared documents",
     * var elementId = "getFile"
     */
    SPService.prototype.uploadMultipleFilesToFolder = function (serverRelativeUrl, elementId, metadata, site, files) {
        if (site === void 0) { site = ""; }
        if (files === void 0) { files = []; }
        return __awaiter(this, void 0, void 0, function () {
            var fileInput, filesArr, fileCount, count, filesResponse, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileInput = (document.getElementById(elementId));
                        filesArr = fileInput == null ? files : fileInput.files;
                        if (filesArr.length == 0)
                            return [2 /*return*/, "File is empty"];
                        fileCount = filesArr.length;
                        count = 0;
                        filesResponse = Array.prototype.map.call(filesArr, function (file) { return __awaiter(_this, void 0, void 0, function () {
                            var response;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.uploadFileToFolder(serverRelativeUrl, elementId, metadata, file, site)];
                                    case 1:
                                        response = _a.sent();
                                        count++;
                                        console.log("Total file uploaded: " + count + " of " + fileCount);
                                        return [2 /*return*/, response];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(filesResponse)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /*=====================================================
              Retrieve Paged List Item using  Rest API
      =======================================================*/
    /**
     * To get the list item with the REST API..
     * @param selectedList List name.
     * @param selectedFields Fields to retrieve.
     * @param filterQuery Fields to filter.
     * @param orderBy Order By.
     */
    SPService.prototype.getPagedListItems = function (selectedList, selectedFields, filterQuery, orderBy, expand, url) {
        if (selectedFields === void 0) { selectedFields = []; }
        if (filterQuery === void 0) { filterQuery = ""; }
        if (orderBy === void 0) { orderBy = ""; }
        if (expand === void 0) { expand = []; }
        if (url === void 0) { url = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var selectQuery, expandQuery, listItems, i, apiUri, items, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        selectQuery = ["Id"];
                        expandQuery = expand;
                        listItems = [];
                        for (i = 0; i < selectedFields.length; i++) {
                            switch (selectedFields[i].fieldType) {
                                case this.constant.FIELD_TYPE_USER:
                                    selectQuery.push(selectedFields[i].key + "/Title," + selectedFields[i].key + "/Id," + selectedFields[i].key + "/Name");
                                    expandQuery.push(selectedFields[i].key);
                                    break;
                                case this.constant.FIELD_TYPE_LOOKUP:
                                    selectQuery.push(selectedFields[i].key + "/Title");
                                    expandQuery.push(selectedFields[i].key);
                                    break;
                                case this.constant.FIELD_TYPE_ATTACHMENT:
                                    selectQuery.push("Attachments,AttachmentFiles");
                                    expandQuery.push("AttachmentFiles");
                                    break;
                                default:
                                    selectQuery.push(selectedFields[i].key);
                                    break;
                            }
                        }
                        apiUri = url == "" ? this.absoluteUrl + ("/_api/web/lists/getbytitle('" + selectedList + "')/items") : url;
                        if (selectedFields.length != 0) {
                            apiUri += "?$Select=" + selectQuery.join() + "&$expand=" + expandQuery.join() + "&$filter=" + filterQuery + "&$orderby=" + orderBy + "&$top=" + this.constant.LIST_PAGED_LIMIT;
                        }
                        else {
                            apiUri += "?$expand=" + expandQuery.join() + "&$filter=" + filterQuery + "&$orderby=" + orderBy + "&$top=" + this.constant.LIST_PAGED_LIMIT;
                        }
                        return [4 /*yield*/, this.GETByRestAPI(apiUri)];
                    case 1:
                        items = _a.sent();
                        if (items.ok) {
                            listItems = items.data.d.results;
                        }
                        else {
                            throw (items);
                        }
                        _a.label = 2;
                    case 2:
                        if (!items.data.d.hasNext) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.GETByRestAPI(items.data.d.__next)];
                    case 3:
                        items = _a.sent();
                        if (items.ok) {
                            listItems = __spreadArrays(listItems, items.data.d.results);
                        }
                        else {
                            throw (items);
                        }
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, listItems];
                    case 5:
                        err_2 = _a.sent();
                        Promise.reject(err_2);
                        return [2 /*return*/, listItems];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /*=====================================================
                    Retrieve item by id
      =======================================================*/
    /**
     * To Retrieve item by id
     * @param listName List name.
     * @param itemId Item Id.
     */
    SPService.prototype.getItemById = function (listName, itemId, select, expand, site) {
        if (select === void 0) { select = ""; }
        if (expand === void 0) { expand = ""; }
        if (site === void 0) { site = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var id, uri, result, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (typeof itemId === "string") ? parseInt(itemId) : itemId;
                        site = site == "" ? this.absoluteUrl : site;
                        uri = site + ("/_api/web/lists/getbytitle('" + listName + "')/items(" + id + ")?$select=" + select + "&$expand=" + expand);
                        return [4 /*yield*/, this.get(uri)];
                    case 1:
                        result = _a.sent();
                        item = result.data;
                        return [2 /*return*/, item];
                }
            });
        });
    };
    /*=====================================================
          Retrieve recurrence calendar events using SPService
      =======================================================*/
    /**
     * To get the list item with the REST API..
     * @param calendarName List name.
     */
    SPService.prototype.getRecurrenceEvents = function (calendarName, rowLimit, eventPeriod) {
        if (rowLimit === void 0) { rowLimit = 0; }
        if (eventPeriod === void 0) { eventPeriod = this.enum.CalendarEventPeriod.Year; }
        return __awaiter(this, void 0, void 0, function () {
            var today, events, periodTag, sp, calendarPromises;
            return __generator(this, function (_a) {
                today = this.moment().format();
                events = [];
                periodTag = "";
                switch (eventPeriod) {
                    case this.enum.CalendarEventPeriod.Today:
                        periodTag = "<Today />";
                        break;
                    case this.enum.CalendarEventPeriod.Month:
                        periodTag = "<Month />";
                        break;
                    default:
                        periodTag = "<Year />";
                }
                sp = $().SPServices;
                calendarPromises = $().SPServices.SPGetListItemsJson({
                    listName: calendarName,
                    CAMLRowLimit: rowLimit,
                    CAMLViewFields: "<ViewFields>" +
                        "<FieldRef Name='ID' />" +
                        "<FieldRef Name='Title' />" +
                        "<FieldRef Name='EventDate' />" +
                        "<FieldRef Name='EndDate' />" +
                        "<FieldRef Name='Location' />" +
                        "<FieldRef Name='Description' />" +
                        "<FieldRef Name='Category' />" +
                        "<FieldRef Name='fRecurrence' />" +
                        "<FieldRef Name='RecurrenceData' />" +
                        "<FieldRef Name='fAllDayEvent' />" +
                        "</ViewFields>",
                    CAMLQuery: "<Query>" +
                        "<Where>" +
                        "<DateRangesOverlap>" +
                        "<FieldRef Name='EventDate' />" +
                        "<FieldRef Name='EndDate' />" +
                        "<FieldRef Name='RecurrenceID' />" +
                        "<Value Type='DateTime'>" +
                        periodTag +
                        "</Value>" +
                        "</DateRangesOverlap>" +
                        "</Where>" +
                        "<OrderBy>" +
                        "<FieldRef Name='EventDate' />" +
                        "</OrderBy>" +
                        "</Query>",
                    CAMLQueryOptions: "<QueryOptions>" +
                        "<CalendarDate>" + today + "</CalendarDate>" +
                        "<ExpandRecurrence>TRUE</ExpandRecurrence>" +
                        "<RecurrenceOrderBy>TRUE</RecurrenceOrderBy>" +
                        "<ViewAttributes Scope='RecursiveAll'/>" +
                        "</QueryOptions>",
                    mappingOverrides: {
                        "ows_fAllDayEvent": {
                            "mappedName": "fAllDayEvent",
                            "objectType": "Boolean"
                        },
                        "ows_fRecurrence": {
                            "mappedName": "fRecurrence",
                            "objectType": "Boolean"
                        }
                    }
                });
                return [2 /*return*/, $.when(calendarPromises).then(function () {
                        var calendarEvents = this;
                        $(calendarEvents.data).each(function () {
                            var event = {
                                listName: calendarName,
                                Id: this.ID,
                                title: this.Title,
                                location: this.Location != null ? this.Location : "",
                                Category: this.Category,
                                EventDate: this.EventDate,
                                monthName: moment(this.EventDate).format("MMMM"),
                                monthShortName: moment(this.EventDate).format("MMM"),
                                eventDay: moment(this.EventDate).format("DD"),
                                EndDate: this.EndDate,
                                fAllDayEvent: this.fAllDayEvent,
                                fRecurrence: this.fRecurrence,
                                RecurrenceData: this.RecurrenceData
                            };
                            events.push(event);
                        });
                        //events = calendarEvents.data;
                        events.sort(function (a, b) {
                            var aDate = moment(a.EventDate);
                            var bDate = moment(b.EventDate);
                            return aDate.isAfter(bDate) ? 1 : (aDate.isBefore(bDate) ? -1 : 0);
                        });
                        return events;
                    })];
            });
        });
    };
    /*=====================================================
                Get current user details
      =======================================================*/
    /**
     * Get current user details
     */
    SPService.prototype.getCurrentUser = function (site) {
        if (site === void 0) { site = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var url, user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        site = site == "" ? this.absoluteUrl : site;
                        url = site + "/_api/web/currentuser";
                        user = undefined;
                        return [4 /*yield*/, this.get(url)];
                    case 1:
                        result = _a.sent();
                        if (result.ok) {
                            user = result.data;
                            return [2 /*return*/, user];
                        }
                        else {
                            return [2 /*return*/, user];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /*=====================================================
                Find the component admin
      =======================================================*/
    /**
     * Find the component admin.
     * @param accessMatrixListName List name.
     * @param componentName List name.
     */
    SPService.prototype.isComponentAdmin = function (accessMatrixListName, componentName) {
        return __awaiter(this, void 0, void 0, function () {
            var url, userId, itemResult, users_1, userResults, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.absoluteUrl + ("/_api/web/lists/getByTitle('" + accessMatrixListName + "')/items?$filter=Title eq '" + componentName + "'");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        userId = typeof this.pageContextInfo.userId == "string" ? parseInt(this.pageContextInfo.userId) : this.pageContextInfo.userId;
                        return [4 /*yield*/, this.get(url)];
                    case 2:
                        itemResult = _a.sent();
                        if (!(itemResult.ok && itemResult.data.value.length > 0)) return [3 /*break*/, 6];
                        if (!(itemResult.data.value[0].OwnerId.indexOf(userId) > -1)) return [3 /*break*/, 3];
                        return [2 /*return*/, true];
                    case 3:
                        users_1 = [];
                        userResults = itemResult.data.value[0].OwnerId.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                            var groupUsers;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getGroupUsers(id, true)];
                                    case 1:
                                        groupUsers = _a.sent();
                                        users_1 = __spreadArrays(users_1, groupUsers);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(userResults)];
                    case 4:
                        _a.sent();
                        if (users_1.indexOf(userId) > -1) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        console.log(itemResult);
                        return [2 /*return*/, false];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err_3 = _a.sent();
                        return [2 /*return*/, false];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /*=====================================================
                Get Site Groups
      =======================================================*/
    /**
     * get site groups.
     * @param isCurrentUserGroupsOnly get current user group only.
     * @param returnOnlyId to return only array of group id
     * @param site site name.
     */
    SPService.prototype.getSiteGroups = function (isCurrentUserGroupsOnly, returnOnlyId, site) {
        if (isCurrentUserGroupsOnly === void 0) { isCurrentUserGroupsOnly = false; }
        if (returnOnlyId === void 0) { returnOnlyId = false; }
        if (site === void 0) { site = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var url, expand, groups, filteredGroup;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        site = site == "" ? this.absoluteUrl : site;
                        url = site + "/_api/web/sitegroups";
                        expand = ["users"];
                        return [4 /*yield*/, this.getPagedListItems("", [], "", "Title asc", expand, url)];
                    case 1:
                        groups = _a.sent();
                        // const filteredGroup = groups.map((element) => {
                        //   return {...element, Users: element.Users.filter((Users) => Users.Id === 1)}
                        // })
                        if (isCurrentUserGroupsOnly) {
                            filteredGroup = groups.filter(function (group) {
                                return group.Users.results.filter(function (user) { return user.Id == _this.pageContextInfo.userId; }).length > 0;
                            });
                            return [2 /*return*/, returnOnlyId ? filteredGroup.map(function (group) { return group.Id; }) : filteredGroup];
                        }
                        else {
                            return [2 /*return*/, returnOnlyId ? groups.map(function (group) { return group.Id; }) : groups];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /*=====================================================
                Get Group Users
      =======================================================*/
    /**
     * get site groups.
     * @param returnOnlyId to return only array of group id
     * @param site site name.
     */
    SPService.prototype.getGroupUsers = function (groupId, returnOnlyId, site) {
        if (returnOnlyId === void 0) { returnOnlyId = false; }
        if (site === void 0) { site = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var url, users, groupResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        site = site == "" ? this.absoluteUrl : site;
                        url = site + ("/_api/web/sitegroups/getbyid(" + groupId + ")/users?$top=4999");
                        users = [];
                        return [4 /*yield*/, this.get(url)];
                    case 1:
                        groupResult = _a.sent();
                        if (groupResult.ok) {
                            users = groupResult.data.value.length > 0 ? groupResult.data.value : [];
                            return [2 /*return*/, returnOnlyId ? users.map(function (user) { return user.Id; }) : users];
                        }
                        else {
                            this.utils.error(groupResult, "getUserGroup");
                            users.push(groupId);
                            return [2 /*return*/, users];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /*=====================================================
                      Redirect
      =======================================================*/
    /**
     * Redirect.
     * @param url url.
     */
    SPService.prototype.redirect = function (url) {
        if (url === void 0) { url = ""; }
        if (this.utils.isNullOrEmpty(url)) {
            window.location.href = this.absoluteUrl;
        }
        else if (url.indexOf(this.absoluteUrl) > -1) {
            window.location.href = url;
        }
        else {
            window.location.href = this.absoluteUrl + url;
        }
    };
    /*=====================================================
                      Discussion Reply
      =======================================================*/
    /**
     * Redirect.
     * @param listTitle url.
     * @param messagePayload meta for reply
     * @example
     * var messagePayload = {
        '__metadata': { "type": "SP.Data.DistestListItem" },  //set DiscussionBoard entity type name
        'Body': "Final Test child",  //message Body
        'FileSystemObjectType': 0, //setto 0 to make sure Mesage Item
        'ContentTypeId': '0x0107008822E9328717EB48B3B665EE2266388E', //set Message content type
        'ParentItemID': 1  //set Discussion (topic) Id
      };
     */
    SPService.prototype.createNewDiscussionReply = function (listTitle, messagePayload) {
        var __this = this;
        var topicUrl = null;
        var webUrl = this.absoluteUrl;
        return this.getParentTopic(webUrl, listTitle, messagePayload.ParentItemID)
            .then(function (result) {
            topicUrl = result.d.ServerRelativeUrl;
            return __this.createListItem(webUrl, listTitle, messagePayload);
        })
            .then(function (result) {
            var itemId = result.d.Id;
            return __this.moveListItem(webUrl, listTitle, itemId, topicUrl);
        });
    };
    SPService.prototype.executeJson = function (options) {
        var headers = options.headers || {};
        var method = options.method || "GET";
        headers["Accept"] = "application/json;odata=verbose";
        if (options.method == "POST") {
            headers["X-RequestDigest"] = this.digest;
        }
        var ajaxOptions = {
            url: options.url,
            type: method,
            contentType: "application/json;odata=verbose",
            headers: headers
        };
        if ("data" in options) {
            ajaxOptions.data = JSON.stringify(options.data);
        }
        return $.ajax(ajaxOptions);
    };
    SPService.prototype.createListItem = function (webUrl, listTitle, payload) {
        var url = webUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/items";
        return this.executeJson({
            "url": url,
            "method": 'POST',
            "data": payload
        });
    };
    SPService.prototype.moveListItem = function (webUrl, listTitle, itemId, folderUrl) {
        var __this = this;
        var url = webUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/getItemById(" + itemId + ")?$select=FileDirRef,FileRef";
        return this.executeJson({
            "url": url
        })
            .then(function (result) {
            var fileUrl = result.d.FileRef;
            var fileDirRef = result.d.FileDirRef;
            var moveFileUrl = fileUrl.replace(fileDirRef, folderUrl);
            var url = webUrl + "/_api/web/getfilebyserverrelativeurl('" + fileUrl + "')/moveto(newurl='" + moveFileUrl + "',flags=1)";
            return __this.executeJson({
                "url": url,
                "method": 'POST'
            });
        });
    };
    SPService.prototype.getParentTopic = function (webUrl, listTitle, itemId) {
        var url = webUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/getItemById(" + itemId + ")/Folder";
        return this.executeJson({
            "url": url,
        });
    };
    /*=====================================================
                     To Tag image to list item
     =======================================================*/
    /**
     * Redirect.
     * @param imageLibraryName name of library to upload image.
     * @param imageMeta metadata for the image
     * @param targetListName name of the list to tag the image
     * @param targetItemId item id
     * @param targetItemColumn hyperlink column name of the target list
     */
    SPService.prototype.tagImageToListItem = function (imageLibraryName, targetListName, targetItemId, targetItemColumn, elemId) {
        return __awaiter(this, void 0, void 0, function () {
            var serUrl, fi, fileName, folderIsExists, fileServerUrl, _url, meta, res, targetMeta, url, fileIsExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serUrl = this.serverRelativeUrl == "/" ? "" : this.serverRelativeUrl;
                        imageLibraryName = serUrl + imageLibraryName;
                        fi = document.getElementById(elemId);
                        fileName = fi.files.item(0).name;
                        return [4 /*yield*/, this.isFolderExists(imageLibraryName)];
                    case 1:
                        folderIsExists = _a.sent();
                        fileServerUrl = imageLibraryName + "/" + fileName;
                        if (!!folderIsExists) return [3 /*break*/, 3];
                        _url = this.absoluteUrl + "/_api/web/folders";
                        meta = {
                            "__metadata": {
                                "type": "SP.Folder"
                            },
                            "ServerRelativeUrl": imageLibraryName
                        };
                        return [4 /*yield*/, this.post(_url, meta)];
                    case 2:
                        res = _a.sent();
                        _a.label = 3;
                    case 3:
                        targetMeta = {};
                        url = {
                            Url: fileServerUrl,
                            Description: fileName
                        };
                        targetMeta[targetItemColumn] = url;
                        return [4 /*yield*/, this.isFileExists(fileServerUrl)];
                    case 4:
                        fileIsExists = _a.sent();
                        if (!!fileIsExists) return [3 /*break*/, 7];
                        //Upload the given file
                        return [4 /*yield*/, this.uploadFileToFolder(imageLibraryName, elemId)];
                    case 5:
                        //Upload the given file
                        _a.sent();
                        return [4 /*yield*/, this.updateItemById(targetListName, targetItemId, targetMeta)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7: 
                    //File already exists
                    return [4 /*yield*/, this.updateItemById(targetListName, targetItemId, targetMeta)];
                    case 8:
                        //File already exists
                        _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /*=====================================================
                     To download a file using blob
     =======================================================*/
    /**
     * Redirect.
     * @param fileServerRelativeUrl file server relative url.
     * @param fileName Name of the file
     * @param site site absolute url
     */
    SPService.prototype.downloadFileUsingBlob = function (fileServerRelativeUrl, fileName, site) {
        if (site === void 0) { site = ""; }
        var __this = this;
        site = site ? site : this.absoluteUrl;
        var filepath = site + "/_api/Web/GetFileByServerRelativeUrl('" + fileServerRelativeUrl + "')/openbinarystream";
        var dfd = $.Deferred();
        var xhr = new XMLHttpRequest();
        xhr.open("GET", filepath);
        xhr.responseType = "blob";
        //setting response-type header to be blob so that we get the file as blob
        xhr.onload = function () {
            //async call
            var blobobj = xhr.response;
            __this.utils.downloadBlob(blobobj, fileName);
            //window.navigator.msSaveBlob(blobobj, fileName);
            //save using msSaveBlob.
            dfd.resolve(true);
        };
        xhr.send();
        return dfd.promise();
    };
    /*=====================================================
                     To generate form number
     =======================================================*/
    /**
     * @param formNoConfigListName Form Number Configuration List Name.
     * @param formName Name of the form
     * @param site site absolute url
     */
    SPService.prototype.generateFormNo = function (formNoConfigListName, formName, site) {
        if (site === void 0) { site = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var formNo, formNoListUrl, formNoResult, item, today, month, year, meta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        site = site ? site : this.absoluteUrl;
                        formNo = "";
                        formNoListUrl = site + ("/_api/lists/getbytitle('" + formNoConfigListName + "')/items?$filter=Title eq '" + formName + "'");
                        return [4 /*yield*/, this.get(formNoListUrl)];
                    case 1:
                        formNoResult = _a.sent();
                        if (!(formNoResult.ok && formNoResult.data.value.length > 0)) return [3 /*break*/, 3];
                        item = formNoResult.data.value[0];
                        today = new Date();
                        month = (today.getMonth() + 1);
                        year = (month >= 4) ? today.getFullYear() : (today.getFullYear() - 1);
                        formNo += item.Prefix1 ? item.Prefix1 + "/" : "";
                        formNo += item.Prefix2 ? item.Prefix2 + "/" : "";
                        formNo += "FY" + year + "/";
                        formNo += this.utils.pad(Math.floor(item.UpcomingFormNo).toString(), item.NumberLength, "0");
                        meta = {
                            CurrentFormNo: item.UpcomingFormNo
                        };
                        return [4 /*yield*/, this.updateItemById(formNoConfigListName, item.Id, meta)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, formNo];
                }
            });
        });
    };
    /*=====================================================
                     To get email template
     =======================================================*/
    /**
     * Redirect.
     * @param templateName name of the template.
     * @param listName Name of the list
     * @param placeholderDetails metadata for placeholder
     */
    SPService.prototype.getEmailTemplate = function (listName, templateName, placeholderDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var templateUrl, result, item, sentence, placeholders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        templateUrl = this.absoluteUrl + ("/_api/web/lists/getbytitle('" + listName + "')/items?$filter=Title eq '" + templateName + "'");
                        return [4 /*yield*/, this.get(templateUrl)];
                    case 1:
                        result = _a.sent();
                        if (result.ok && result.data.value.length > 0) {
                            item = result.data.value[0];
                            sentence = item.Body;
                            placeholders = sentence.match(/\$(.*?)\$/g);
                            placeholders.forEach(function (placeholder) {
                                //Placeholder - $Name$
                                var phText = placeholder.substring(1, placeholder.length - 1);
                                //phText = Name
                                if (placeholderDetails[phText]) {
                                    sentence = sentence.replace(placeholder, placeholderDetails[phText]);
                                }
                                else {
                                    sentence = sentence.replace(placeholder, "N/A");
                                }
                            });
                            console.log(sentence);
                            return [2 /*return*/, sentence];
                        }
                        else {
                            if (!result.ok) {
                                this.utils.error(result, "Email template", false);
                            }
                            return [2 /*return*/, ""];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SPService.prototype.getDelegatedDetails = function (listName, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var currentDateIso, delegateeId, delegateeDetails, getRequestUrl, responseData, delegateeIdLevel1, getRequestUrlLevel2, responseDataLevel2, delegateeIdLevel2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentDateIso = new Date().toISOString().split("T")[0] + "T00:00:00Z";
                        delegateeId = 0;
                        delegateeDetails = undefined;
                        getRequestUrl = this.absoluteUrl + ("/_api/web/lists/getbytitle('" + listName + "')/items?$select=Id,DelegateeId,Delegatee/Title&$expand=Delegatee&$filter=UserId eq '" + userId + "' and IsEnabled eq 1 and StartDate le '" + currentDateIso + "' and EndDate ge '" + currentDateIso + "'");
                        return [4 /*yield*/, this.get(getRequestUrl)];
                    case 1:
                        responseData = _a.sent();
                        if (!responseData.ok) return [3 /*break*/, 4];
                        delegateeIdLevel1 = (responseData.data.value.length > 0 ? responseData.data.value[0].DelegateeId : 0);
                        if (!(delegateeIdLevel1 > 0)) return [3 /*break*/, 3];
                        getRequestUrlLevel2 = this.absoluteUrl + ("/_api/web/lists/getbytitle('" + listName + "')/items?$select=Id,DelegateeId,Delegatee/Title&$expand=Delegatee&$filter=UserId eq '" + delegateeIdLevel1 + "' and IsEnabled eq 1 and StartDate le '" + currentDateIso + "' and EndDate ge '" + currentDateIso + "'");
                        return [4 /*yield*/, this.get(getRequestUrlLevel2)];
                    case 2:
                        responseDataLevel2 = _a.sent();
                        delegateeIdLevel2 = (responseDataLevel2.data.value.length > 0 ? responseDataLevel2.data.value[0].DelegateeId : 0);
                        if (delegateeIdLevel2 > 0) { // userId delegatee has another delegatee case
                            delegateeId = userId;
                            delegateeDetails = responseData.data.value[0];
                        }
                        else {
                            delegateeId = delegateeIdLevel1;
                            delegateeDetails = responseData.data.value[0];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, delegateeDetails];
                    case 4:
                        this.utils.error(responseData, "Out of Office", false);
                        return [2 /*return*/, -1];
                }
            });
        });
    };
    SPService.prototype.getDelegatedUserId = function (listName, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var currentDateIso, delegateeId, getRequestUrl, responseData, delegateeIdLevel1, getRequestUrlLevel2, responseDataLevel2, delegateeIdLevel2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentDateIso = new Date().toISOString().split("T")[0] + "T00:00:00Z";
                        delegateeId = 0;
                        getRequestUrl = this.absoluteUrl + ("/_api/web/lists/getbytitle('" + listName + "')/items?$select=Id,DelegateeId&$filter=UserId eq '" + userId + "' and IsEnabled eq 1 and StartDate le '" + currentDateIso + "' and EndDate ge '" + currentDateIso + "'");
                        return [4 /*yield*/, this.get(getRequestUrl)];
                    case 1:
                        responseData = _a.sent();
                        if (!responseData.ok) return [3 /*break*/, 4];
                        delegateeIdLevel1 = (responseData.data.value.length > 0 ? responseData.data.value[0].DelegateeId : 0);
                        if (!(delegateeIdLevel1 > 0)) return [3 /*break*/, 3];
                        getRequestUrlLevel2 = this.absoluteUrl + ("/_api/web/lists/getbytitle('" + listName + "')/items?$select=Id,DelegateeId&$filter=UserId eq '" + delegateeIdLevel1 + "' and IsEnabled eq 1 and StartDate le '" + currentDateIso + "' and EndDate ge '" + currentDateIso + "'");
                        return [4 /*yield*/, this.get(getRequestUrlLevel2)];
                    case 2:
                        responseDataLevel2 = _a.sent();
                        delegateeIdLevel2 = (responseDataLevel2.data.value.length > 0 ? responseDataLevel2.data.value[0].DelegateeId : 0);
                        if (delegateeIdLevel2 > 0) { // userId delegatee has another delegatee case
                            delegateeId = userId;
                        }
                        else {
                            delegateeId = delegateeIdLevel1;
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, delegateeId];
                    case 4:
                        this.utils.error(responseData, "Out of Office", false);
                        return [2 /*return*/, -1];
                }
            });
        });
    };
    SPService.prototype.getMyGraphAPIData = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        props.context.msGraphClientFactory.getClient()
                            .then(function (client) {
                            // get information about the current user from the Microsoft Graph
                            return client.api('/me').version('beta').get(function (error, response, rawResponse) {
                                if (error) {
                                    console.error(error);
                                    reject(error);
                                }
                                resolve(response);
                            });
                        });
                    })];
            });
        });
    };
    return SPService;
}());
export default SPService;
//# sourceMappingURL=SPService.js.map