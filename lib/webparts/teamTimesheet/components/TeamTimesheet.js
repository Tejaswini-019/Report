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
import * as React from 'react';
import './TeamTimesheet.module.scss';
import * as moment from 'moment';
import * as $ from 'jquery';
import SPService from '../../../shared/services/SPService';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { download } from '../../../shared/utils/datatable-export';
import { applyDataTable, destroyDataTable, applyDataTableGroupBy } from '../../../shared/utils/datatable';
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
import 'jquery-ui-dist/jquery-ui.min.js';
import 'jquery-ui-dist/jquery-ui.min.css';
require("../../../shared/js/summernote-bs4.js");
import { initializeIcons } from '@fluentui/react/lib/Icons';
initializeIcons();
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
var tooltipInstance = null;
var TeamTimesheet = /** @class */ (function (_super) {
    __extends(TeamTimesheet, _super);
    function TeamTimesheet(props) {
        var _this_1 = _super.call(this, props) || this;
        _this_1.pickerStylesSingle = {
            root: {},
            input: {
                borderColor: "#ced4da !important",
                height: "48px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
                "&:hover": {
                    borderColor: "none !important"
                },
                "&:focus": {
                    borderRadius: "4px !important",
                    backgroundColor: "#fff",
                    borderColor: "#ffffff !important",
                    outline: 0,
                    boxShadow: "0 0 0 0.3rem rgb(0 123 255 / 25%)"
                },
            },
            text: {
                height: "48px",
                border: "none",
                borderRadius: "4px",
                background: "#ffffff"
                // height: "48px",
                // border: "1px solid #ced4da",
                // borderRadius: "4px"
            },
        };
        _this_1.componentDidMount = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var _this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.toggleLoader(true);
                        $("#calendar").hide();
                        _this = this;
                        return [4 /*yield*/, this.checkPermission()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getProjects()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getTaskType()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getAllUser()];
                    case 4:
                        _a.sent();
                        if (!$('#pending').hasClass('active')) return [3 /*break*/, 5];
                        this.getPendingTimesheets();
                        return [3 /*break*/, 7];
                    case 5:
                        if (!$('#all').hasClass('active')) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getManager()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        $(document).on('change', '#projectName2', function () {
                            var id = $('#projectName2').val();
                            _this.handleSelectedId(id);
                            _this.handleSearch();
                        });
                        $(document).on('change', '#projectName3', function () {
                            var id = $('#projectName3').val();
                            _this.handleSelectedId(id);
                            _this.handleSearch();
                        });
                        $('#description1').summernote({
                            addDefaultFonts: false,
                            height: 200,
                            toolbar: false,
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.handleHamBurger = function (id) {
            var screen = _this_1.state.screen;
            if (screen === false) {
                document.getElementById("left-side-menu").style.width = "0";
                document.getElementById("profile").style.width = "0";
                document.getElementById("image").style.width = "0";
                document.getElementById("profilephoto").style.width = "0px";
                document.getElementById("left-side-menu-mini").style.width = "84px";
                document.getElementById("profile-mini").style.width = "80px";
                document.getElementById("image-mini").style.width = "80px";
                document.getElementById("profilephoto-mini").style.width = "70px";
                document.getElementById("side-menu-mini").style.display = "";
                document.getElementById("Qt-logo-mini").style.display = "";
                $('ul#side-menu li.active').css("width", "0");
                $('#mini-sidebar').css("margin-left", "85px");
                _this_1.setState({ screen: true });
                // $('.left-side-menu').hide();
                // $('.left-side-menu-mini').show();
            }
            else if (screen === true) {
                document.getElementById("left-side-menu-mini").style.width = "0";
                document.getElementById("profile-mini").style.width = "0";
                document.getElementById("image-mini").style.width = "0";
                document.getElementById("profilephoto-mini").style.width = "0px";
                document.getElementById("left-side-menu").style.width = "240px";
                document.getElementById("profile").style.width = "225px";
                document.getElementById("image").style.width = "238px";
                document.getElementById("profilephoto").style.width = "70px";
                document.getElementById("side-menu-mini").style.display = "none";
                document.getElementById("Qt-logo-mini").style.display = "none";
                $('ul#side-menu li.active').css("width", "225px");
                $('#mini-sidebar').css("margin-left", "240px");
                _this_1.setState({ screen: false });
                // $('.left-side-menu-mini').hide();
                // $('.left-side-menu').show();
            }
        };
        //lookup  
        _this_1.getTaskType = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var TaskTypeURL, TaskTypeResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        TaskTypeURL = this._spservice.absoluteUrl + "/_api/web/lists/getbytitle('" + this.props.TaskType + "')/items";
                        return [4 /*yield*/, this._spservice.get(TaskTypeURL)];
                    case 1:
                        TaskTypeResult = _a.sent();
                        this.setState({ TaskType: TaskTypeResult.ok ? TaskTypeResult.data.value : [] });
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.getProjects = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var projectListURL, projectListResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        projectListURL = "" + this._spservice.rootSite + this._spservice.rootURL + "/_api/web/lists/getbytitle('" + this.props.ProjectList + "')/items?$select=*,Title,Client/Title&$filter=IsActive eq 1&$expand=Client&$orderby=Client/Title";
                        return [4 /*yield*/, this._spservice.get(projectListURL)];
                    case 1:
                        projectListResult = _a.sent();
                        $('#projectName2').select2();
                        $('#projectName3').select2();
                        this.setState({ ProjectList: projectListResult.ok ? projectListResult.data.value : [] });
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.getPendingTimesheets = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var currentUserId, filter, _select, _expand, _orderby, _filter, teamListResult1, data, filterdata;
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $(".hide-show-search").show();
                        $('#myTabContent').show();
                        $("#calendar").hide();
                        $("#Pendingshow").show();
                        $('#projectName2').val(null).trigger("change");
                        $('#projectName3').val(null).trigger("change");
                        this.setState({ isPending: true, project: [], dateRange: 0, errorMessageFromDate: "", errorMessageToDate: "", PeopleId: 0, statusFilter: "", groupColumn: "" });
                        return [4 /*yield*/, this.loadDefaultDates("0")];
                    case 1:
                        _a.sent();
                        currentUserId = parseInt(this.props.context.pageContext.legacyPageContext.userId);
                        filter = "";
                        if (!this.state.isAdmin && !this.state.isHR) {
                            this.state.staff.forEach(function (ele, index) {
                                if (filter == "") {
                                    if (index == 0)
                                        filter = "ResourceId eq " + ele.Id;
                                    else
                                        filter += " or ResourceId eq " + ele.Id;
                                }
                                else {
                                    if (index == 0)
                                        filter += " and ResourceId eq " + ele.Id;
                                    else
                                        filter += " or ResourceId eq " + ele.Id;
                                }
                            });
                        }
                        _select = [{ fieldType: null, key: '*,Resource/Title,Resource/EMail,TaskType/Title,FieldValuesAsText/TaskDescription' }];
                        _expand = ["Resource,TaskType,FieldValuesAsText"];
                        _orderby = "Date";
                        _filter = "" + filter;
                        return [4 /*yield*/, this._spservice.getPagedListItems(this.props.EmployeeList, _select, _filter, _orderby, _expand)];
                    case 2:
                        teamListResult1 = _a.sent();
                        destroyDataTable("staffTable");
                        destroyDataTable("staffTable1");
                        destroyDataTable("teamTimesheet-export");
                        data = teamListResult1 === null || teamListResult1 === void 0 ? void 0 : teamListResult1.filter(function (item) { return item.Status.toLowerCase() === "waiting for approval"; });
                        data.reverse();
                        filterdata = [];
                        data.forEach(function (element) {
                            if (moment(element.Date).format("YYYY-MM-DD") >= _this_1.state.fromDate && moment(element.Date).format("YYYY-MM-DD") <= _this_1.state.toDate) {
                                filterdata.push(element);
                            }
                        });
                        this.setState({ TeamListData: filterdata ? filterdata : [] });
                        this.callDataTable("staffTable", this.state.groupColumn);
                        this.calcTotalEfforts();
                        this.calcEfforts();
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.getAllTimesheets = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var currentUserId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $(".hide-show-search").show();
                        $("#calendar").hide();
                        $("#Allshow").show();
                        $('#myTabContent').show();
                        $('#projectName2').val(null).trigger("change");
                        $('#projectName3').val(null).trigger("change");
                        this.setState({ isPending: false, project: [], dateRange: 0, errorMessageFromDate: "", errorMessageToDate: "", PeopleId: 0, statusFilter: "", groupColumn: "" });
                        return [4 /*yield*/, this.loadDefaultDates("0")];
                    case 1:
                        _a.sent();
                        currentUserId = parseInt(this.props.context.pageContext.legacyPageContext.userId);
                        if (this.state.isAdmin || this.state.isHR) {
                            this.getTeamListData();
                        }
                        else if (!this.state.isAdmin && !this.state.isHR) {
                            this.getTeamListData(this.state.staff);
                        }
                        this.toggleLoader(false);
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.getTeamListData = function (staff) { return __awaiter(_this_1, void 0, void 0, function () {
            var filter, _select, _expand, _orderby, _filter, teamListResult, filterdata_1;
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = "";
                        if (!this.state.isAdmin && !this.state.isHR) {
                            staff === null || staff === void 0 ? void 0 : staff.forEach(function (ele, index) {
                                if (filter == "") {
                                    if (index == 0)
                                        filter = "ResourceId eq " + ele.Id;
                                    else
                                        filter += " or ResourceId eq " + ele.Id;
                                }
                                else {
                                    if (index == 0)
                                        filter += " and ResourceId eq " + ele.Id;
                                    else
                                        filter += " or ResourceId eq " + ele.Id;
                                }
                            });
                        }
                        if (!(filter !== "")) return [3 /*break*/, 2];
                        _select = [{ fieldType: null, key: '*,Resource/Title,TaskType/Title,FieldValuesAsText/TaskDescription' }];
                        _expand = ["Resource,TaskType,FieldValuesAsText"];
                        _orderby = "Date";
                        _filter = "" + filter;
                        return [4 /*yield*/, this._spservice.getPagedListItems(this.props.EmployeeList, _select, _filter, _orderby, _expand)];
                    case 1:
                        teamListResult = _a.sent();
                        destroyDataTable("staffTable");
                        destroyDataTable("staffTable1");
                        destroyDataTable("teamTimesheet-export");
                        teamListResult.reverse();
                        filterdata_1 = [];
                        teamListResult.forEach(function (element) {
                            if (moment(element.Date).format("YYYY-MM-DD") >= _this_1.state.fromDate && moment(element.Date).format("YYYY-MM-DD") <= _this_1.state.toDate) {
                                filterdata_1.push(element);
                            }
                        });
                        this.setState({ TeamListData: filterdata_1 ? filterdata_1 : [] });
                        _a.label = 2;
                    case 2:
                        $('#projectName3').select2();
                        this.callDataTable("staffTable1", this.state.groupColumn);
                        this.calcTotalAllEfforts();
                        this.calcEfforts();
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.handleExcel = function () {
            var filename = "MyTeamTimesheet_" + _this_1._spservice.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            download("teamTimesheet-export", [], [], filename, "excel", "");
            // const groupBy = this.state.groupColumn;
            // let groupColumn = groupBy ? (parseInt(groupBy)+1) : -1;
            // if(groupColumn >=0 ){ 
            //   if ($('#pending').hasClass('active')){
            //     var colspan1 = 3;
            //     var colspan2 = 1;
            //   }else if ($('#all').hasClass('active')){
            //     var colspan1 = (groupBy=="5")? 5 : 4;
            //     var colspan2 = (groupBy=="5")? 1 : 2;
            //   }          
            //   downloadWithGroupBy("teamTimesheet-export", groupColumn, 5, colspan1, colspan2, [], [], filename, "excel", "");
            // }else{
            //   download("teamTimesheet-export", [], [], filename, "excel", "");
            // }      
        };
        //filter
        _this_1.hideSearch = function () {
            $("#search-filter").css("display", "none");
            $("#search-filter1").css("display", "none");
            $("#hide-search").css("display", "none");
            $("#show-search").css("display", "flex");
        };
        _this_1.showSearch = function () {
            //this.setState({toDate: moment().format("YYYY-MM-DD")});
            //$("#toDate").val(moment().format("YYYY-MM-DD"));   
            $("#search-filter").css("display", "flex");
            $("#search-filter1").css("display", "flex");
            $("#hide-search").css("display", "flex");
            $("#show-search").css("display", "none");
        };
        _this_1.getPeople = function (items) { return __awaiter(_this_1, void 0, void 0, function () {
            var value;
            var _this_1 = this;
            var _a;
            return __generator(this, function (_b) {
                value = (_a = items[0]) === null || _a === void 0 ? void 0 : _a.id;
                if (items.length > 0) {
                    this.setState({ PeopleId: value }, function () {
                        _this_1.handleSearch();
                    });
                }
                else {
                    this.setState({ PeopleId: 0 });
                }
                return [2 /*return*/];
            });
        }); };
        _this_1.handleDateRange = function (event) { return __awaiter(_this_1, void 0, void 0, function () {
            var opt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        opt = event.target.value;
                        this.setState({ dateRange: opt });
                        return [4 /*yield*/, this.loadDefaultDates(opt)];
                    case 1:
                        _a.sent();
                        this.handleSearch();
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.handleFromDateChange = function (event) {
            var value = event.target.value;
            var now = moment();
            var today = now.format("YYYY-MM-DD");
            var lastMonthFromDate = moment(now).subtract(1, 'months').format('YYYY-MM-DD');
            var lasttwoMonthsFromDate = moment(now).subtract(2, 'months').format('YYYY-MM-DD');
            if (_this_1.state.toDate == today) {
                if (value == lasttwoMonthsFromDate) {
                    var defaultdaterange = 0;
                }
                else if (value == lastMonthFromDate) {
                    var defaultdaterange = 1;
                }
                else if (value == today) {
                    var defaultdaterange = 2;
                }
                else {
                    var defaultdaterange = 3;
                }
            }
            else {
                var defaultdaterange = 3;
            }
            _this_1.setState({
                fromDate: value,
                dateRange: defaultdaterange
            });
            _this_1.handleSearch();
        };
        _this_1.handleToDateChange = function (event) {
            var value = event.target.value;
            var now = moment();
            var today = now.format("YYYY-MM-DD");
            var lastMonthFromDate = moment(now).subtract(1, 'months').format('YYYY-MM-DD');
            var lasttwoMonthsFromDate = moment(now).subtract(2, 'months').format('YYYY-MM-DD');
            if (value == today) {
                if (_this_1.state.fromDate == lasttwoMonthsFromDate) {
                    var defaultdaterange = 0;
                }
                else if (_this_1.state.fromDate == lastMonthFromDate) {
                    var defaultdaterange = 1;
                }
                else if (_this_1.state.fromDate == today) {
                    var defaultdaterange = 2;
                }
                else {
                    var defaultdaterange = 3;
                }
            }
            else {
                var defaultdaterange = 3;
            }
            _this_1.setState({
                toDate: value,
                dateRange: defaultdaterange
            });
            _this_1.handleSearch();
        };
        _this_1.handleStatus = function (event) {
            var value = event.target.value;
            _this_1.setState({ statusFilter: value }, function () {
                _this_1.handleSearch();
            });
        };
        _this_1.handleGroupBy = function (event) {
            var value = event.target.value;
            _this_1.setState({ groupColumn: value });
            _this_1.handleSearch();
        };
        _this_1.handleSearch = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var filter, isStaff, _select, _expand, _filter, _orderby, searchListResult, data, filterdata_2, filterdata_3;
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // if (!this.state.toDate && !this.state.fromDate && !this.state.project && this.state.PeopleId === 0) {
                        //   this.setState({
                        //     alertMessage: "Please select atleast one field"
                        //   }, () => {
                        //     $('#custom-modal3').modal('show');
                        //   })
                        //   return;
                        // }
                        if (this.state.toDate && !this.state.fromDate) {
                            this.setState({
                                errorMessageFromDate: "Please enter From Date",
                                errorMessageToDate: ""
                            });
                            return [2 /*return*/];
                        }
                        if (moment(this.state.fromDate).isAfter(this.state.toDate)) {
                            this.setState({
                                errorMessageFromDate: "From Date should be lesser",
                                errorMessageToDate: "To Date should be greater"
                            });
                            return [2 /*return*/];
                        }
                        this.setState({
                            errorMessageFromDate: "",
                            errorMessageToDate: ""
                        });
                        filter = "";
                        if (this.state.PeopleId !== 0) {
                            isStaff = this.state.staff.filter(function (item) { return (item.Id === _this_1.state.PeopleId); });
                            if (!this.state.isAdmin && !this.state.isHR) {
                                if (filter == "") {
                                    filter = isStaff.length > 0 ? "ResourceId eq " + this.state.PeopleId : "ResourceId eq null";
                                }
                                else {
                                    filter += isStaff.length > 0 ? " and ResourceId eq " + this.state.PeopleId : " and ResourceId eq null";
                                }
                            }
                            else {
                                if (filter == "") {
                                    filter = "ResourceId eq " + this.state.PeopleId;
                                }
                                else {
                                    filter += " and ResourceId eq " + this.state.PeopleId;
                                }
                            }
                        }
                        else {
                            //default filter for manager
                            if (!this.state.isAdmin && !this.state.isHR) {
                                this.state.staff.forEach(function (ele, index) {
                                    if (index == 0)
                                        filter = "(ResourceId eq " + ele.Id;
                                    else
                                        filter += " or ResourceId eq " + ele.Id;
                                    if (index + 1 == _this_1.state.staff.length) {
                                        filter += ")";
                                    }
                                });
                            }
                        }
                        if ((this.state.project).length > 0) {
                            debugger;
                            this.state.project.forEach(function (id, index) {
                                if (filter == "") {
                                    if (index == 0)
                                        filter = "(ProjectID eq " + id;
                                    else
                                        filter += " or ProjectID eq " + id;
                                    if (index + 1 == _this_1.state.project.length)
                                        filter += ")";
                                }
                                else {
                                    if (index == 0)
                                        filter += " and (ProjectID eq " + id;
                                    else
                                        filter += " or ProjectID eq " + id;
                                    if (index + 1 == _this_1.state.project.length)
                                        filter += ")";
                                }
                            });
                        }
                        // if (this.state.fromDate !== "" && this.state.toDate !== "") {
                        //   if (filter == "") {
                        //     filter = `Date ge datetime'${moment(this.state.fromDate).startOf('day').toISOString()}' and Date le datetime'${moment(this.state.toDate).endOf('day').toISOString()}'`
                        //   } else {
                        //     filter += ` and Date ge datetime'${moment(this.state.fromDate).startOf('day').toISOString()}' and Date le datetime'${moment(this.state.toDate).endOf('day').toISOString()}'`
                        //   }
                        // }
                        // if (this.state.fromDate !== "" && this.state.toDate === "") {
                        //   if (filter == "") {
                        //     filter = `Date ge datetime'${moment(this.state.fromDate).startOf('day').toISOString()}' and Date le datetime'${moment().endOf('day').toISOString()}'`
                        //   } else {
                        //     filter += ` and Date ge datetime'${moment(this.state.fromDate).startOf('day').toISOString()}' and Date le datetime'${moment().endOf('day').toISOString()}'`
                        //   }
                        // }
                        if (this.state.statusFilter !== "") {
                            if (filter == "") {
                                filter = "Status eq '" + this.state.statusFilter + "'";
                            }
                            else {
                                filter += " and Status eq '" + this.state.statusFilter + "'";
                            }
                        }
                        _select = [{ fieldType: null, key: '*,Resource/Title,TaskType/Title,FieldValuesAsText/TaskDescription' }];
                        _expand = ["Resource,TaskType,FieldValuesAsText"];
                        _filter = "" + filter;
                        _orderby = "Date";
                        return [4 /*yield*/, this._spservice.getPagedListItems(this.props.EmployeeList, _select, _filter, _orderby, _expand)];
                    case 1:
                        searchListResult = _a.sent();
                        destroyDataTable("staffTable");
                        destroyDataTable("staffTable1");
                        destroyDataTable("teamTimesheet-export");
                        if (this.state.isPending) {
                            data = searchListResult === null || searchListResult === void 0 ? void 0 : searchListResult.filter(function (item) { return item.Status.toLowerCase() === "waiting for approval"; });
                            data.reverse();
                            filterdata_2 = [];
                            data.forEach(function (element) {
                                if (moment(element.Date).format("YYYY-MM-DD") >= _this_1.state.fromDate && moment(element.Date).format("YYYY-MM-DD") <= _this_1.state.toDate) {
                                    filterdata_2.push(element);
                                }
                            });
                            this.setState({ TeamListData: filterdata_2 ? filterdata_2 : [] });
                            this.callDataTable("staffTable", this.state.groupColumn);
                            this.calcTotalEfforts();
                            this.calcEfforts();
                        }
                        else {
                            searchListResult.reverse();
                            filterdata_3 = [];
                            searchListResult.forEach(function (element) {
                                if (moment(element.Date).format("YYYY-MM-DD") >= _this_1.state.fromDate && moment(element.Date).format("YYYY-MM-DD") <= _this_1.state.toDate) {
                                    filterdata_3.push(element);
                                }
                            });
                            this.setState({ TeamListData: filterdata_3 ? filterdata_3 : [] });
                            this.callDataTable("staffTable1", this.state.groupColumn);
                            this.calcTotalAllEfforts();
                            this.calcEfforts();
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.handleClear = function () { return __awaiter(_this_1, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $('#projectName2').val(null).trigger("change");
                        $('#projectName3').val(null).trigger("change");
                        this.setState({ project: [], dateRange: 0, errorMessageFromDate: "", errorMessageToDate: "", PeopleId: 0, statusFilter: "", groupColumn: "" });
                        return [4 /*yield*/, this.loadDefaultDates("0")];
                    case 1:
                        _a.sent();
                        this.state.isPending ? this.getPendingTimesheets() : this.getAllTimesheets();
                        return [2 /*return*/];
                }
            });
        }); };
        //Actions
        _this_1.getItemlist = function (index) { return __awaiter(_this_1, void 0, void 0, function () {
            var employeeListURL, employeeListResult, listURL, listResult, clientname;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document.getElementById("comments1").classList.remove("border-danger");
                        employeeListURL = this._spservice.absoluteUrl + "/_api/web/lists/getbytitle('" + this.props.EmployeeList + "')/items(" + index + ")?$select=*,Resource/Title&$expand=Resource";
                        return [4 /*yield*/, this._spservice.get(employeeListURL)];
                    case 1:
                        employeeListResult = _a.sent();
                        $("#newDate1").val("" + this._spservice.moment(employeeListResult.data.Date).format("YYYY-MM-DD"));
                        listURL = "" + this._spservice.rootSite + this._spservice.rootURL + "/_api/web/lists/getbytitle('" + this.props.ProjectList + "')/items(" + employeeListResult.data.ProjectID + ")?$select=*,Client/Title&$expand=Client";
                        return [4 /*yield*/, this._spservice.get(listURL)];
                    case 2:
                        listResult = _a.sent();
                        if (listResult.ok) {
                            clientname = listResult.data.ClientId ? '[' + listResult.data.Client.Title + '] ' : '';
                            $("#projectName1").val(clientname + listResult.data.Title);
                        }
                        //$("#description1").val(employeeListResult.data.TaskDescription);
                        $('#description1').summernote('disable');
                        $('#description1').summernote('code', employeeListResult.data.TaskDescription);
                        $("#efforts1").val(employeeListResult.data.Effort);
                        $("#taskType1").val(employeeListResult.data.TaskTypeId);
                        $("#update").val(employeeListResult.data.Id);
                        $("#comments1").val(employeeListResult.data.Comments);
                        $("h4#myCenterModalLabel").text(employeeListResult.data.Resource.Title ? employeeListResult.data.Resource.Title : "Employee Name");
                        this.setState({ status: employeeListResult.data.Status ? employeeListResult.data.Status.toLowerCase() : "" });
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.handleApprove = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var metadata, postURL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metadata = {
                            Comments: $("#comments1").val(),
                            Status: "Approved",
                            Resubmit: false
                        };
                        postURL = this._spservice.absoluteUrl + "/_api/web/lists/getbytitle('" + this.props.EmployeeList + "')/items(" + $("#update").val() + ")";
                        return [4 /*yield*/, this._spservice.update(postURL, metadata)];
                    case 1:
                        _a.sent();
                        $('#custom-modal1').modal('hide');
                        this.state.isPending ? this.getPendingTimesheets() : this.getAllTimesheets();
                        this.setState({
                            successMessage: "Approved Successfully"
                        });
                        // , () => {
                        //   $('#myAlert').addClass('show');
                        //   $('#myAlert').show();
                        // })
                        $("comments1").val("");
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.handleReject = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var validateFields, validationResult, metadata, postURL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validateFields = [
                            { Id: "comments1", Type: "text" },
                        ];
                        validationResult = this._spservice.utils.validateFields(validateFields, true);
                        if (!validationResult.IsValid) {
                            return [2 /*return*/];
                        }
                        metadata = {
                            Comments: $("#comments1").val(),
                            Status: "Rejected",
                            Resubmit: false
                        };
                        postURL = this._spservice.absoluteUrl + "/_api/web/lists/getbytitle('" + this.props.EmployeeList + "')/items(" + $("#update").val() + ")";
                        return [4 /*yield*/, this._spservice.update(postURL, metadata)];
                    case 1:
                        _a.sent();
                        $('#custom-modal1').modal('hide');
                        this.state.isPending ? this.getPendingTimesheets() : this.getAllTimesheets();
                        this.setState({
                            successMessage: "Rejected Successfully"
                        });
                        // , () => {
                        //   $('#myAlert').addClass('show');
                        //   $('#myAlert').show();
                        // })
                        $("comments1").val("");
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.handleRevise = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var validateFields, validationResult, metadata, postURL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validateFields = [
                            { Id: "comments1", Type: "text" },
                        ];
                        validationResult = this._spservice.utils.validateFields(validateFields, true);
                        if (!validationResult.IsValid) {
                            return [2 /*return*/];
                        }
                        metadata = {
                            Comments: $("#comments1").val(),
                            Status: "Revised",
                            Resubmit: false
                        };
                        postURL = this._spservice.absoluteUrl + "/_api/web/lists/getbytitle('" + this.props.EmployeeList + "')/items(" + $("#update").val() + ")";
                        return [4 /*yield*/, this._spservice.update(postURL, metadata)];
                    case 1:
                        _a.sent();
                        $('#custom-modal1').modal('hide');
                        this.state.isPending ? this.getPendingTimesheets() : this.getAllTimesheets();
                        this.setState({
                            successMessage: "Revised Successfully"
                        });
                        // , () => {
                        //   $('#myAlert').addClass('show');
                        //   $('#myAlert').show();
                        // })
                        $("comments1").val("");
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.handleMouseEnter = function (info) {
            console.log(info.event.extendedProps.description);
            tooltipInstance = info.event.extendedProps.description;
            var Name = info.event.extendedProps.name;
            var task = info.event.extendedProps.task;
            var effort = info.event.extendedProps.effort;
            var Project = info.event.extendedProps.project;
            if (info.event.extendedProps.description) {
                $(info.el).tooltip({
                    html: true,
                    title: tooltipInstance == "leave" ? '<div style="text-align: left">' + "Name: " + Name + '</div>' : '<div style="text-align: left">' + "Name: " + Name + '</br>' + "Project: " + Project + '</br>' + "Task Type: " + task + '</br>' + "Effort: " + effort + "hours" + '</br>' + "Description: " + tooltipInstance + '</div>',
                    placement: "left",
                    trigger: "hover",
                    container: "body"
                });
                $(info.el).tooltip('show');
            }
        };
        _this_1._spservice = new SPService(_this_1.props.context);
        _this_1.state = {
            TeamListData: [],
            groupName: "",
            ProjectList: [],
            project: [],
            dateRange: 0,
            fromDate: "",
            toDate: "",
            errorMessageFromDate: "",
            errorMessageToDate: "",
            PeopleId: 0,
            TaskType: [],
            status: "",
            statusFilter: "",
            successMessage: "",
            alertMessage: "",
            screen: false,
            isPending: true,
            groupColumn: "",
            isAdmin: false,
            isHR: false,
            event: [],
            staff: [],
            allUser: [],
            userMail: _this_1.props.context.pageContext.legacyPageContext.userEmail,
        };
        return _this_1;
    }
    TeamTimesheet.prototype.loadDefaultDates = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var opt, now, today, thisMonthsFromDate, thisMonthsToDate, lastMonthFromDate, lastMonthToDate, lasttwoMonthsFromDate, lasttwoMonthsToDate, lastthreeMonthsFromDate, lastthreeMonthsToDate;
            return __generator(this, function (_a) {
                opt = option;
                now = moment();
                switch (opt) {
                    case "1":
                        today = now.format("YYYY-MM-DD");
                        this.setState({
                            fromDate: today ? today : "",
                            toDate: today ? today : ""
                        });
                        break;
                    case "0":
                        thisMonthsFromDate = moment(now).startOf('month').format('YYYY-MM-DD');
                        thisMonthsToDate = now.format("YYYY-MM-DD");
                        this.setState({
                            fromDate: thisMonthsFromDate ? thisMonthsFromDate : "",
                            toDate: thisMonthsToDate ? thisMonthsToDate : ""
                        });
                        break;
                    case "2":
                        lastMonthFromDate = moment(now).subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
                        lastMonthToDate = moment(now).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
                        // let lastMonthToDate = now.format("YYYY-MM-DD");
                        this.setState({
                            fromDate: lastMonthFromDate ? lastMonthFromDate : "",
                            toDate: lastMonthToDate ? lastMonthToDate : ""
                        });
                        break;
                    case "4":
                        lasttwoMonthsFromDate = moment(now).subtract(2, 'months').startOf('month').format('YYYY-MM-DD');
                        lasttwoMonthsToDate = moment(now).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
                        // let lasttwoMonthsToDate = now.format("YYYY-MM-DD");
                        this.setState({
                            fromDate: lasttwoMonthsFromDate ? lasttwoMonthsFromDate : "",
                            toDate: lasttwoMonthsToDate ? lasttwoMonthsToDate : ""
                        });
                        break;
                    case "5":
                        lastthreeMonthsFromDate = moment(now).subtract(3, 'months').startOf('month').format('YYYY-MM-DD');
                        lastthreeMonthsToDate = moment(now).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
                        // let lastthreeMonthsToDate = now.format("YYYY-MM-DD");
                        this.setState({
                            fromDate: lastthreeMonthsFromDate ? lastthreeMonthsFromDate : "",
                            toDate: lastthreeMonthsToDate ? lastthreeMonthsToDate : ""
                        });
                        break;
                    // case "3":			
                    //   //custom
                    //   this.setState({ 
                    //     fromDate: "",
                    //     toDate: ""
                    //   });
                    // break;      
                }
                return [2 /*return*/];
            });
        });
    };
    TeamTimesheet.prototype.checkPermission = function () {
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
                        this.setState({
                            isAdmin: adminResult.data.value.length > 0 ? true : false,
                            isHR: hrResult.data.value.length > 0 ? true : false
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TeamTimesheet.prototype.getAllUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allUser, allUserValue, getUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        allUser = "" + this._spservice.rootSite + this._spservice.rootURL + "/_api/web/siteusers?$top=4999";
                        return [4 /*yield*/, this._spservice.get(allUser)];
                    case 1:
                        allUserValue = _a.sent();
                        getUser = allUserValue.data.value;
                        this.setState({ allUser: getUser });
                        return [2 /*return*/];
                }
            });
        });
    };
    //datatable
    TeamTimesheet.prototype.getManager = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this_1 = this;
            return __generator(this, function (_a) {
                new Promise(function (resolve, reject) {
                    _this_1.props.context.msGraphClientFactory.getClient()
                        .then(function (client) { return __awaiter(_this_1, void 0, void 0, function () {
                        var _this_1 = this;
                        return __generator(this, function (_a) {
                            // https://graph.microsoft.com/v1.0/me/manager
                            client.api('users').version('beta').filter("mail eq '" + this.state.userMail + "'").get(function (error, response, rawResponse) {
                                var managetId = response.value[0].id;
                                _this_1.getStaff(managetId);
                                if (error) {
                                    // reject(error);.filter(`manager.mail eq '${UserEmail}'`)
                                    resolve(null);
                                    return;
                                }
                                else {
                                    // resolve(response.value[0].manager.displayName)
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); });
                    _this_1.toggleLoader(false);
                });
                return [2 /*return*/];
            });
        });
    };
    TeamTimesheet.prototype.getStaff = function (managetId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this_1 = this;
            return __generator(this, function (_a) {
                new Promise(function (resolve, reject) {
                    _this_1.props.context.msGraphClientFactory.getClient()
                        .then(function (client) { return __awaiter(_this_1, void 0, void 0, function () {
                        var _this_1 = this;
                        return __generator(this, function (_a) {
                            // https://graph.microsoft.com/v1.0/me/manager
                            client.api("users/" + managetId + "/directReports").version('beta').get(function (error, response, rawResponse) {
                                var _a;
                                if (error) {
                                    // reject(error);.filter(`manager.mail eq '${UserEmail}'`)
                                    resolve(null);
                                    return;
                                }
                                else {
                                    // resolve(response.value[0].manager.displayName)
                                    var staffArr_1 = [];
                                    // let currentUser = "nandhini.thiraviyam@qantler.com"
                                    (_a = response.value) === null || _a === void 0 ? void 0 : _a.map(function (element) {
                                        var _a;
                                        (_a = _this_1.state.allUser) === null || _a === void 0 ? void 0 : _a.map(function (value) {
                                            if (value.Email === element.mail) {
                                                staffArr_1.push({ Id: value.Id });
                                            }
                                        });
                                    });
                                    _this_1.setState({ staff: staffArr_1 });
                                    _this_1.getAllTimesheets();
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); });
                    _this_1.toggleLoader(false);
                });
                return [2 /*return*/, true];
            });
        });
    };
    TeamTimesheet.prototype.callDataTable = function (tableId, groupBy) {
        if ($('#pending').hasClass('active')) {
            var colspan1 = 3;
            var colspan2 = 2;
        }
        else if ($('#all').hasClass('active')) {
            var colspan1 = (groupBy == "5") ? 4 : 3;
            var colspan2 = (groupBy == "5") ? 2 : 3;
        }
        var groupColumn = groupBy ? parseInt(groupBy) : -1;
        if (groupColumn >= 0) {
            applyDataTableGroupBy(tableId, parseInt(groupBy), 4, colspan1, colspan2);
        }
        else {
            applyDataTable(tableId);
        }
    };
    TeamTimesheet.prototype.handleSelectedId = function (id) {
        this.setState({ project: id });
    };
    TeamTimesheet.prototype.calendar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var arr, currentUserId, filter, _select, _expand, _orderby, _filter, teamListResult1, pendingData, leavefilter, url, leaveValue, data;
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $(".hide-show-search").hide();
                        $('#Pendingshow').hide();
                        $('#Allshow').hide();
                        $('#myTabContent').hide();
                        $("#calendar").show();
                        $(".fc-button").css("border", "rgb(34, 110, 183)");
                        $(".fc-button").css("background-color", "rgb(34, 110, 183)");
                        arr = [];
                        currentUserId = parseInt(this.props.context.pageContext.legacyPageContext.userId);
                        filter = "";
                        this.state.staff.forEach(function (ele, index) {
                            if (filter == "") {
                                if (index == 0)
                                    filter = "ResourceId eq " + ele.Id;
                                else
                                    filter += " or ResourceId eq " + ele.Id;
                            }
                            else {
                                if (index == 0)
                                    filter += " and ResourceId eq " + ele.Id;
                                else
                                    filter += " or ResourceId eq " + ele.Id;
                            }
                        });
                        _select = [{ fieldType: null, key: '*,Resource/Title,TaskType/Title,FieldValuesAsText/TaskDescription' }];
                        _expand = ["Resource,TaskType,FieldValuesAsText"];
                        _orderby = "Date";
                        _filter = "" + filter;
                        return [4 /*yield*/, this._spservice.getPagedListItems(this.props.EmployeeList, _select, _filter, _orderby, _expand)];
                    case 1:
                        teamListResult1 = _a.sent();
                        pendingData = teamListResult1;
                        pendingData.map(function (item) {
                            var Project;
                            _this_1.state.ProjectList.map(function (proitem) {
                                if (proitem.Id == item.ProjectID) {
                                    Project = proitem.Title;
                                }
                            });
                            var Description = item.TaskDescription;
                            arr.push({
                                title: Project + ": " + item.Effort + "hours",
                                name: item.Resource.Title,
                                date: moment(item.Date).format("YYYY-MM-DD"),
                                effort: item.Effort,
                                task: item.TaskType.Title,
                                project: Project,
                                extendedProps: {
                                    description: Description
                                }
                            });
                        });
                        leavefilter = "";
                        console.log(this.state.staff);
                        this.state.staff.forEach(function (ele, index) {
                            if (leavefilter == "") {
                                if (index == 0)
                                    leavefilter = "AuthorId eq " + ele.Id;
                                else
                                    leavefilter += " or AuthorId eq " + ele.Id;
                            }
                            else {
                                if (index == 0)
                                    leavefilter += " and AuthorId eq " + ele.Id;
                                else
                                    leavefilter += " or AuthorId eq " + ele.Id;
                            }
                        });
                        console.log(leavefilter);
                        url = "" + this._spservice.rootSite + this._spservice.rootURL + "/LMS/_api/web/lists/getbytitle('" + this.props.Leaves + "')/items?$select=*,Author/Title&$expand=Author&$filter=" + leavefilter;
                        return [4 /*yield*/, this._spservice.get(url)];
                    case 2:
                        leaveValue = _a.sent();
                        data = leaveValue.data.value;
                        console.log(data);
                        data === null || data === void 0 ? void 0 : data.map(function (item) {
                            var leave, color;
                            if (item.Status === "Approved") {
                                leave = 'Leave - ' + item.Author.Title;
                                color = "#c2c6cc";
                            }
                            else {
                                leave = 'Waiting for Approval - ' + item.Author.Title;
                                color = "#ff0000";
                            }
                            // date: `${moment(item.StartDate).format("YYYY-MM-DD").toString()}'-'${moment(item.EndDate).format("YYYY-MM-DD").toString()}`,
                            var startDay = new Date(item.StartDate);
                            var endDay = new Date(item.EndDate);
                            while (startDay <= endDay) {
                                arr.push({
                                    title: leave,
                                    name: item.Author.Title,
                                    date: moment(startDay).format("YYYY-MM-DD"),
                                    overlap: true,
                                    color: color,
                                    extendedProps: {
                                        description: "leave"
                                    }
                                });
                                var newDate = startDay.setDate(startDay.getDate() + 1);
                                startDay = new Date(newDate);
                            }
                        });
                        this.setState({ event: arr }, function () {
                            console.log(_this_1.state.event);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //calculation  
    TeamTimesheet.prototype.calcTotalEfforts = function () {
        var total = 0;
        // var efforts = document.getElementsByClassName("pendingefforts");
        // for (var i = 0; i < efforts.length; i++){	 
        //   total = +total + (+efforts[i].innerHTML);
        // }
        var efforts = this.state.TeamListData;
        for (var i = 0; i < efforts.length; i++) {
            total = +total + (+efforts[i].Effort);
        }
        var decimalTimeString = total;
        var decimalTime = parseFloat(decimalTimeString);
        decimalTime = decimalTime * 60 * 60;
        var hours = Math.floor((decimalTime / (60 * 60)));
        decimalTime = decimalTime - (hours * 60 * 60);
        var minutes = Math.floor((decimalTime / 60));
        // decimalTime = decimalTime - (minutes * 60);
        // var seconds: any = Math.round(decimalTime);
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        // if(seconds < 10)
        // {
        //     seconds = "0" + seconds;
        // }
        var totalefforts = hours + ':' + minutes;
        //$('#totalpendingefforts').text(totalefforts); //td total       
        $('#totalpendingefforts').text((total).toFixed(2)); //td total
    };
    TeamTimesheet.prototype.calcTotalAllEfforts = function () {
        var total = 0;
        // var efforts = document.getElementsByClassName("allefforts");
        // for (var i = 0; i < efforts.length; i++){	 
        //   total = +total + (+efforts[i].innerHTML);
        // }
        var efforts = this.state.TeamListData;
        for (var i = 0; i < efforts.length; i++) {
            total = +total + (+efforts[i].Effort);
        }
        var decimalTimeString = total;
        var decimalTime = parseFloat(decimalTimeString);
        decimalTime = decimalTime * 60 * 60;
        var hours = Math.floor((decimalTime / (60 * 60)));
        decimalTime = decimalTime - (hours * 60 * 60);
        var minutes = Math.floor((decimalTime / 60));
        // decimalTime = decimalTime - (minutes * 60);
        // var seconds: any = Math.round(decimalTime);
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        // if(seconds < 10)
        // {
        //     seconds = "0" + seconds;
        // }
        var totalefforts = hours + ':' + minutes;
        //$('#totalallefforts').text(totalefforts); //td total       
        $('#totalallefforts').text((total).toFixed(2));
    };
    TeamTimesheet.prototype.calcEfforts = function () {
        var total = 0;
        // var efforts = document.getElementsByClassName("exportefforts");
        // for (var i = 0; i < efforts.length; i++){	 
        //   total = +total + (+efforts[i].innerHTML);
        // }
        var efforts = this.state.TeamListData;
        for (var i = 0; i < efforts.length; i++) {
            total = +total + (+efforts[i].Effort);
        }
        var decimalTimeString = total;
        var decimalTime = parseFloat(decimalTimeString);
        decimalTime = decimalTime * 60 * 60;
        var hours = Math.floor((decimalTime / (60 * 60)));
        decimalTime = decimalTime - (hours * 60 * 60);
        var minutes = Math.floor((decimalTime / 60));
        // decimalTime = decimalTime - (minutes * 60);
        // var seconds: any = Math.round(decimalTime);
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        // if(seconds < 10)
        // {
        //     seconds = "0" + seconds;
        // }
        var totalefforts = hours + ':' + minutes;
        //$('#exporttotalefforts').text(totalefforts); //td total     
        $('#exporttotalefforts').text((total).toFixed(2));
    };
    TeamTimesheet.prototype.toggleLoader = function (IsShow) {
        if (IsShow)
            $('#loader').css("display", "block");
        else
            $('#loader').css("display", "none");
    };
    TeamTimesheet.prototype.render = function () {
        var _this_1 = this;
        var _a = this.state, TeamListData = _a.TeamListData, ProjectList = _a.ProjectList, TaskType = _a.TaskType, status = _a.status, successMessage = _a.successMessage, alertMessage = _a.alertMessage;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { id: "loader" }),
            React.createElement("div", { className: "content-page" },
                React.createElement("div", { className: "content" },
                    React.createElement("div", { className: "container-fluid pl-0 pr-0" }),
                    React.createElement("div", { className: "row mb-2 add-bar", style: { paddingBottom: "19px" } },
                        React.createElement("div", { className: "col-sm-12 col-md-12 float-left ml-4" },
                            React.createElement("span", { style: {
                                    color: "#000000", right: "10px",
                                    top: "58px", fontSize: "20px", cursor: "pointer"
                                }, onClick: function (e) { return _this_1.handleHamBurger(0); } }, " \u2630 "),
                            React.createElement("span", { className: 'pl-3', style: { fontSize: "20px", fontWeight: "bold" } }, "My Team"),
                            React.createElement("button", { onClick: this.handleExcel, type: "button", className: "btn btn-primary waves-effect waves-light float-right", style: { backgroundColor: "#226EB7", marginRight: "52px", minHeight: "42px", minWidth: "110px" } },
                                React.createElement("i", { className: "fa fa-download mr-2" }),
                                "Export"))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: 'row' },
                            React.createElement("ul", { className: "nav nav-tabs", id: "myTab", role: "tablist", style: { margin: "15px 0px 15px 39px", width: "96%" } },
                                React.createElement("li", { className: "nav-item", role: "presentation" },
                                    React.createElement("button", { className: "nav-link", id: "pending-tab", "data-toggle": "tab", "data-target": "#pending", type: "button", role: "tab", "aria-controls": "pending", "aria-selected": "true", onClick: function () { _this_1.getPendingTimesheets(); _this_1.ppl.state.selectedPersons = []; } }, "Pending")),
                                React.createElement("li", { className: "nav-item", role: "presentation" },
                                    React.createElement("button", { className: "nav-link active", id: "all-tab", "data-toggle": "tab", "data-target": "#all", type: "button", role: "tab", "aria-controls": "all", "aria-selected": "false", onClick: function () { _this_1.getAllTimesheets(); _this_1.ppl.state.selectedPersons = []; } }, "All")),
                                React.createElement("li", { className: "nav-item", role: "presentation" },
                                    React.createElement("button", { className: "nav-link", id: "all-tab", "data-toggle": "tab", "data-target": "#all", type: "button", role: "tab", "aria-controls": "all", "aria-selected": "false", onClick: this.calendar.bind(this) }, "Calendar View")),
                                React.createElement("div", { className: 'hide-show-search' },
                                    React.createElement("div", { className: 'hide-search', id: "hide-search", onClick: this.hideSearch },
                                        "Hide Search ",
                                        React.createElement("i", { className: "arrow-down" })),
                                    React.createElement("div", { className: 'hide-search', id: "show-search", style: { display: "none" }, onClick: this.showSearch },
                                        "Show Search ",
                                        React.createElement("i", { className: "arrow-up" }))))),
                        React.createElement("div", { className: "tab-content", id: "myTabContent" },
                            React.createElement("div", { className: "tab-pane fade show", id: "pending", role: "tabpanel", "aria-labelledby": "pending-tab" },
                                React.createElement("div", { className: "row", id: "search-filter", style: { display: "flex", margin: "10px", marginTop: "30px", paddingRight: "35px" } },
                                    React.createElement("div", { className: "col-sm-3 col-md-3" },
                                        React.createElement("label", { htmlFor: "position", id: "label" }, "Team Members "),
                                        React.createElement(PeoplePicker, { context: this.props.context, personSelectionLimit: 1, groupName: "", showtooltip: false, required: false, ensureUser: true, showHiddenInUI: false, principalTypes: [PrincipalType.User], onChange: this.getPeople, resolveDelay: 1000, styles: this.pickerStylesSingle, ref: function (c) { return (_this_1.ppl = c); } })),
                                    React.createElement("div", { className: "col-sm-3 col-md-3" },
                                        React.createElement("label", { htmlFor: "position", id: "label" }, "Date Range"),
                                        React.createElement("select", { className: "form-control place-holder", id: "daterange", value: this.state.dateRange, onChange: this.handleDateRange },
                                            React.createElement("option", { value: "1" }, "Today"),
                                            React.createElement("option", { value: "0" }, "This Month"),
                                            React.createElement("option", { value: "2" }, "Last Month"),
                                            React.createElement("option", { value: "4" }, "Last Two Months"),
                                            React.createElement("option", { value: "5" }, "Last Three Months"),
                                            React.createElement("option", { value: "3", disabled: true }, "Custom"))),
                                    React.createElement("div", { className: "col-sm-3 col-md-3" },
                                        React.createElement("label", { id: "label" }, "From Date "),
                                        React.createElement("input", { className: 'form-control datepicker place-holder', type: "date", id: "fromDate", name: "fromDate", value: this.state.fromDate, onChange: this.handleFromDateChange, max: moment().format("YYYY-MM-DD") }),
                                        React.createElement("span", { style: { color: "#D8000C" } }, this.state.errorMessageFromDate || null)),
                                    React.createElement("div", { className: "col-sm-3 col-md-3" },
                                        React.createElement("label", { id: "label" }, "To Date "),
                                        React.createElement("input", { className: 'form-control datepicker place-holder', type: "date", id: "toDate", name: "toDate", value: this.state.toDate, onChange: this.handleToDateChange, max: moment().format("YYYY-MM-DD") }),
                                        React.createElement("span", { style: { color: "#D8000C" } }, this.state.errorMessageToDate || null)),
                                    React.createElement("div", { className: "col-sm-3 col-md-3 mt-4" },
                                        React.createElement("label", { htmlFor: "position", id: "label" }, "Project"),
                                        React.createElement("select", { className: "form-control place-holder multiselect", id: "projectName2", multiple: true }, ProjectList && ProjectList.map(function (item, index) { return (React.createElement("option", { value: item.Id }, (item.ClientId ? '[' + item.Client.Title + ']' : '') + " " + item.Title)); }))),
                                    React.createElement("div", { className: "col-sm-3 col-md-3 mt-4" },
                                        React.createElement("label", { id: "label" }, "Group By"),
                                        React.createElement("select", { className: "form-control place-holder", id: "example-select", value: this.state.groupColumn, onChange: this.handleGroupBy },
                                            React.createElement("option", { value: "", selected: true }, "None"),
                                            React.createElement("option", { value: "0" }, "Resource"),
                                            React.createElement("option", { value: "1" }, "Project"),
                                            React.createElement("option", { value: "3" }, "Task Type"))),
                                    React.createElement("div", { className: "col-sm-3 col-md-3 mt-4" }),
                                    React.createElement("div", { className: "col-xs-12 col-sm-3 mt-2" },
                                        React.createElement("div", { className: "row col-6 p-0 m-0 float-right" },
                                            React.createElement("div", { className: "col-xs-12 col-sm-12", style: { padding: "0px 0px 0px 15px" } },
                                                React.createElement("button", { type: "button", className: "btn waves-effect waves-light mt-3", style: { width: "100%", height: "96%", color: "#226EB7", border: "1px solid" }, onClick: function () { _this_1.ppl.state.selectedPersons = []; _this_1.handleClear(); } },
                                                    React.createElement("i", { className: "fa fa-undo mr-1" }),
                                                    " Reset"))))),
                                React.createElement("div", { className: "row", id: 'Pendingshow' },
                                    React.createElement("div", { className: "col-xl-12" },
                                        React.createElement("div", { className: "card-box bg-trans" },
                                            React.createElement("div", { className: "row pt-1" },
                                                React.createElement("div", { className: "col-xs-6 col-md-6 pl-4" },
                                                    React.createElement("span", { className: "pl-4", style: { fontWeight: "800", color: "#958F8F", fontSize: "13px" } }, TeamListData.length ? TeamListData.length + " Items Found" : "0 Items Found"))),
                                            React.createElement("div", { className: "table-responsive pt-3", style: { cursor: "pointer", padding: "0px 26px 0px 30px" } },
                                                React.createElement("table", { id: "staffTable", className: "table table-hover product_table" },
                                                    React.createElement("thead", null,
                                                        React.createElement("tr", { className: "table-active" },
                                                            React.createElement("th", null, "Resource"),
                                                            React.createElement("th", null, "Project"),
                                                            React.createElement("th", null, "Task Description"),
                                                            React.createElement("th", null, "Task Type"),
                                                            React.createElement("th", null, "Effort (in hours)"),
                                                            React.createElement("th", null, "Date"))),
                                                    React.createElement("tbody", null, TeamListData && TeamListData.map(function (item, index) { return (React.createElement("tr", { "data-toggle": "modal", "data-backdrop": "static", "data-keyboard": "false", onClick: function () { return _this_1.getItemlist(item.Id); }, "data-target": "#custom-modal1" },
                                                        React.createElement("td", { className: "" }, item.Resource ? item.Resource.Title : ""),
                                                        React.createElement("td", { className: "" }, ProjectList && ProjectList.map(function (proitem) {
                                                            if (proitem.Id == item.ProjectID) {
                                                                return proitem.ClientId ? ('[' + proitem.Client.Title + '] ' + proitem.Title) : proitem.Title;
                                                            }
                                                        })),
                                                        React.createElement("td", { className: "text-wrap", dangerouslySetInnerHTML: { __html: item.TaskDescription } }),
                                                        React.createElement("td", { className: "" }, item.TaskType ? item.TaskType.Title : ""),
                                                        React.createElement("td", { className: "pendingefforts" }, item.Effort ? item.Effort : 0),
                                                        React.createElement("td", { className: "text-nowrap" }, item.Date ? _this_1._spservice.moment(item.Date).format("YYYY-MM-DD") : ""))); })),
                                                    React.createElement("tfoot", null,
                                                        React.createElement("tr", null,
                                                            React.createElement("td", null),
                                                            React.createElement("td", null),
                                                            React.createElement("td", { style: { fontWeight: "bold" } }, TeamListData.length ? "Total Efforts: " : ""),
                                                            React.createElement("td", null),
                                                            React.createElement("td", { style: { fontWeight: "bold" } }, TeamListData.length ? React.createElement("span", { id: "totalpendingefforts" }) : null),
                                                            React.createElement("td", null))))))))),
                            React.createElement("div", { className: "tab-pane fade show active", id: "all", role: "tabpanel", "aria-labelledby": "all-tab" },
                                React.createElement("div", { className: "row", id: "search-filter1", style: { display: "flex", margin: "10px", marginTop: "30px", paddingRight: "35px" } },
                                    React.createElement("div", { className: "col-sm-3 col-md-3" },
                                        React.createElement("label", { htmlFor: "position", id: "label" }, "Team Members "),
                                        React.createElement(PeoplePicker, { context: this.props.context, personSelectionLimit: 1, groupName: "", showtooltip: false, required: false, ensureUser: true, showHiddenInUI: false, principalTypes: [PrincipalType.User], onChange: this.getPeople, resolveDelay: 1000, styles: this.pickerStylesSingle, ref: function (c) { return (_this_1.ppl = c); } })),
                                    React.createElement("div", { className: "col-sm-3 col-md-3" },
                                        React.createElement("label", { htmlFor: "position", id: "label" }, "Date Range"),
                                        React.createElement("select", { className: "form-control place-holder", id: "daterange", value: this.state.dateRange, onChange: this.handleDateRange },
                                            React.createElement("option", { value: "1" }, "Today"),
                                            React.createElement("option", { value: "0" }, "This Month"),
                                            React.createElement("option", { value: "2" }, "Last Month"),
                                            React.createElement("option", { value: "4" }, "Last Two Months"),
                                            React.createElement("option", { value: "5" }, "Last Three Months"),
                                            React.createElement("option", { value: "3", disabled: true }, "Custom"))),
                                    React.createElement("div", { className: "col-sm-3 col-md-3" },
                                        React.createElement("label", { id: "label" }, "From Date "),
                                        React.createElement("input", { className: 'form-control datepicker place-holder', type: "date", id: "fromDate", name: "fromDate", value: this.state.fromDate, onChange: this.handleFromDateChange, max: moment().format("YYYY-MM-DD") }),
                                        React.createElement("span", { style: { color: "#D8000C" } }, this.state.errorMessageFromDate || null)),
                                    React.createElement("div", { className: "col-sm-3 col-md-3" },
                                        React.createElement("label", { id: "label" }, "To Date "),
                                        React.createElement("input", { className: 'form-control datepicker place-holder', type: "date", id: "toDate", name: "toDate", value: this.state.toDate, onChange: this.handleToDateChange, max: moment().format("YYYY-MM-DD") }),
                                        React.createElement("span", { style: { color: "#D8000C" } }, this.state.errorMessageToDate || null)),
                                    React.createElement("div", { className: "col-sm-3 col-md-3 mt-4" },
                                        React.createElement("label", { htmlFor: "position", id: "label" }, "Project"),
                                        React.createElement("select", { className: "form-control place-holder multiselect", id: "projectName3", multiple: true }, ProjectList && ProjectList.map(function (item, index) { return (React.createElement("option", { value: item.Id }, (item.ClientId ? '[' + item.Client.Title + ']' : '') + " " + item.Title)); }))),
                                    React.createElement("div", { className: "col-sm-3 col-md-3 mt-4" },
                                        React.createElement("label", { htmlFor: "position", id: "label" }, "Status "),
                                        React.createElement("select", { className: "form-control place-holder", id: "example-select", value: this.state.statusFilter, onChange: this.handleStatus },
                                            React.createElement("option", { value: "" }),
                                            React.createElement("option", { value: "Waiting for Approval" }, "Waiting for Approval"),
                                            React.createElement("option", { value: "Approved" }, "Approved"),
                                            React.createElement("option", { value: "Rejected" }, "Rejected"),
                                            React.createElement("option", { value: "Revised" }, "Revised"))),
                                    React.createElement("div", { className: "col-sm-3 col-md-3 mt-4" },
                                        React.createElement("label", { id: "label" }, "Group By"),
                                        React.createElement("select", { className: "form-control place-holder", id: "example-select", value: this.state.groupColumn, onChange: this.handleGroupBy },
                                            React.createElement("option", { value: "", selected: true }, "None"),
                                            React.createElement("option", { value: "0" }, "Resource"),
                                            React.createElement("option", { value: "1" }, "Project"),
                                            React.createElement("option", { value: "3" }, "Task Type"),
                                            React.createElement("option", { value: "5" }, "Status"))),
                                    React.createElement("div", { className: "col-xs-12 col-sm-3 mt-2" },
                                        React.createElement("div", { className: "row col-6 p-0 m-0 float-right" },
                                            React.createElement("div", { className: "col-xs-12 col-sm-12", style: { padding: "0px 0px 0px 15px" } },
                                                React.createElement("button", { type: "button", className: "btn waves-effect waves-light mt-3", style: { width: "100%", height: "96%", color: "#226EB7", border: "1px solid" }, onClick: function () { _this_1.ppl.state.selectedPersons = []; _this_1.handleClear(); } },
                                                    React.createElement("i", { className: "fa fa-undo mr-1" }),
                                                    " Reset"))))),
                                React.createElement("div", { className: "row", id: 'Allshow' },
                                    React.createElement("div", { className: "col-xl-12" },
                                        React.createElement("div", { className: "card-box bg-trans" },
                                            React.createElement("div", { className: "row pt-1" },
                                                React.createElement("div", { className: "col-xs-6 col-md-6 pl-4" },
                                                    React.createElement("span", { className: "pl-4", style: { fontWeight: "800", color: "#958F8F", fontSize: "13px" } }, TeamListData.length ? TeamListData.length + " Items Found" : "0 Items Found"))),
                                            React.createElement("div", { className: "table-responsive pt-3", style: { cursor: "pointer", padding: "0px 26px 0px 30px" } },
                                                React.createElement("table", { id: "staffTable1", className: "table table-hover product_table" },
                                                    React.createElement("thead", null,
                                                        React.createElement("tr", { className: "table-active" },
                                                            React.createElement("th", null, "Resource"),
                                                            React.createElement("th", null, "Project"),
                                                            React.createElement("th", null, "Task Description"),
                                                            React.createElement("th", null, "Task Type"),
                                                            React.createElement("th", null, "Effort (in hours)"),
                                                            React.createElement("th", null, "Status"),
                                                            React.createElement("th", null, "Date"))),
                                                    React.createElement("tbody", null, TeamListData && TeamListData.map(function (item, index) { return (React.createElement("tr", { "data-toggle": "modal", "data-backdrop": "static", "data-keyboard": "false", onClick: function () { return _this_1.getItemlist(item.Id); }, "data-target": "#custom-modal1" },
                                                        React.createElement("td", { className: "" }, item.Resource ? item.Resource.Title : ""),
                                                        React.createElement("td", { className: "" }, ProjectList && ProjectList.map(function (proitem) {
                                                            if (proitem.Id == item.ProjectID) {
                                                                return proitem.ClientId ? ('[' + proitem.Client.Title + '] ' + proitem.Title) : proitem.Title;
                                                            }
                                                        })),
                                                        React.createElement("td", { className: "text-wrap", dangerouslySetInnerHTML: { __html: item.TaskDescription } }),
                                                        React.createElement("td", { className: "" }, item.TaskType ? item.TaskType.Title : ""),
                                                        React.createElement("td", { className: "allefforts" }, item.Effort ? item.Effort : 0),
                                                        React.createElement("td", { className: "" }, item.Status || ""),
                                                        React.createElement("td", { className: "text-nowrap" }, item.Date ? _this_1._spservice.moment(item.Date).format("YYYY-MM-DD") : ""))); })),
                                                    React.createElement("tfoot", null,
                                                        React.createElement("tr", null,
                                                            React.createElement("td", null),
                                                            React.createElement("td", null),
                                                            React.createElement("td", { style: { fontWeight: "bold" } }, TeamListData.length ? "Total Efforts : " : ""),
                                                            React.createElement("td", null),
                                                            React.createElement("td", { style: { fontWeight: "bold" } }, TeamListData.length ? React.createElement("span", { id: "totalallefforts" }) : null),
                                                            React.createElement("td", null),
                                                            React.createElement("td", null))))))))))))),
            React.createElement("div", { className: "modal left fade", id: "custom-modal1", tabIndex: -1, role: "dialog", "aria-hidden": "true" },
                React.createElement("div", { className: "modal-dialog modal-dialog-centered" },
                    React.createElement("div", { className: "modal-content" },
                        React.createElement("div", { className: "modal-header bg-light", style: { display: "block" } },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-1 col-md-1 col-sm-1", style: { padding: "3px" } },
                                    React.createElement("span", { className: "close", "data-dismiss": "modal", "aria-hidden": "true", style: { textAlign: "right", fontSize: "24px !important" } }, "\u00D7")),
                                React.createElement("div", { className: "col-10 col-md-10 col-sm-10" },
                                    React.createElement("h4", { className: "modal-title", id: "myCenterModalLabel" })))),
                        React.createElement("div", { className: "modal-body p-4" },
                            React.createElement("form", { id: "myform1" },
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { htmlFor: "name" }, "Date"),
                                    React.createElement("input", { className: 'form-control datepicker', disabled: true, type: "date", id: "newDate1", name: "newDate1" })),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { htmlFor: "name" }, "Project"),
                                    React.createElement("input", { type: "text", className: "form-control", id: "projectName1", disabled: true, onChange: this.handleSearch })),
                                React.createElement("div", { className: "form-group", id: 'summernotedescription' },
                                    React.createElement("label", { htmlFor: "position" }, "Task Description"),
                                    React.createElement("div", { className: "summernote", id: 'description1' })),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { htmlFor: "category" }, "Effort (in hours)"),
                                    React.createElement("input", { type: "number", className: "form-control", min: "1", max: "12", id: "efforts1", name: "efforts1", disabled: true })),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { htmlFor: "category" }, "Task Type"),
                                    React.createElement("select", { className: "form-control", id: "taskType1", disabled: true },
                                        React.createElement("option", { value: 0 }, "-- Select --"),
                                        TaskType && TaskType.map(function (item, index) { return (React.createElement("option", { value: item.Id }, item.Title)); }))),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { htmlFor: "position" }, "Comments"),
                                    React.createElement("textarea", { className: "form-control", id: "comments1", name: "comments1", rows: 4, disabled: status === "waiting for approval" ? false : true })))),
                        React.createElement("div", { className: "modal-footer text-center display-block p-4", id: "update" }, status === "waiting for approval" ? React.createElement(React.Fragment, null,
                            React.createElement("button", { type: "button", className: 'btn btn-danger', style: { width: "31%" }, onClick: this.handleReject }, "Reject"),
                            React.createElement("button", { type: "button", className: "btn btn-secondary", style: { width: "31%" }, onClick: this.handleRevise }, "Revise"),
                            React.createElement("button", { type: "button", className: 'btn btn-success', style: { width: "32%" }, onClick: this.handleApprove }, "Approve"))
                            :
                                React.createElement("button", { type: "button", className: "btn btn-secondary", "data-dismiss": "modal", style: { width: "100%" } }, "Close"))))),
            React.createElement("div", { className: "modal fade", id: "custom-modal3", tabIndex: -1, role: "dialog" },
                React.createElement("div", { className: "modal-dialog", role: "document" },
                    React.createElement("div", { className: "modal-content" },
                        React.createElement("div", { className: "modal-body" },
                            React.createElement("p", null, alertMessage)),
                        React.createElement("div", { className: "modal-footer" },
                            React.createElement("button", { type: "button", className: "btn btn-primary btn-sm", style: { backgroundColor: "#226EB7" }, "data-dismiss": "modal" }, "OK"))))),
            React.createElement("table", { id: "teamTimesheet-export", className: "display nowrap d-none", style: { width: "100%" } },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Date"),
                        React.createElement("th", null, "Resource"),
                        React.createElement("th", null, "Project"),
                        React.createElement("th", null, "Task Description"),
                        React.createElement("th", null, "Task Type"),
                        React.createElement("th", null, "Effort (in hours)"),
                        React.createElement("th", null, this.state.isPending ? "" : "Status"))),
                React.createElement("tbody", null, TeamListData && TeamListData.map(function (item, i) {
                    return (React.createElement("tr", { key: i },
                        React.createElement("td", null, item.Date ? _this_1._spservice.moment(item.Date).format("YYYY-MM-DD") : ""),
                        React.createElement("td", null, item.Resource ? item.Resource.Title : ""),
                        React.createElement("td", null, ProjectList && ProjectList.map(function (proitem) {
                            if (proitem.Id == item.ProjectID) {
                                return proitem.ClientId ? ('[' + proitem.Client.Title + '] ' + proitem.Title) : proitem.Title;
                            }
                        })),
                        React.createElement("td", { dangerouslySetInnerHTML: { __html: item.TaskDescription } }),
                        React.createElement("td", { className: "" }, item.TaskType ? item.TaskType.Title : ""),
                        React.createElement("td", { className: "exportefforts" }, item.Effort ? item.Effort : 0),
                        React.createElement("td", null, _this_1.state.isPending ? "" : item.Status)));
                })),
                React.createElement("tfoot", null,
                    React.createElement("tr", null,
                        React.createElement("td", null),
                        React.createElement("td", null),
                        React.createElement("td", null),
                        React.createElement("td", null, "Total Efforts: "),
                        React.createElement("td", null),
                        React.createElement("td", null,
                            React.createElement("span", { id: "exporttotalefforts" })),
                        React.createElement("td", null)))),
            React.createElement("div", { id: 'calendar', style: { padding: "2.5%" } },
                React.createElement("div", { className: 'demo-app' },
                    React.createElement("div", { className: 'demo-app-main' },
                        React.createElement(FullCalendar, { plugins: [dayGridPlugin], headerToolbar: {
                                left: 'today',
                                center: 'title',
                                right: 'prev,next'
                            }, buttonText: {
                                today: 'Today'
                            }, initialView: 'dayGridMonth', eventMouseEnter: this.handleMouseEnter, editable: true, selectable: true, selectMirror: true, dayMaxEvents: true, events: this.state.event }))))));
    };
    return TeamTimesheet;
}(React.Component));
export default TeamTimesheet;
//# sourceMappingURL=TeamTimesheet.js.map