/*! *****************************************************************************
Author :
EMail  :
***************************************************************************** */
/// <reference types="jquery" />
import { IHttpClientOptions } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import * as utilities from '../utils/utilities';
import * as moment from 'moment';
import * as constants from "../utils/constants";
import * as enums from '../utils/enums';
import { IEventData } from "../models/IEventData";
import { IHttpClientResponse } from "../models/IHttpClientResponse";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { IUser } from "../models/IUser";
import { ILegacyPageContext } from "../models/ILegacyPageContext";
export default class SPService {
    private context;
    digest: string;
    moment: typeof moment;
    utils: typeof utilities;
    constant: typeof constants;
    enum: typeof enums;
    rootSite: string;
    absoluteUrl: string;
    serverRelativeUrl: string;
    rootURL: string;
    pageContextInfo: ILegacyPageContext;
    /**
     * Service constructor
     * @inheritdoc
     * import SPService from '../../../utilities/SPService';
     * @example
     * const ApiHelper: SPService = new SPService(this.props.context);
     */
    constructor(_pageContext: WebPartContext);
    /**
     *
     * @private
     * @returns {Promise<bpolean>}
     * @memberof spservices
     */
    isFolderExists(serverRelativeUrl: string, siteUrl?: string, createIfNotExists?: boolean): Promise<boolean>;
    /**
     *
     * @private
     * @returns {Promise<bpolean>}
     * @memberof spservices
     */
    isFileExists(serverRelativeUrl: string, siteUrl?: string): Promise<boolean>;
    /**
     *
     * @private
     * @returns {Promise<any>}
     * @memberof spservices
     */
    getDocumentTypeIcon(fileName: string, progId?: string, size?: number): Promise<any>;
    /**
     *
     * @private
     * @returns {Promise<string>}
     * @memberof spservices
     */
    getLocalTime(utcTime: string | Date): Promise<string>;
    /**
     *
     * @private
     * @returns {Promise<string>}
     * @memberof spservices
     */
    getUtcTime(localTime: string | Date): Promise<string>;
    /**
     * You can upload files up to 2 GB with the REST API.
     * @param serverRelativeUrl Server Relative Url of the folder or library.
     * @param elementId String that specifies the ID value.
     * @param metadata Metadata for the document (optional).
     * @example
     * var serverRelativeUrl = "/sites/rootsite/subsite/shared documents",
     * var elementId = "getFile"
     */
    uploadFileToFolderUsingRestApi(serverRelativeUrl: string, elementId: string, metadata?: object): Promise<any>;
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
    uploadFileToFolder(serverRelativeUrl: string, elementId: string, metadata?: object, file?: File | undefined, site?: string): Promise<any>;
    /**
     * To update the list item with the REST API.
     * @param itemUrl URI of the item to update.
     * @param metadata Metadata for the item.
     * @example
     * var itemUrl = "https://contoso.sharepoint.com/sites/rootsite/subsite/_api/web/lists/getbytitle('Documents')/items(1)",
     */
    UPDATEByRestAPI(itemUrl: string, metadata: object): Promise<IHttpClientResponse>;
    /**
     * To update the list item with the SPHTTPClient.
     * @param itemUrl URI of the item to update.
     * @param metadata Metadata for the item.
     * @example
     * var itemUrl = "https://contoso.sharepoint.com/sites/rootsite/subsite/_api/web/lists/getbytitle('Documents')/items(1)",
     */
    update(itemUrl: string, metadata: object): Promise<IHttpClientResponse>;
    /**
     * To update item by id
     * @param listName List name.
     * @param itemId Item Id.
     */
    updateItemById(listName: string, itemId: number | string, metadata: object, site?: string): Promise<IHttpClientResponse>;
    /**
     * To get the list item with the REST API..
     * @param itemUrl URI of the item to retrieve.
     * @example
     * var itemUrl = "https://contoso.sharepoint.com/sites/rootsite/subsite/_api/web/lists/getbytitle('Documents')/items",
     */
    GETByRestAPI(ItemUrl: string): Promise<IHttpClientResponse>;
    /**
     * To retrieve the list item with the SPHTTPClient.
     * @param itemUrl URI of the item to retrieve.
     * @example
     * var itemUrl = "https://contoso.sharepoint.com/sites/rootsite/subsite/_api/web/lists/getbytitle('Documents')/items",
     */
    get(itemUrl: string): Promise<IHttpClientResponse>;
    /**
     * To add the list item with the REST API.
     * @param itemUrl URI of the item to add.
     * @param metadata Metadata for the item.
     * @example
     * var itemUrl = "https://contoso.sharepoint.com/sites/rootsite/subsite/_api/web/lists/getbytitle('Documents')/items",
     */
    POSTByRestAPI(itemUrl: string, metadata?: object): Promise<any>;
    /**
     * To add the list item with the SPHTTPClient.
     * @param itemUrl URI of the item to add.
     * @param metadata Metadata for the item.
     * @example
     * var itemUrl = "https://contoso.sharepoint.com/sites/rootsite/subsite/_api/web/lists/getbytitle('Documents')/items",
     */
    post(itemUrl: string, metadata?: object, httpClientOptions?: IHttpClientOptions): Promise<any>;
    /**
     * To delete the list item with the REST API.
     * @param itemUrl URI of the item to delete.
     * @example
     * var itemUrl = "https://contoso.sharepoint.com/sites/rootsite/subsite/_api/web/lists/getbytitle('Documents')/items(1)",
     */
    deleteByRestAPI(itemUrl: string): Promise<any>;
    /**
     * To delete the list item with the SPHTTPClient.
     * @param itemUrl URI of the item to delete.
     * @example
     * var itemUrl = "https://contoso.sharepoint.com/sites/rootsite/subsite/_api/web/lists/getbytitle('Documents')/items(1)",
     */
    delete(itemUrl: string): Promise<any>;
    /**
     * To delete the list item using Id with the SPHTTPClient.
     * @param listName List name.
     * @param itemId Item Id.
     */
    deleteItemById(listName: string, itemId: string | number): Promise<any>;
    /**
     * You can upload multiple files with the SPHTTPClient.
     * @param serverRelativeUrl Server Relative Url of the folder or library.
     * @param elementId String that specifies the ID value.
     * @param metadata Metadata for the document (optional).
     * @example
     * var serverRelativeUrl = "/sites/rootsite/subsite/shared documents",
     * var elementId = "getFile"
     */
    uploadMultipleFilesToFolder(serverRelativeUrl: string, elementId: string, metadata?: object, site?: string, files?: any[]): Promise<any>;
    /**
     * To get the list item with the REST API..
     * @param selectedList List name.
     * @param selectedFields Fields to retrieve.
     * @param filterQuery Fields to filter.
     * @param orderBy Order By.
     */
    getPagedListItems(selectedList: string, selectedFields?: any[], filterQuery?: string, orderBy?: string, expand?: any[], url?: string): Promise<any[]>;
    /**
     * To Retrieve item by id
     * @param listName List name.
     * @param itemId Item Id.
     */
    getItemById(listName: string, itemId: number | string, select?: string, expand?: string, site?: string): Promise<any>;
    /**
     * To get the list item with the REST API..
     * @param calendarName List name.
     */
    getRecurrenceEvents(calendarName: string, rowLimit?: number, eventPeriod?: number): Promise<IEventData[]>;
    /**
     * Get current user details
     */
    getCurrentUser(site?: string): Promise<IUser>;
    /**
     * Find the component admin.
     * @param accessMatrixListName List name.
     * @param componentName List name.
     */
    isComponentAdmin(accessMatrixListName: string, componentName: string): Promise<boolean>;
    /**
     * get site groups.
     * @param isCurrentUserGroupsOnly get current user group only.
     * @param returnOnlyId to return only array of group id
     * @param site site name.
     */
    getSiteGroups(isCurrentUserGroupsOnly?: boolean, returnOnlyId?: boolean, site?: string): Promise<any[]>;
    /**
     * get site groups.
     * @param returnOnlyId to return only array of group id
     * @param site site name.
     */
    getGroupUsers(groupId: string | number, returnOnlyId?: boolean, site?: string): Promise<any[]>;
    /**
     * Redirect.
     * @param url url.
     */
    redirect(url?: string): void;
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
    createNewDiscussionReply(listTitle: string, messagePayload: any): JQueryPromise<any>;
    private executeJson;
    private createListItem;
    private moveListItem;
    private getParentTopic;
    /**
     * Redirect.
     * @param imageLibraryName name of library to upload image.
     * @param imageMeta metadata for the image
     * @param targetListName name of the list to tag the image
     * @param targetItemId item id
     * @param targetItemColumn hyperlink column name of the target list
     */
    tagImageToListItem(imageLibraryName: string, targetListName: string, targetItemId: string | number, targetItemColumn: string, elemId: string): Promise<void>;
    /**
     * Redirect.
     * @param fileServerRelativeUrl file server relative url.
     * @param fileName Name of the file
     * @param site site absolute url
     */
    downloadFileUsingBlob(fileServerRelativeUrl: string, fileName: string, site?: string): JQueryPromise<unknown>;
    /**
     * @param formNoConfigListName Form Number Configuration List Name.
     * @param formName Name of the form
     * @param site site absolute url
     */
    generateFormNo(formNoConfigListName: string, formName: string, site?: string): Promise<string>;
    /**
     * Redirect.
     * @param templateName name of the template.
     * @param listName Name of the list
     * @param placeholderDetails metadata for placeholder
     */
    getEmailTemplate(listName: string, templateName: string, placeholderDetails: any): Promise<string>;
    getDelegatedDetails(listName: string, userId: number): Promise<any>;
    getDelegatedUserId(listName: string, userId: number): Promise<number>;
    getMyGraphAPIData(props: any): Promise<any>;
}
//# sourceMappingURL=SPService.d.ts.map