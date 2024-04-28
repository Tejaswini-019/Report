import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp, IRegionalSettings } from '@pnp/sp/presets/all';
import SPPNPLogger from '../services/SPPNPLogger';
import { IUserPermissions } from '../models/IUserPermissions';
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IEventData } from "../models/IEventData";
export default class SPPNPService {
    private context;
    _logger: SPPNPLogger;
    sp: typeof sp;
    constructor(context: WebPartContext);
    addComment(): Promise<void>;
    getListItems(selectedList: string, selectedFields: any[]): Promise<any[]>;
    getFields(selectedList: string): Promise<any>;
    getUserProfileUrl(loginName: string): Promise<any>;
    /**
   *
   * @private
   * @returns {Promise<string>}
   * @memberof spservices
   */
    getLocalTime(date: string | Date): Promise<string>;
    /**
     *
     * @private
     * @returns {Promise<string>}
     * @memberof spservices
     */
    getUtcTime(date: string | Date): Promise<string>;
    /**
     *
     * @param {number} userId
     * @param {string} siteUrl
     * @returns {Promise<SiteUser>}
     * @memberof spservices
     */
    getUserById(userId: number, siteUrl: string): Promise<ISiteUserInfo>;
    /**
     *
     *
     * @param {string} loginName
     * @param {string} siteUrl
     * @returns {Promise<SiteUser>}
     * @memberof spservices
     */
    getUserByLoginName(loginName: string, siteUrl: string): Promise<ISiteUserInfo>;
    /**
     *
     * @param {string} loginName
     * @returns
     * @memberof spservices
     */
    getUserProfilePictureUrl(loginName: string): Promise<any>;
    /**
     *
     * @param {string} listName
     * @returns {Promise<IUserPermissions>}
     * @memberof spservices
     */
    getUserPermissions(listName: string): Promise<IUserPermissions>;
    /**
     *
     * @param {string} siteUrl
     * @returns
     * @memberof spservices
     */
    getSiteLists(siteUrl: string): Promise<any[]>;
    /**
     *
     * @private
     * @param {string} siteUrl
     * @returns
     * @memberof spservices
     */
    getSiteRegionalSettingsTimeZone(siteUrl: string): Promise<IRegionalSettings>;
    /**
     * ensure that a list exists. If it doesn't it will be created with the provided title (the rest of the settings will be default):
     * @public
     * @param {string} listName
     * @returns
     * @memberof spservices
     */
    ensureList(listName: string): Promise<string>;
    /**
     *
     * @param {string} siteUrl
     * @param {string} listName
     * @param {string} fieldInternalName
     * @returns {Promise<{ key: string, text: string }[]>}
     * @memberof spservices
     */
    getChoiceFieldOptions(siteUrl: string, listName: string, fieldInternalName: string): Promise<{
        key: string;
        text: string;
    }[]>;
    /**
     *
     * @private
     * @returns
     * @memberof spservices
     */
    colorGenerate(): Promise<string>;
    /**
     *
     * @param {string} siteUrl
     * @param {string} listName
     * @param {Date} eventStartDate
     * @param {Date} eventEndDate
     * @returns {Promise< IEventData[]>}
     * @memberof spservices
     */
    getEvents(listName: string, eventStartDate: Date | null, eventEndDate: Date | null, top?: number, filter?: {}): Promise<IEventData[]>;
    /**
     *
     *
     * @param {string} siteUrl
     * @param {string} listName
     * @param {number} eventId
     * @returns {Promise<IEventData>}
     * @memberof spservices
     */
    getEvent(listName: string, eventId: number, siteUrl?: string): Promise<IEventData>;
    deCodeHtmlEntities(string: string): Promise<string>;
}
//# sourceMappingURL=SPPNPService.d.ts.map