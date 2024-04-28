var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import SPService from '../../../shared/services/SPService';
import * as React from 'react';
var SideMenu = /** @class */ (function (_super) {
    __extends(SideMenu, _super);
    function SideMenu(props) {
        var _this = _super.call(this, props) || this;
        _this.componentDidMount = function () {
            _this.getProfile();
            _this.checkPermission();
            //this.getTeamList();
        };
        _this.componentDidUpdate = function () {
            var path = window.location.href;
            $('ul a').each(function () {
                if (this.href === path) {
                    var $parent = $(this).parent();
                    $parent.addClass('active');
                }
            });
        };
        // private async GetSiteAdmin() {
        //   var siteURL = `${this._spservice.absoluteUrl}/_api/web/currentUser/issiteadmin`
        //   const siteResult = await this._spservice.get(siteURL);
        //   this.setState({ isAdmin: siteResult.data.value })
        // }
        // private getTeamList = async () => {
        //   let currentUserId = parseInt(this.props.context.pageContext.legacyPageContext.userId);
        //   var teamListURL = `${this._spservice.rootSite}${this._spservice.rootURL}/_api/web/lists/getbytitle('${this.props.TeamList}')/items?$select=Staff/Title,Staff/Id&$expand=Staff&$filter=ManagerId eq ${currentUserId}`
        //   const teamListResult = await this._spservice.get(teamListURL);
        //   console.log(teamListResult.data.value)
        //   this.setState({ teamMembers: teamListResult.data.ok ?  teamListResult.data.value : [] })
        // }
        _this.getProfile = function () { return __awaiter(_this, void 0, void 0, function () {
            var profileURL, profileResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        profileURL = this._spservice.absoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties";
                        return [4 /*yield*/, this._spservice.get(profileURL)];
                    case 1:
                        profileResult = _a.sent();
                        this.setState({ profile: profileResult.data });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.handleHamBurger = function (id) {
            if (id === 0) {
                document.getElementById("left-side-menu").style.width = "0";
                document.getElementById("profile").style.width = "0";
                document.getElementById("image").style.width = "0";
                document.getElementById("profilephoto").style.width = "0px";
                document.getElementById("left-side-menu-mini").style.width = "84px";
                document.getElementById("profile-mini").style.width = "78px";
                document.getElementById("image-mini").style.width = "80px";
                document.getElementById("profilephoto-mini").style.width = "76px";
                document.getElementById("side-menu-mini").style.display = "";
                document.getElementById("Qt-logo-mini").style.display = "";
                $('ul#side-menu li.active').css("width", "0");
                $('#mini-sidebar').css("margin-left", "85px");
                // $('.left-side-menu').hide();
                // $('.left-side-menu-mini').show();
            }
            else if (id === 1) {
                document.getElementById("left-side-menu-mini").style.width = "0";
                document.getElementById("profile-mini").style.width = "0";
                document.getElementById("image-mini").style.width = "0";
                document.getElementById("profilephoto-mini").style.width = "0px";
                document.getElementById("left-side-menu").style.width = "240px";
                document.getElementById("profile").style.width = "225px";
                document.getElementById("image").style.width = "238px";
                document.getElementById("profilephoto").style.width = "78px";
                document.getElementById("side-menu-mini").style.display = "none";
                document.getElementById("Qt-logo-mini").style.display = "none";
                $('ul#side-menu li.active').css("width", "225px");
                $('#mini-sidebar').css("margin-left", "240px");
                // $('.left-side-menu-mini').hide();
                // $('.left-side-menu').show();
            }
        };
        _this._spservice = new SPService(_this.props.context);
        _this.state = {
            teamMembers: [],
            profile: {},
            isAdmin: false,
            isHR: false,
            isManager: false,
            userMail: _this.props.context.pageContext.legacyPageContext.userEmail,
        };
        return _this;
    }
    SideMenu.prototype.checkPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentUserId, adminURL, adminResult, hrURL, hrResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentUserId = parseInt(this.props.context.pageContext.legacyPageContext.userId);
                        adminURL = this._spservice.absoluteUrl + "/_api/web/GetUserById('" + currentUserId + "')/Groups?$filter=Title eq '" + this.props.adminGroup + "'";
                        return [4 /*yield*/, this._spservice.get(adminURL)];
                    case 1:
                        adminResult = _a.sent();
                        hrURL = this._spservice.absoluteUrl + "/_api/web/GetUserById('" + currentUserId + "')/Groups?$filter=Title eq '" + this.props.hrGroup + "'";
                        return [4 /*yield*/, this._spservice.get(hrURL)];
                    case 2:
                        hrResult = _a.sent();
                        this.getManager();
                        this.setState({
                            isAdmin: (adminResult.ok && adminResult.data.value.length > 0) ? true : false,
                            isHR: (hrResult.ok && hrResult.data.value.length > 0) ? true : false,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SideMenu.prototype.getManager = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                new Promise(function (resolve, reject) {
                    _this.props.context.msGraphClientFactory.getClient()
                        .then(function (client) {
                        // https://graph.microsoft.com/v1.0/me/manager
                        // let UserEmail = this.props.context.pageContext.legacyPageContext.userEmail;
                        client.api('users').version('beta').filter("mail eq '" + _this.state.userMail + "'").get(function (error, response, rawResponse) {
                            var _a;
                            var managetId = response.value[0].id;
                            console.log(response);
                            _this.getStaff(managetId);
                            if (error) {
                                // reject(error);
                                resolve(null);
                                return;
                            }
                            else {
                                // resolve(response.value[0].manager.displayName)
                                console.log(response.value);
                                var currentUser_1 = _this.props.context.pageContext.legacyPageContext.userEmail;
                                (_a = response.value) === null || _a === void 0 ? void 0 : _a.map(function (element) {
                                    var _a, _b;
                                    var userManager = (_a = element === null || element === void 0 ? void 0 : element.manager) === null || _a === void 0 ? void 0 : _a.mail;
                                    if (userManager === currentUser_1) {
                                        console.log((_b = element === null || element === void 0 ? void 0 : element.manager) === null || _b === void 0 ? void 0 : _b.mail);
                                        _this.setState({ isManager: true });
                                    }
                                });
                            }
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    SideMenu.prototype.getStaff = function (managetId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                new Promise(function (resolve, reject) {
                    _this.props.context.msGraphClientFactory.getClient()
                        .then(function (client) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            // https://graph.microsoft.com/v1.0/me/manager
                            client.api("users/" + managetId + "/directReports").version('beta').get(function (error, response, rawResponse) {
                                console.log(response);
                                if (error) {
                                    // reject(error);.filter(`manager.mail eq '${UserEmail}'`)
                                    resolve(null);
                                    return;
                                }
                                else {
                                    // resolve(response.value[0].manager.displayName)
                                    console.log(response.value);
                                    if (response.value.length !== 0) {
                                        _this.setState({ isManager: true });
                                    }
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); });
                });
                return [2 /*return*/];
            });
        });
    };
    SideMenu.prototype.render = function () {
        var _a = this.state, profile = _a.profile, isAdmin = _a.isAdmin, isHR = _a.isHR, isManager = _a.isManager;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "left-side-menu", id: "left-side-menu", style: {} },
                React.createElement("div", { className: "h-75", "data-simplebar": true },
                    React.createElement("div", { id: "sidebar-menu" },
                        React.createElement("div", { className: "auth-logo mb-3 text-center" },
                            React.createElement("a", { href: this._spservice.rootURL },
                                React.createElement("img", { src: this._spservice.absoluteUrl + "/SiteAssets/images/Qantler-logo.svg", alt: "" }))),
                        React.createElement("div", { style: { borderBottom: "1px dashed #4371A9" } }),
                        React.createElement("div", { className: 'profile', id: "profile" },
                            React.createElement("div", { className: 'row', style: { height: "100%" } },
                                React.createElement("div", { className: 'col-sm-4 col-md-4' },
                                    React.createElement("img", { id: "profilephoto", src: profile.PictureUrl ? this._spservice.absoluteUrl + "/_layouts/15/userphoto.aspx?accountname=" + profile.Email + "&amp;size=M" : this._spservice.absoluteUrl + "/SiteAssets/images/Default-image.png", style: {
                                            width: "70px",
                                            height: "70px",
                                            margin: "13px 0px 0px 13px",
                                            borderRadius: "50px"
                                        } })),
                                React.createElement("div", { className: 'col-sm-8 col-md-8', style: {
                                        margin: "auto",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        color: "#ffffff",
                                        paddingLeft: "28px",
                                    } },
                                    React.createElement("span", { style: { color: "FFFFFF" } }, profile.DisplayName),
                                    React.createElement("br", null),
                                    React.createElement("span", { style: { color: "#dadada", fontSize: "12px" } }, profile.Title)))),
                        React.createElement("ul", { id: "side-menu", style: { listStyleType: "none", padding: "0" } },
                            React.createElement("li", { className: "nav-item", style: { marginTop: "5px" } },
                                React.createElement("a", { className: '', href: this._spservice.absoluteUrl + "/Pages/Timesheet.aspx" },
                                    React.createElement("svg", { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "layer-group", className: "svg-inline--fa fa-layer-group fa-w-16", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", style: {
                                            width: "30px",
                                            height: "17px",
                                            margin: "14px 0px 17px 20px",
                                        } },
                                        React.createElement("path", { fill: "#dadada", d: "M12.41 148.02l232.94 105.67c6.8 3.09 14.49 3.09 21.29 0l232.94-105.67c16.55-7.51 16.55-32.52 0-40.03L266.65 2.31a25.607 25.607 0 0 0-21.29 0L12.41 107.98c-16.55 7.51-16.55 32.53 0 40.04zm487.18 88.28l-58.09-26.33-161.64 73.27c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.51 209.97l-58.1 26.33c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 276.3c16.55-7.5 16.55-32.5 0-40zm0 127.8l-57.87-26.23-161.86 73.37c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.29 337.87 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 404.1c16.55-7.5 16.55-32.5 0-40z" })),
                                    React.createElement("span", { style: { color: "#dadada" } }, "My Timesheet"))),
                            (isManager) ?
                                React.createElement("li", { className: "nav-item", style: { marginTop: "5px" } },
                                    React.createElement("a", { className: '', href: this._spservice.absoluteUrl + "/Pages/MyTeam.aspx" },
                                        React.createElement("svg", { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "user-friends", className: "svg-inline--fa fa-user-friends fa-w-20", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512", style: {
                                                width: "30px",
                                                height: "17px",
                                                margin: "14px 0px 17px 20px",
                                            } },
                                            React.createElement("path", { fill: "#dadada", d: "M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z" })),
                                        React.createElement("span", { style: { color: "#dadada" } }, "My Team")))
                                : null,
                            isAdmin ?
                                React.createElement("li", { className: "nav-item", style: { marginTop: "5px" } },
                                    React.createElement("a", { className: '', href: this._spservice.absoluteUrl + "/Lists/TaskType/AllItems.aspx" },
                                        React.createElement("svg", { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "user-cog", className: "svg-inline--fa fa-user-cog fa-w-20", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512", style: {
                                                width: "30px",
                                                height: "17px",
                                                margin: "14px 0px 17px 20px",
                                            } },
                                            React.createElement("path", { fill: "#dadada", d: "M610.5 373.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 400.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm201.2 226.5c-2.3-1.2-4.6-2.6-6.8-3.9l-7.9 4.6c-6 3.4-12.8 5.3-19.6 5.3-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-5.5-17.7 1.9-36.4 17.9-45.7l7.9-4.6c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-16-9.2-23.4-28-17.9-45.7.9-2.9 2.2-5.8 3.2-8.7-3.8-.3-7.5-1.2-11.4-1.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c10.1 0 19.5-3.2 27.2-8.5-1.2-3.8-2-7.7-2-11.8v-9.2z" })),
                                        React.createElement("span", { style: { color: "#dadada" } }, "Settings"))) : null))),
                React.createElement("div", { style: { width: "100%", position: "absolute", bottom: "0" } },
                    React.createElement("img", { style: { transition: "0.3s" }, id: "image", src: this._spservice.absoluteUrl + "/SiteAssets/images/Qantler-logo-footer.svg", width: 238, height: 210 }))),
            React.createElement("div", { className: "left-side-menu-mini", id: "left-side-menu-mini" },
                React.createElement("div", { className: "h-75", "data-simplebar": true },
                    React.createElement("div", { id: "sidebar-menu" },
                        React.createElement("div", { className: "auth-logo mb-4 text-center", style: { marginTop: "4px" } },
                            React.createElement("img", { style: { display: "none" }, src: this._spservice.absoluteUrl + "/SiteAssets/images/Qt-logo-mini.svg", alt: "", id: "Qt-logo-mini" })),
                        React.createElement("div", { style: { borderBottom: "1px dashed #4371A9" } }),
                        React.createElement("div", { className: 'profile-mini', id: 'profile-mini' },
                            React.createElement("div", { className: 'row' },
                                React.createElement("div", { className: 'col-sm-4 col-md-4' },
                                    React.createElement("img", { id: "profilephoto-mini", src: profile.PictureUrl ? this._spservice.absoluteUrl + "/_layouts/15/userphoto.aspx?accountname=" + profile.Email + "&amp;size=M" : this._spservice.absoluteUrl + "/SiteAssets/images/Default-image.png", style: {
                                            width: "0",
                                            height: "70px",
                                            margin: "15px 0px 0px 5px",
                                            borderRadius: "50px"
                                        } })))),
                        React.createElement("ul", { id: "side-menu-mini", style: { listStyleType: "none", padding: "0px", display: "none" } },
                            React.createElement("li", { className: "nav-item", style: { marginTop: "5px" } },
                                React.createElement("a", { className: '', href: this._spservice.absoluteUrl + "/Pages/Timesheet.aspx" },
                                    React.createElement("svg", { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "layer-group", className: "svg-inline--fa fa-layer-group fa-w-16", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", style: {
                                            width: "30px",
                                            height: "17px",
                                            margin: "14px 0px 13px 22px",
                                        } },
                                        React.createElement("path", { fill: "#dadada", d: "M12.41 148.02l232.94 105.67c6.8 3.09 14.49 3.09 21.29 0l232.94-105.67c16.55-7.51 16.55-32.52 0-40.03L266.65 2.31a25.607 25.607 0 0 0-21.29 0L12.41 107.98c-16.55 7.51-16.55 32.53 0 40.04zm487.18 88.28l-58.09-26.33-161.64 73.27c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.51 209.97l-58.1 26.33c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 276.3c16.55-7.5 16.55-32.5 0-40zm0 127.8l-57.87-26.23-161.86 73.37c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.29 337.87 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 404.1c16.55-7.5 16.55-32.5 0-40z" })))),
                            (isManager || isAdmin || isHR) ?
                                React.createElement("li", { className: "nav-item", style: { marginTop: "5px" } },
                                    React.createElement("a", { className: '', href: this._spservice.absoluteUrl + "/Pages/MyTeam.aspx" },
                                        React.createElement("svg", { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "user-friends", className: "svg-inline--fa fa-user-friends fa-w-20", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512", style: {
                                                width: "30px",
                                                height: "17px",
                                                margin: "14px 0px 13px 22px"
                                            } },
                                            React.createElement("path", { fill: "#dadada", d: "M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z" }))))
                                : null,
                            isAdmin ?
                                React.createElement("li", { className: "nav-item", style: { marginTop: "5px" } },
                                    React.createElement("a", { className: '', href: "" + this._spservice.rootSite + this._spservice.rootURL + "/Lists/Managers/AllItems.aspx" },
                                        React.createElement("svg", { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "user-cog", className: "svg-inline--fa fa-user-cog fa-w-20", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512", style: {
                                                width: "30px",
                                                height: "17px",
                                                margin: "14px 0px 13px 22px"
                                            } },
                                            React.createElement("path", { fill: "#dadada", d: "M610.5 373.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 400.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm201.2 226.5c-2.3-1.2-4.6-2.6-6.8-3.9l-7.9 4.6c-6 3.4-12.8 5.3-19.6 5.3-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-5.5-17.7 1.9-36.4 17.9-45.7l7.9-4.6c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-16-9.2-23.4-28-17.9-45.7.9-2.9 2.2-5.8 3.2-8.7-3.8-.3-7.5-1.2-11.4-1.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c10.1 0 19.5-3.2 27.2-8.5-1.2-3.8-2-7.7-2-11.8v-9.2z" })))) : null,
                            isAdmin ?
                                React.createElement("li", { className: "nav-item", style: { marginTop: "5px" } },
                                    React.createElement("a", { className: '', href: this._spservice.absoluteUrl + "/Lists/TaskType/AllItems.aspx" },
                                        React.createElement("svg", { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "user-cog", className: "svg-inline--fa fa-user-cog fa-w-20", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512", style: {
                                                width: "30px",
                                                height: "17px",
                                                margin: "14px 0px 13px 22px"
                                            } },
                                            React.createElement("path", { fill: "#dadada", d: "M610.5 373.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 400.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm201.2 226.5c-2.3-1.2-4.6-2.6-6.8-3.9l-7.9 4.6c-6 3.4-12.8 5.3-19.6 5.3-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-5.5-17.7 1.9-36.4 17.9-45.7l7.9-4.6c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-16-9.2-23.4-28-17.9-45.7.9-2.9 2.2-5.8 3.2-8.7-3.8-.3-7.5-1.2-11.4-1.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c10.1 0 19.5-3.2 27.2-8.5-1.2-3.8-2-7.7-2-11.8v-9.2z" })))) : null))),
                React.createElement("div", { style: { width: "100%", position: "absolute", bottom: "0" } },
                    React.createElement("img", { id: "image-mini", src: this._spservice.absoluteUrl + "/SiteAssets/images/Qt-footer-mini.svg", width: 0, height: 80 })))));
    };
    return SideMenu;
}(React.Component));
export default SideMenu;
//# sourceMappingURL=SideMenu.js.map