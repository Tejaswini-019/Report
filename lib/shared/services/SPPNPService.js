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
import { sp, PermissionKind } from '@pnp/sp/presets/all';
import SPPNPLogger from '../services/SPPNPLogger';
import { ListTemplateType } from '../utils/enums';
import * as moment from 'moment';
import parseRecurrentEvent from "./parseRecurrentEvent";
var SPPNPService = /** @class */ (function () {
    function SPPNPService(context) {
        this.context = context;
        sp.setup({
            spfxContext: this.context
        });
        this._logger = new SPPNPLogger();
        this.sp = sp;
    }
    SPPNPService.prototype.addComment = function () {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sp.web.lists.getByTitle("distest").items.get();
                        return [4 /*yield*/, sp.web.getFileByServerRelativeUrl("/Lists/distest/Parent Item").getItem()];
                    case 1:
                        item = _a.sent();
                        // as an example, or any of the below options
                        return [4 /*yield*/, item.comments()];
                    case 2:
                        // as an example, or any of the below options
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SPPNPService.prototype.getListItems = function (selectedList, selectedFields) {
        return __awaiter(this, void 0, void 0, function () {
            var selectQuery, expandQuery, listItems, items, i, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        selectQuery = ['Id'];
                        expandQuery = [];
                        listItems = [];
                        items = void 0;
                        for (i = 0; i < selectedFields.length; i++) {
                            switch (selectedFields[i].fieldType) {
                                case 'SP.FieldUser':
                                    selectQuery.push(selectedFields[i].key + "/Title," + selectedFields[i].key + "/EMail," + selectedFields[i].key + "/Name");
                                    expandQuery.push(selectedFields[i].key);
                                    break;
                                case 'SP.FieldLookup':
                                    selectQuery.push(selectedFields[i].key + "/Title");
                                    expandQuery.push(selectedFields[i].key);
                                    break;
                                case 'SP.Field':
                                    selectQuery.push('Attachments,AttachmentFiles');
                                    expandQuery.push('AttachmentFiles');
                                    break;
                                default:
                                    selectQuery.push(selectedFields[i].key);
                                    break;
                            }
                        }
                        return [4 /*yield*/, sp.web.lists.getById(selectedList).items
                                .select(selectQuery.join())
                                .expand(expandQuery.join())
                                .top(4999)
                                .getPaged()];
                    case 1:
                        items = _a.sent();
                        listItems = items.results;
                        _a.label = 2;
                    case 2:
                        if (!items.hasNext) return [3 /*break*/, 4];
                        return [4 /*yield*/, items.getNext()];
                    case 3:
                        items = _a.sent();
                        listItems = __spreadArrays(listItems, items.results);
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, listItems];
                    case 5:
                        err_1 = _a.sent();
                        Promise.reject(err_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SPPNPService.prototype.getFields = function (selectedList) {
        return __awaiter(this, void 0, void 0, function () {
            var allFields, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, sp.web.lists
                                .getById(selectedList)
                                .fields
                                .filter("Hidden eq false and ReadOnlyField eq false and Title ne 'Content Type' and Title ne 'Attachments'")
                                .get()];
                    case 1:
                        allFields = _a.sent();
                        return [2 /*return*/, allFields];
                    case 2:
                        err_2 = _a.sent();
                        Promise.reject(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SPPNPService.prototype.getUserProfileUrl = function (loginName) {
        return __awaiter(this, void 0, void 0, function () {
            var properties, profileUrl, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, sp.profiles.getPropertiesFor(loginName)];
                    case 1:
                        properties = _a.sent();
                        profileUrl = properties['PictureUrl'];
                        return [2 /*return*/, profileUrl];
                    case 2:
                        err_3 = _a.sent();
                        Promise.reject(err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
   *
   * @private
   * @returns {Promise<string>}
   * @memberof spservices
   */
    SPPNPService.prototype.getLocalTime = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var localTime, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, sp.web.regionalSettings.timeZone.utcToLocalTime(date)];
                    case 1:
                        localTime = _a.sent();
                        return [2 /*return*/, localTime];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @private
     * @returns {Promise<string>}
     * @memberof spservices
     */
    SPPNPService.prototype.getUtcTime = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var utcTime, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, sp.web.regionalSettings.timeZone.localTimeToUTC(date)];
                    case 1:
                        utcTime = _a.sent();
                        return [2 /*return*/, utcTime];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param {number} userId
     * @param {string} siteUrl
     * @returns {Promise<SiteUser>}
     * @memberof spservices
     */
    SPPNPService.prototype.getUserById = function (userId, siteUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = null;
                        if (!userId && !siteUrl) {
                            return [2 /*return*/, null];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.web.siteUsers.getById(userId).get()];
                    case 2:
                        //const web = new Web(siteUrl);
                        results = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_3)];
                    case 4: return [2 /*return*/, results];
                }
            });
        });
    };
    /**
     *
     *
     * @param {string} loginName
     * @param {string} siteUrl
     * @returns {Promise<SiteUser>}
     * @memberof spservices
     */
    SPPNPService.prototype.getUserByLoginName = function (loginName, siteUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = null;
                        if (!loginName && !siteUrl) {
                            return [2 /*return*/, null];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        //const web = new Web(siteUrl);
                        return [4 /*yield*/, sp.web.ensureUser(loginName)];
                    case 2:
                        //const web = new Web(siteUrl);
                        _a.sent();
                        return [4 /*yield*/, sp.web.siteUsers.getByLoginName(loginName).get()];
                    case 3:
                        results = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_4)];
                    case 5: return [2 /*return*/, results];
                }
            });
        });
    };
    /**
     *
     * @param {string} loginName
     * @returns
     * @memberof spservices
     */
    SPPNPService.prototype.getUserProfilePictureUrl = function (loginName) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.profiles.usingCaching().getPropertiesFor(loginName)];
                    case 2:
                        results = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        results = null;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, results.PictureUrl];
                }
            });
        });
    };
    /**
     *
     * @param {string} listName
     * @returns {Promise<IUserPermissions>}
     * @memberof spservices
     */
    SPPNPService.prototype.getUserPermissions = function (listName) {
        return __awaiter(this, void 0, void 0, function () {
            var hasPermissionAdd, hasPermissionEdit, hasPermissionDelete, hasPermissionView, userPermissions, userEffectivePermissions, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hasPermissionAdd = false;
                        hasPermissionEdit = false;
                        hasPermissionDelete = false;
                        hasPermissionView = false;
                        userPermissions = undefined;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.web.lists.getByTitle(listName).effectiveBasePermissions.get()];
                    case 2:
                        userEffectivePermissions = _a.sent();
                        // ...
                        hasPermissionAdd = sp.web.lists.getByTitle(listName).hasPermissions(userEffectivePermissions, PermissionKind.AddListItems);
                        hasPermissionDelete = sp.web.lists.getByTitle(listName).hasPermissions(userEffectivePermissions, PermissionKind.DeleteListItems);
                        hasPermissionEdit = sp.web.lists.getByTitle(listName).hasPermissions(userEffectivePermissions, PermissionKind.EditListItems);
                        hasPermissionView = sp.web.lists.getByTitle(listName).hasPermissions(userEffectivePermissions, PermissionKind.ViewListItems);
                        userPermissions = { hasPermissionAdd: hasPermissionAdd, hasPermissionEdit: hasPermissionEdit, hasPermissionDelete: hasPermissionDelete, hasPermissionView: hasPermissionView };
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_6)];
                    case 4: return [2 /*return*/, userPermissions];
                }
            });
        });
    };
    /**
     *
     * @param {string} siteUrl
     * @returns
     * @memberof spservices
     */
    SPPNPService.prototype.getSiteLists = function (siteUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.web.lists.select("Title", "ID").filter('BaseTemplate eq ' + ListTemplateType.CustomList).get()];
                    case 2:
                        //const web = new Web(siteUrl);
                        results = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_7)];
                    case 4: return [2 /*return*/, results];
                }
            });
        });
    };
    /**
     *
     * @private
     * @param {string} siteUrl
     * @returns
     * @memberof spservices
     */
    SPPNPService.prototype.getSiteRegionalSettingsTimeZone = function (siteUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var regionalSettings;
            return __generator(this, function (_a) {
                try {
                    ////const web = new Web(siteUrl);
                    //regionalSettings = await sp.web.regionalSettings.timeZone.usingCaching().get();
                }
                catch (error) {
                    return [2 /*return*/, Promise.reject(error)];
                }
                return [2 /*return*/, regionalSettings];
            });
        });
    };
    /**
     * ensure that a list exists. If it doesn't it will be created with the provided title (the rest of the settings will be default):
     * @public
     * @param {string} listName
     * @returns
     * @memberof spservices
     */
    SPPNPService.prototype.ensureList = function (listName) {
        return __awaiter(this, void 0, void 0, function () {
            var listEnsureResult, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.web.lists.ensure(listName, listName, ListTemplateType.CustomList)];
                    case 1:
                        listEnsureResult = _a.sent();
                        // check if the list was created, or if it already existed:
                        if (listEnsureResult.created) {
                            this._logger.info(listName + " was created!");
                        }
                        else {
                            this._logger.info(listName + " already existed!");
                        }
                        return [4 /*yield*/, listEnsureResult.list.select("Id")()];
                    case 2:
                        r = _a.sent();
                        // return the Id
                        return [2 /*return*/, r.Id];
                }
            });
        });
    };
    /**
     *
     * @param {string} siteUrl
     * @param {string} listName
     * @param {string} fieldInternalName
     * @returns {Promise<{ key: string, text: string }[]>}
     * @memberof spservices
     */
    SPPNPService.prototype.getChoiceFieldOptions = function (siteUrl, listName, fieldInternalName) {
        return __awaiter(this, void 0, void 0, function () {
            var fieldOptions, results, _i, _a, option, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fieldOptions = [];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.web.lists.getByTitle(listName)
                                .fields
                                .getByInternalNameOrTitle(fieldInternalName)
                                .select("Title", "InternalName", "Choices")
                                .get()];
                    case 2:
                        results = _b.sent();
                        if (results && results.Choices.length > 0) {
                            for (_i = 0, _a = results.Choices; _i < _a.length; _i++) {
                                option = _a[_i];
                                fieldOptions.push({
                                    key: option,
                                    text: option
                                });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_8 = _b.sent();
                        return [2 /*return*/, Promise.reject(error_8)];
                    case 4: return [2 /*return*/, fieldOptions];
                }
            });
        });
    };
    /**
     *
     * @private
     * @returns
     * @memberof spservices
     */
    SPPNPService.prototype.colorGenerate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hexValues, newColor, i, x, y;
            return __generator(this, function (_a) {
                hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];
                newColor = "#";
                for (i = 0; i < 6; i++) {
                    x = Math.round(Math.random() * 14);
                    y = hexValues[x];
                    newColor += y;
                }
                return [2 /*return*/, newColor];
            });
        });
    };
    /**
     *
     * @param {string} siteUrl
     * @param {string} listName
     * @param {Date} eventStartDate
     * @param {Date} eventEndDate
     * @returns {Promise< IEventData[]>}
     * @memberof spservices
     */
    SPPNPService.prototype.getEvents = function (listName, eventStartDate, eventEndDate, top, filter) {
        if (top === void 0) { top = 0; }
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var events, categoryDropdownOption, categoryColor, _i, categoryDropdownOption_1, cat, _a, _b, _c, today, DatesInUtc, query, results, row, event_1, _d, row_1, eventDate, _e, endDate, _f, initialsArray, initials, userPictureUrl, attendees, first, last, geo, geolocation, CategoryColorValue, isAllDayEvent, _g, _h, attendee, _j, _k, _l, _m, parseEvt, error_9;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        events = [];
                        _o.label = 1;
                    case 1:
                        _o.trys.push([1, 22, , 23]);
                        return [4 /*yield*/, this.getChoiceFieldOptions("", listName, 'Category')];
                    case 2:
                        categoryDropdownOption = _o.sent();
                        categoryColor = [];
                        _i = 0, categoryDropdownOption_1 = categoryDropdownOption;
                        _o.label = 3;
                    case 3:
                        if (!(_i < categoryDropdownOption_1.length)) return [3 /*break*/, 6];
                        cat = categoryDropdownOption_1[_i];
                        _b = (_a = categoryColor).push;
                        _c = { category: cat.text };
                        return [4 /*yield*/, this.colorGenerate()];
                    case 4:
                        _b.apply(_a, [(_c.color = _o.sent(), _c)]);
                        _o.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        today = moment().format();
                        DatesInUtc = false;
                        query = "<View>\n          <ViewFields>\n            <FieldRef Name='RecurrenceData'/>\n            <FieldRef Name='Duration'/>\n            <FieldRef Name='Author'/>\n            <FieldRef Name='Category'/>\n            <FieldRef Name='Description'/>\n            <FieldRef Name='ParticipantsPicker'/>\n            <FieldRef Name='Geolocation'/>\n            <FieldRef Name='ID'/>\n            <FieldRef Name='EndDate'/>\n            <FieldRef Name='EventDate'/>\n            <FieldRef Name='Id'/>\n            <FieldRef Name='Location'/>\n            <FieldRef Name='Title'/>\n            <FieldRef Name='fAllDayEvent'/>\n            <FieldRef Name='EventType'/>\n            <FieldRef Name='UID' />\n            <FieldRef Name='fRecurrence' />\n          </ViewFields>\n          <Query>\n            <Where>\n              <Or>\n                <DateRangesOverlap>\n                    <FieldRef Name='EventDate' />\n                    <FieldRef Name='EndDate' />\n                    <FieldRef Name='RecurrenceID' />\n                    <Value Type='DateTime'>\n                      <Today />\n                    </Value>\n                </DateRangesOverlap>\n                <And>\n                 <Geq>\n                   <FieldRef Name='EventDate' />\n                   <Value IncludeTimeValue='false' Type='DateTime'>" + moment(eventStartDate).format('YYYY-MM-DD') + "</Value>\n                 </Geq>\n                 <Leq>\n                   <FieldRef Name='EventDate' />\n                   <Value IncludeTimeValue='false' Type='DateTime'>" + moment(eventEndDate).format('YYYY-MM-DD') + "</Value>\n                 </Leq>\n                </And>\n              </Or>\n            </Where>\n            <OrderBy>\n              <FieldRef Name='EventDate' />\n            </OrderBy>\n          </Query>\n          <QueryOptions>\n            <CalendarDate>" + today + "</CalendarDate>\n            <ExpandRecurrence>TRUE</ExpandRecurrence>\n            <RecurrenceOrderBy>TRUE</RecurrenceOrderBy>\n            <ViewAttributes Scope='RecursiveAll'/>\n          </QueryOptions>\n        </View>";
                        return [4 /*yield*/, sp.web.lists.getByTitle(listName).usingCaching().renderListDataAsStream({
                                //DatesInUtc: true,
                                ViewXml: query,
                            })];
                    case 7:
                        results = _o.sent();
                        console.log(results);
                        if (!(results && results.Row.length > 0)) return [3 /*break*/, 21];
                        row = results.Row;
                        if (Object.keys(filter).length > 0) {
                            row = row.filter(function (f) {
                                var isMatching = true;
                                Object.keys(filter).forEach(function (key, index) {
                                    // key: the name of the object key
                                    // index: the ordinal position of the key within the object
                                    var oValue = f[key];
                                    var fValue = filter[key];
                                    var valid = (oValue.toLowerCase().indexOf(fValue.toLowerCase()) > -1) ? true : false;
                                    if (!valid)
                                        isMatching = false;
                                });
                                return isMatching;
                            });
                        }
                        event_1 = '';
                        _d = 0, row_1 = row;
                        _o.label = 8;
                    case 8:
                        if (!(_d < row_1.length)) return [3 /*break*/, 21];
                        event_1 = row_1[_d];
                        if (!DatesInUtc) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.getLocalTime(event_1.EventDate)];
                    case 9:
                        _e = _o.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        _e = event_1.EventDate;
                        _o.label = 11;
                    case 11:
                        eventDate = _e;
                        if (!DatesInUtc) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.getLocalTime(event_1.EndDate)];
                    case 12:
                        _f = _o.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        _f = event_1.EndDate;
                        _o.label = 14;
                    case 14:
                        endDate = _f;
                        initialsArray = event_1.Author[0].title.split(' ');
                        initials = initialsArray[0].charAt(0) + initialsArray[initialsArray.length - 1].charAt(0);
                        return [4 /*yield*/, this.getUserProfilePictureUrl("i:0#.f|membership|" + event_1.Author[0].email)];
                    case 15:
                        userPictureUrl = _o.sent();
                        attendees = [];
                        first = event_1.Geolocation != undefined ? event_1.Geolocation.indexOf('(') + 1 : 0;
                        last = event_1.Geolocation != undefined ? event_1.Geolocation.indexOf(')') : 0;
                        geo = event_1.Geolocation != undefined ? event_1.Geolocation.substring(first, last) : '0 0';
                        geolocation = geo.split(' ');
                        CategoryColorValue = categoryColor.filter(function (value) {
                            return value.category == event_1.Category;
                        });
                        isAllDayEvent = event_1["fAllDayEvent.value"] === "1";
                        for (_g = 0, _h = event_1.ParticipantsPicker; _g < _h.length; _g++) {
                            attendee = _h[_g];
                            attendees.push(parseInt(attendee.id));
                        }
                        _k = (_j = events).push;
                        _l = {
                            Id: event_1.ID,
                            ID: event_1.ID,
                            EventType: event_1.EventType
                        };
                        return [4 /*yield*/, this.deCodeHtmlEntities(event_1.Title)];
                    case 16:
                        _l.title = _o.sent(),
                            _l.Description = event_1.Description,
                            _l.EventDate = isAllDayEvent ? new Date(event_1.EventDate.slice(0, -1)) : new Date(eventDate),
                            _l.EndDate = isAllDayEvent ? new Date(event_1.EndDate.slice(0, -1)) : new Date(endDate),
                            _l.location = event_1.Location,
                            _l.ownerEmail = event_1.Author[0].email,
                            _l.ownerPhoto = userPictureUrl ?
                                "https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=" + event_1.Author[0].email + "&UA=0&size=HR96x96" : '',
                            _l.ownerInitial = initials,
                            _l.color = CategoryColorValue.length > 0 ? CategoryColorValue[0].color : '#1a75ff',
                            _l.ownerName = event_1.Author[0].title,
                            _l.attendes = attendees,
                            _l.fAllDayEvent = isAllDayEvent,
                            _l.geolocation = { Longitude: parseFloat(geolocation[0]), Latitude: parseFloat(geolocation[1]) },
                            _l.Category = event_1.Category,
                            _l.Duration = event_1.Duration;
                        if (!event_1.RecurrenceData) return [3 /*break*/, 18];
                        return [4 /*yield*/, this.deCodeHtmlEntities(event_1.RecurrenceData)];
                    case 17:
                        _m = _o.sent();
                        return [3 /*break*/, 19];
                    case 18:
                        _m = "";
                        _o.label = 19;
                    case 19:
                        _k.apply(_j, [(_l.RecurrenceData = _m,
                                _l.fRecurrence = event_1.fRecurrence,
                                _l.RecurrenceID = event_1.RecurrenceID ? event_1.RecurrenceID : undefined,
                                _l.MasterSeriesItemID = event_1.MasterSeriesItemID,
                                _l.UID = event_1.UID.replace("{", "").replace("}", ""),
                                _l.monthName = moment(event_1.EventDate).format("MMMM"),
                                _l.monthShortName = moment(event_1.EventDate).format("MMM"),
                                _l.eventDay = moment(event_1.EventDate).format("DD"),
                                _l)]);
                        _o.label = 20;
                    case 20:
                        _d++;
                        return [3 /*break*/, 8];
                    case 21:
                        parseEvt = new parseRecurrentEvent();
                        events = parseEvt.parseEvents(events, eventStartDate, null, top);
                        //Return Data
                        events.sort(function (a, b) {
                            var aDate = moment(a.EventDate);
                            var bDate = moment(b.EventDate);
                            return aDate.isAfter(bDate) ? 1 : (aDate.isBefore(bDate) ? -1 : 0);
                        });
                        if (top > 0 && events.length > 0)
                            return [2 /*return*/, events.slice(0, top)];
                        else
                            return [2 /*return*/, events];
                        return [3 /*break*/, 23];
                    case 22:
                        error_9 = _o.sent();
                        console.dir(error_9);
                        return [2 /*return*/, Promise.reject(error_9)];
                    case 23: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     *
     * @param {string} siteUrl
     * @param {string} listName
     * @param {number} eventId
     * @returns {Promise<IEventData>}
     * @memberof spservices
     */
    SPPNPService.prototype.getEvent = function (listName, eventId, siteUrl) {
        if (siteUrl === void 0) { siteUrl = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var returnEvent, event_2, eventDate, endDate, _a, _b, _c, error_10;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        returnEvent = undefined;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 12, , 13]);
                        return [4 /*yield*/, sp.web.lists.getByTitle(listName).items.getById(eventId)
                                .select("RecurrenceID", "MasterSeriesItemID", "Id", "ID", "ParticipantsPickerId", "EventType", "Title", "Description", "EventDate", "EndDate", "Location", "Author/SipAddress", "Author/Title", "fAllDayEvent", "fRecurrence", "RecurrenceData", "RecurrenceData", "Duration", "Category", "UID", "RegistrationCloseDate", "SendEmail", "ContactPersonId", "Scope", "ContactPerson/Title", "ContactPerson/Id")
                                .expand("Author,ContactPerson")
                                .get()];
                    case 2:
                        event_2 = _d.sent();
                        return [4 /*yield*/, this.getLocalTime(event_2.EventDate)];
                    case 3:
                        eventDate = _d.sent();
                        return [4 /*yield*/, this.getLocalTime(event_2.EndDate)];
                    case 4:
                        endDate = _d.sent();
                        _a = {
                            Id: event_2.ID,
                            ID: event_2.ID,
                            EventType: event_2.EventType
                        };
                        return [4 /*yield*/, this.deCodeHtmlEntities(event_2.Title)];
                    case 5:
                        _a.title = _d.sent(),
                            _a.Description = event_2.Description ? event_2.Description : '',
                            _a.EventDate = new Date(eventDate),
                            _a.EndDate = new Date(endDate),
                            _a.location = event_2.Location,
                            _a.ownerEmail = event_2.Author.SipAddress,
                            _a.ownerPhoto = "",
                            _a.ownerInitial = '',
                            _a.color = '',
                            _a.ownerName = event_2.Author.Title,
                            _a.attendes = event_2.ParticipantsPickerId,
                            _a.fAllDayEvent = event_2.fAllDayEvent,
                            _a.geolocation = { Longitude: event_2.Geolocation ? event_2.Geolocation.Longitude : 0, Latitude: event_2.Geolocation ? event_2.Geolocation.Latitude : 0 },
                            _a.Category = event_2.Category,
                            _a.Duration = event_2.Duration,
                            _a.UID = event_2.UID;
                        if (!event_2.RecurrenceData) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.deCodeHtmlEntities(event_2.RecurrenceData)];
                    case 6:
                        _b = _d.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        _b = "";
                        _d.label = 8;
                    case 8:
                        _a.RecurrenceData = _b,
                            _a.fRecurrence = event_2.fRecurrence,
                            _a.RecurrenceID = event_2.RecurrenceID,
                            _a.MasterSeriesItemID = event_2.MasterSeriesItemID;
                        if (!(event_2.RegistrationCloseDate != null)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.getLocalTime(event_2.RegistrationCloseDate)];
                    case 9:
                        _c = _d.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        _c = null;
                        _d.label = 11;
                    case 11:
                        returnEvent = (_a.RegistrationCloseDate = _c,
                            _a.Scope = event_2.Scope,
                            _a.SendEmail = event_2.SendEmail,
                            _a.ContactPersonId = event_2.ContactPersonId != null ? event_2.ContactPersonId : null,
                            _a.ContactPerson = event_2.ContactPerson != null ? event_2.ContactPerson : null,
                            _a);
                        return [3 /*break*/, 13];
                    case 12:
                        error_10 = _d.sent();
                        return [2 /*return*/, Promise.reject(error_10)];
                    case 13: return [2 /*return*/, returnEvent];
                }
            });
        });
    };
    SPPNPService.prototype.deCodeHtmlEntities = function (string) {
        return __awaiter(this, void 0, void 0, function () {
            var HtmlEntitiesMap, entityMap, key, entity, regex;
            return __generator(this, function (_a) {
                HtmlEntitiesMap = {
                    "'": "&#39;",
                    "<": "&lt;",
                    ">": "&gt;",
                    " ": "&nbsp;",
                    "¡": "&iexcl;",
                    "¢": "&cent;",
                    "£": "&pound;",
                    "¤": "&curren;",
                    "¥": "&yen;",
                    "¦": "&brvbar;",
                    "§": "&sect;",
                    "¨": "&uml;",
                    "©": "&copy;",
                    "ª": "&ordf;",
                    "«": "&laquo;",
                    "¬": "&not;",
                    "®": "&reg;",
                    "¯": "&macr;",
                    "°": "&deg;",
                    "±": "&plusmn;",
                    "²": "&sup2;",
                    "³": "&sup3;",
                    "´": "&acute;",
                    "µ": "&micro;",
                    "¶": "&para;",
                    "·": "&middot;",
                    "¸": "&cedil;",
                    "¹": "&sup1;",
                    "º": "&ordm;",
                    "»": "&raquo;",
                    "¼": "&frac14;",
                    "½": "&frac12;",
                    "¾": "&frac34;",
                    "¿": "&iquest;",
                    "À": "&Agrave;",
                    "Á": "&Aacute;",
                    "Â": "&Acirc;",
                    "Ã": "&Atilde;",
                    "Ä": "&Auml;",
                    "Å": "&Aring;",
                    "Æ": "&AElig;",
                    "Ç": "&Ccedil;",
                    "È": "&Egrave;",
                    "É": "&Eacute;",
                    "Ê": "&Ecirc;",
                    "Ë": "&Euml;",
                    "Ì": "&Igrave;",
                    "Í": "&Iacute;",
                    "Î": "&Icirc;",
                    "Ï": "&Iuml;",
                    "Ð": "&ETH;",
                    "Ñ": "&Ntilde;",
                    "Ò": "&Ograve;",
                    "Ó": "&Oacute;",
                    "Ô": "&Ocirc;",
                    "Õ": "&Otilde;",
                    "Ö": "&Ouml;",
                    "×": "&times;",
                    "Ø": "&Oslash;",
                    "Ù": "&Ugrave;",
                    "Ú": "&Uacute;",
                    "Û": "&Ucirc;",
                    "Ü": "&Uuml;",
                    "Ý": "&Yacute;",
                    "Þ": "&THORN;",
                    "ß": "&szlig;",
                    "à": "&agrave;",
                    "á": "&aacute;",
                    "â": "&acirc;",
                    "ã": "&atilde;",
                    "ä": "&auml;",
                    "å": "&aring;",
                    "æ": "&aelig;",
                    "ç": "&ccedil;",
                    "è": "&egrave;",
                    "é": "&eacute;",
                    "ê": "&ecirc;",
                    "ë": "&euml;",
                    "ì": "&igrave;",
                    "í": "&iacute;",
                    "î": "&icirc;",
                    "ï": "&iuml;",
                    "ð": "&eth;",
                    "ñ": "&ntilde;",
                    "ò": "&ograve;",
                    "ó": "&oacute;",
                    "ô": "&ocirc;",
                    "õ": "&otilde;",
                    "ö": "&ouml;",
                    "÷": "&divide;",
                    "ø": "&oslash;",
                    "ù": "&ugrave;",
                    "ú": "&uacute;",
                    "û": "&ucirc;",
                    "ü": "&uuml;",
                    "ý": "&yacute;",
                    "þ": "&thorn;",
                    "ÿ": "&yuml;",
                    "Œ": "&OElig;",
                    "œ": "&oelig;",
                    "Š": "&Scaron;",
                    "š": "&scaron;",
                    "Ÿ": "&Yuml;",
                    "ƒ": "&fnof;",
                    "ˆ": "&circ;",
                    "˜": "&tilde;",
                    "Α": "&Alpha;",
                    "Β": "&Beta;",
                    "Γ": "&Gamma;",
                    "Δ": "&Delta;",
                    "Ε": "&Epsilon;",
                    "Ζ": "&Zeta;",
                    "Η": "&Eta;",
                    "Θ": "&Theta;",
                    "Ι": "&Iota;",
                    "Κ": "&Kappa;",
                    "Λ": "&Lambda;",
                    "Μ": "&Mu;",
                    "Ν": "&Nu;",
                    "Ξ": "&Xi;",
                    "Ο": "&Omicron;",
                    "Π": "&Pi;",
                    "Ρ": "&Rho;",
                    "Σ": "&Sigma;",
                    "Τ": "&Tau;",
                    "Υ": "&Upsilon;",
                    "Φ": "&Phi;",
                    "Χ": "&Chi;",
                    "Ψ": "&Psi;",
                    "Ω": "&Omega;",
                    "α": "&alpha;",
                    "β": "&beta;",
                    "γ": "&gamma;",
                    "δ": "&delta;",
                    "ε": "&epsilon;",
                    "ζ": "&zeta;",
                    "η": "&eta;",
                    "θ": "&theta;",
                    "ι": "&iota;",
                    "κ": "&kappa;",
                    "λ": "&lambda;",
                    "μ": "&mu;",
                    "ν": "&nu;",
                    "ξ": "&xi;",
                    "ο": "&omicron;",
                    "π": "&pi;",
                    "ρ": "&rho;",
                    "ς": "&sigmaf;",
                    "σ": "&sigma;",
                    "τ": "&tau;",
                    "υ": "&upsilon;",
                    "φ": "&phi;",
                    "χ": "&chi;",
                    "ψ": "&psi;",
                    "ω": "&omega;",
                    "ϑ": "&thetasym;",
                    "ϒ": "&Upsih;",
                    "ϖ": "&piv;",
                    "–": "&ndash;",
                    "—": "&mdash;",
                    "‘": "&lsquo;",
                    "’": "&rsquo;",
                    "‚": "&sbquo;",
                    "“": "&ldquo;",
                    "”": "&rdquo;",
                    "„": "&bdquo;",
                    "†": "&dagger;",
                    "‡": "&Dagger;",
                    "•": "&bull;",
                    "…": "&hellip;",
                    "‰": "&permil;",
                    "′": "&prime;",
                    "″": "&Prime;",
                    "‹": "&lsaquo;",
                    "›": "&rsaquo;",
                    "‾": "&oline;",
                    "⁄": "&frasl;",
                    "€": "&euro;",
                    "ℑ": "&image;",
                    "℘": "&weierp;",
                    "ℜ": "&real;",
                    "™": "&trade;",
                    "ℵ": "&alefsym;",
                    "←": "&larr;",
                    "↑": "&uarr;",
                    "→": "&rarr;",
                    "↓": "&darr;",
                    "↔": "&harr;",
                    "↵": "&crarr;",
                    "⇐": "&lArr;",
                    "⇑": "&UArr;",
                    "⇒": "&rArr;",
                    "⇓": "&dArr;",
                    "⇔": "&hArr;",
                    "∀": "&forall;",
                    "∂": "&part;",
                    "∃": "&exist;",
                    "∅": "&empty;",
                    "∇": "&nabla;",
                    "∈": "&isin;",
                    "∉": "&notin;",
                    "∋": "&ni;",
                    "∏": "&prod;",
                    "∑": "&sum;",
                    "−": "&minus;",
                    "∗": "&lowast;",
                    "√": "&radic;",
                    "∝": "&prop;",
                    "∞": "&infin;",
                    "∠": "&ang;",
                    "∧": "&and;",
                    "∨": "&or;",
                    "∩": "&cap;",
                    "∪": "&cup;",
                    "∫": "&int;",
                    "∴": "&there4;",
                    "∼": "&sim;",
                    "≅": "&cong;",
                    "≈": "&asymp;",
                    "≠": "&ne;",
                    "≡": "&equiv;",
                    "≤": "&le;",
                    "≥": "&ge;",
                    "⊂": "&sub;",
                    "⊃": "&sup;",
                    "⊄": "&nsub;",
                    "⊆": "&sube;",
                    "⊇": "&supe;",
                    "⊕": "&oplus;",
                    "⊗": "&otimes;",
                    "⊥": "&perp;",
                    "⋅": "&sdot;",
                    "⌈": "&lceil;",
                    "⌉": "&rceil;",
                    "⌊": "&lfloor;",
                    "⌋": "&rfloor;",
                    "⟨": "&lang;",
                    "⟩": "&rang;",
                    "◊": "&loz;",
                    "♠": "&spades;",
                    "♣": "&clubs;",
                    "♥": "&hearts;",
                    "♦": "&diams;"
                };
                entityMap = HtmlEntitiesMap;
                for (key in entityMap) {
                    entity = entityMap[key];
                    regex = new RegExp(entity, 'g');
                    string = string.replace(regex, key);
                }
                string = string.replace(/&quot;/g, '"');
                string = string.replace(/&amp;/g, '&');
                return [2 /*return*/, string];
            });
        });
    };
    return SPPNPService;
}());
export default SPPNPService;
//# sourceMappingURL=SPPNPService.js.map