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
import './MyTimesheet.module.scss';
import SPService from '../../../shared/services/SPService';
import * as moment from 'moment';
import * as $ from 'jquery';
import { applyDataTable, destroyDataTable, applyDataTableGroupBy } from '../../../shared/utils/datatable';
import { download } from '../../../shared/utils/datatable-export';
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
import 'jquery-ui-dist/jquery-ui.min.js';
import 'jquery-ui-dist/jquery-ui.min.css';
require("../../../shared/js/summernote-bs4.js");
import { initializeIcons } from '@fluentui/react/lib/Icons';
initializeIcons();
import FullCalendar, { formatDate } from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { createEventId } from './event-utils';
var tooltipInstance = null;
var MyTimesheet = /** @class */ (function (_super) {
    __extends(MyTimesheet, _super);
    function MyTimesheet(props) {
        var _this_1 = _super.call(this, props) || this;
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
        // private getManager = async () => {
        //   let currentUserId = parseInt(this.props.context.pageContext.legacyPageContext.userId);
        //   var managerURL = `${this._spservice.rootSite}${this._spservice.rootURL}/_api/web/lists/getbytitle('${this.props.TeamList}')/items?$select=*,Manager/EMail,Manager/Title&$expand=Manager&$filter=StaffId eq ${currentUserId}`
        //   const managerListResult = await this._spservice.get(managerURL);
        //   this.setState({ isManager: managerListResult.data ? managerListResult.data.value : [] })
        // }
        _this_1.getProjects = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var projectListURL, projectListResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        projectListURL = "" + this._spservice.rootSite + this._spservice.rootURL + "/_api/web/lists/getbytitle('" + this.props.ProjectList + "')/items?$select=*,Title,Client/Title&$filter=IsActive eq 1&$expand=Client&$orderby=Client/Title";
                        return [4 /*yield*/, this._spservice.get(projectListURL)];
                    case 1:
                        projectListResult = _a.sent();
                        $('#projectName3').select2();
                        $('#projectName2').select2();
                        console.log(projectListResult, "result");
                        this.setState({ ProjectList: projectListResult.ok ? projectListResult.data.value : [] });
                        return [2 /*return*/];
                }
            });
        }); };
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
        //datatable
        _this_1.getAllTimesheets = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var currentUserId, _select, _expand, _filter, _orderby, employeeListResult, filterdata;
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $("#myTabContent").show();
                        $("#calendar").hide();
                        $(".hide-show-search").show();
                        $("#staffTablehide2").show();
                        $('#projectName2').val(null).trigger("change");
                        $('#projectName3').val(null).trigger("change");
                        this.setState({ isPending: false, isCalender: false, project: [], dateRange: 0, errorMessageFromDate: "", errorMessageToDate: "", statusFilter: "", groupColumn: "" });
                        return [4 /*yield*/, this.loadDefaultDates("0")];
                    case 1:
                        _a.sent();
                        currentUserId = parseInt(this.props.context.pageContext.legacyPageContext.userId);
                        _select = [{ fieldType: null, key: 'Effort,Status,TaskDescription,ProjectID,Date,Resource/Title,TaskType/Title,FieldValuesAsText/TaskDescription' }];
                        _expand = ["Resource,TaskType,FieldValuesAsText"];
                        _filter = "ResourceId eq " + currentUserId;
                        _orderby = "Date";
                        return [4 /*yield*/, this._spservice.getPagedListItems(this.props.EmployeeList, _select, _filter, _orderby, _expand)];
                    case 2:
                        employeeListResult = _a.sent();
                        destroyDataTable("staffTable");
                        destroyDataTable("staffTable1");
                        destroyDataTable("myTimesheet-export");
                        employeeListResult.reverse();
                        filterdata = [];
                        employeeListResult.forEach(function (element) {
                            if (moment(element.Date).format("YYYY-MM-DD") >= _this_1.state.fromDate && moment(element.Date).format("YYYY-MM-DD") <= _this_1.state.toDate) {
                                filterdata.push(element);
                            }
                        });
                        this.setState({ EmployeeList: filterdata ? filterdata : [] });
                        this.callDataTable("staffTable1", this.state.groupColumn);
                        this.calcTotalAllEfforts();
                        this.calcEfforts();
                        this.toggleLoader(false);
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.getPendingTimesheets = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var currentUserId, _select, _expand, _filter, _orderby, employeeListResult, data, filterdata;
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // debugger
                        $("#myTabContent").show();
                        $(".hide-show-search").show();
                        $("#calendar").hide();
                        $("#staffTablehide1").show();
                        $('#projectName2').val(null).trigger("change");
                        $('#projectName3').val(null).trigger("change");
                        this.setState({ isPending: true, isCalender: false, project: [], dateRange: 0, errorMessageFromDate: "", errorMessageToDate: "", statusFilter: "", groupColumn: "" });
                        return [4 /*yield*/, this.loadDefaultDates("0")];
                    case 1:
                        _a.sent();
                        currentUserId = parseInt(this.props.context.pageContext.legacyPageContext.userId);
                        _select = [{ fieldType: null, key: 'Effort,Status,TaskDescription,ProjectID,Date,Resource/Title,TaskType/Title,FieldValuesAsText/TaskDescription' }];
                        _expand = ["Resource,TaskType,FieldValuesAsText"];
                        _filter = "ResourceId eq " + currentUserId;
                        _orderby = "Date";
                        return [4 /*yield*/, this._spservice.getPagedListItems(this.props.EmployeeList, _select, _filter, _orderby, _expand)];
                    case 2:
                        employeeListResult = _a.sent();
                        destroyDataTable("staffTable");
                        destroyDataTable("staffTable1");
                        destroyDataTable("myTimesheet-export");
                        data = employeeListResult === null || employeeListResult === void 0 ? void 0 : employeeListResult.filter(function (item) { return item.Status.toLowerCase() === "waiting for approval"; });
                        data.reverse();
                        filterdata = [];
                        data.forEach(function (element) {
                            if (moment(element.Date).format("YYYY-MM-DD") >= _this_1.state.fromDate && moment(element.Date).format("YYYY-MM-DD") <= _this_1.state.toDate) {
                                filterdata.push(element);
                            }
                        });
                        this.setState({ EmployeeList: filterdata ? filterdata : [] });
                        this.callDataTable("staffTable", this.state.groupColumn);
                        this.calcTotalEfforts();
                        this.calcEfforts();
                        this.toggleLoader(false);
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.handleExcel = function () {
            var filename = "Timesheet_" + _this_1._spservice.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            download("myTimesheet-export", [], [], filename, "excel", "");
            // const groupBy = this.state.groupColumn;
            // let groupColumn = groupBy ? (parseInt(groupBy)+1) : -1;
            // if(groupColumn >=0 ){ 
            //   if ($('#pending').hasClass('active')){
            //     var colspan1 = 3;
            //     var colspan2 = 1;
            //   }else if ($('#all').hasClass('active')){
            //     var colspan1 = (groupBy=="4")? 4 : 3;
            //     var colspan2 = (groupBy=="4")? 1 : 2;
            //   }          
            //   downloadWithGroupBy("myTimesheet-export", groupColumn, 4, colspan1, colspan2, [], [], filename, "excel", "");
            // }else{
            //   download("myTimesheet-export", [], [], filename, "excel", "");
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
        _this_1.handleToDateChange = function (event) { return __awaiter(_this_1, void 0, void 0, function () {
            var value, now, today, lastMonthFromDate, lasttwoMonthsFromDate, defaultdaterange, defaultdaterange, defaultdaterange, defaultdaterange, defaultdaterange;
            return __generator(this, function (_a) {
                value = event.target.value;
                now = moment();
                today = now.format("YYYY-MM-DD");
                lastMonthFromDate = moment(now).subtract(1, 'months').format('YYYY-MM-DD');
                lasttwoMonthsFromDate = moment(now).subtract(2, 'months').format('YYYY-MM-DD');
                if (value == today) {
                    if (this.state.fromDate == lasttwoMonthsFromDate) {
                        defaultdaterange = 0;
                    }
                    else if (this.state.fromDate == lastMonthFromDate) {
                        defaultdaterange = 1;
                    }
                    else if (this.state.fromDate == today) {
                        defaultdaterange = 2;
                    }
                    else {
                        defaultdaterange = 3;
                    }
                }
                else {
                    defaultdaterange = 3;
                }
                this.setState({
                    toDate: value,
                    dateRange: defaultdaterange
                });
                this.handleSearch();
                return [2 /*return*/];
            });
        }); };
        _this_1.handleStatus = function (event) {
            var value = event.target.value;
            console.log(value);
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
            var currentUserId, filter, _select, _expand, _filter, _orderby, searchListResult, data, filterdata_1, filterdata_2, data, data, data, data;
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentUserId = parseInt(this.props.context.pageContext.legacyPageContext.userId);
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
                        if ((this.state.project).length > 0) {
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
                        // if (this.state.fromDate != "" && this.state.toDate != "") {
                        //   if (filter == "") {
                        //     filter = `Date ge datetime'${moment(this.state.fromDate).startOf('day').toISOString()}' and Date le datetime'${moment(this.state.toDate).endOf('day').toISOString()}'`;
                        //   } else {
                        //     filter += ` and Date ge datetime'${moment(this.state.fromDate).startOf('day').toISOString()}' and Date le datetime'${moment(this.state.toDate).endOf('day').toISOString()}'`;
                        //   }
                        // }
                        // if (this.state.fromDate && !this.state.toDate) {
                        //   if (filter == "") {
                        //     filter = `Date ge datetime'${moment(this.state.fromDate).startOf('day').toISOString()}' and Date le datetime'${moment().endOf('day').toISOString()}'`;
                        //   } else {
                        //     filter += ` and Date ge datetime'${moment(this.state.fromDate).startOf('day').toISOString()}' and Date le datetime'${moment().endOf('day').toISOString()}'`;
                        //   }
                        // }
                        console.log(this.state.statusFilter);
                        // if (this.state.statusFilter != "") {
                        //   if (filter == "") {
                        //     filter = `Status eq '${this.state.statusFilter}'`;
                        //   } else {
                        //     filter += ` and Status eq '${this.state.statusFilter}'`;
                        //   }
                        // }
                        console.log(filter);
                        _select = [{ fieldType: null, key: 'Effort,Status,TaskDescription,ProjectID,Date,Resource/Title,TaskType/Title,FieldValuesAsText/TaskDescription,Date' }];
                        _expand = ["Resource,TaskType,FieldValuesAsText"];
                        _filter = (filter === "" ? filter : filter + "and") + " ResourceId eq " + currentUserId;
                        _orderby = "Date";
                        return [4 /*yield*/, this._spservice.getPagedListItems(this.props.EmployeeList, _select, _filter, _orderby, _expand)];
                    case 1:
                        searchListResult = _a.sent();
                        destroyDataTable("staffTable");
                        destroyDataTable("staffTable1");
                        destroyDataTable("myTimesheet-export");
                        if (this.state.isPending) {
                            data = searchListResult === null || searchListResult === void 0 ? void 0 : searchListResult.filter(function (item) { return item.Status.toLowerCase() === "waiting for approval"; });
                            data.reverse();
                            filterdata_1 = [];
                            data.forEach(function (element) {
                                if (moment(element.Date).format("YYYY-MM-DD") >= _this_1.state.fromDate && moment(element.Date).format("YYYY-MM-DD") <= _this_1.state.toDate) {
                                    filterdata_1.push(element);
                                }
                            });
                            console.log(filterdata_1);
                            this.setState({ EmployeeList: filterdata_1 ? filterdata_1 : [] });
                            this.callDataTable("staffTable", this.state.groupColumn);
                            this.calcTotalEfforts();
                            this.calcEfforts();
                        }
                        else {
                            filterdata_2 = [];
                            if (this.state.statusFilter == "Waiting for Approval") {
                                data = searchListResult === null || searchListResult === void 0 ? void 0 : searchListResult.filter(function (item) { return item.Status.toLowerCase() === "waiting for approval"; });
                                data.reverse();
                                data.forEach(function (element) {
                                    if (moment(element.Date).format("YYYY-MM-DD") >= _this_1.state.fromDate && moment(element.Date).format("YYYY-MM-DD") <= _this_1.state.toDate) {
                                        filterdata_2.push(element);
                                    }
                                });
                            }
                            else if (this.state.statusFilter == "Approved") {
                                data = searchListResult === null || searchListResult === void 0 ? void 0 : searchListResult.filter(function (item) { return item.Status.toLowerCase() === "approved"; });
                                data.reverse();
                                data.forEach(function (element) {
                                    if (moment(element.Date).format("YYYY-MM-DD") >= _this_1.state.fromDate && moment(element.Date).format("YYYY-MM-DD") <= _this_1.state.toDate) {
                                        filterdata_2.push(element);
                                    }
                                });
                            }
                            else if (this.state.statusFilter == "Rejected") {
                                data = searchListResult === null || searchListResult === void 0 ? void 0 : searchListResult.filter(function (item) { return item.Status.toLowerCase() === "rejected"; });
                                data.reverse();
                                data.forEach(function (element) {
                                    if (moment(element.Date).format("YYYY-MM-DD") >= _this_1.state.fromDate && moment(element.Date).format("YYYY-MM-DD") <= _this_1.state.toDate) {
                                        filterdata_2.push(element);
                                    }
                                });
                            }
                            else if (this.state.statusFilter == "Revised") {
                                data = searchListResult === null || searchListResult === void 0 ? void 0 : searchListResult.filter(function (item) { return item.Status.toLowerCase() === "revised"; });
                                data.reverse();
                                data.forEach(function (element) {
                                    if (moment(element.Date).format("YYYY-MM-DD") >= _this_1.state.fromDate && moment(element.Date).format("YYYY-MM-DD") <= _this_1.state.toDate) {
                                        filterdata_2.push(element);
                                    }
                                });
                            }
                            else {
                                searchListResult.reverse();
                                searchListResult.forEach(function (element) {
                                    if (moment(element.Date).format("YYYY-MM-DD") >= _this_1.state.fromDate && moment(element.Date).format("YYYY-MM-DD") <= _this_1.state.toDate) {
                                        filterdata_2.push(element);
                                    }
                                });
                            }
                            this.setState({ EmployeeList: filterdata_2 ? filterdata_2.reverse() : [] });
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
                        this.setState({ project: [], dateRange: 0, errorMessageFromDate: "", errorMessageToDate: "", statusFilter: "", groupColumn: "" });
                        return [4 /*yield*/, this.loadDefaultDates("0")];
                    case 1:
                        _a.sent();
                        this.state.isPending ? this.getPendingTimesheets() : this.getAllTimesheets();
                        return [2 /*return*/];
                }
            });
        }); };
        //new timesheet
        _this_1.handleNewTimesheet = function () { return __awaiter(_this_1, void 0, void 0, function () {
            return __generator(this, function (_a) {
                document.getElementById("newDate").classList.remove("border-danger");
                document.getElementById("selectprojectname").classList.remove("border-danger");
                // document.getElementById("description").classList.remove("border-danger");
                document.getElementById("efforts").classList.remove("border-danger");
                document.getElementById("taskType").classList.remove("border-danger");
                $("#newDate").val("" + this._spservice.moment(new Date()).format("YYYY-MM-DD"));
                this.getManager(this.props);
                this.setState({ efforts: "" });
                return [2 /*return*/];
            });
        }); };
        _this_1.handleSubmit = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var validateFields, validationResult, richtext, currentUserId, date, project, description, effort, tasktype, metadata, postURL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validateFields = [
                            { Id: "newDate", Type: "text" },
                            { Id: "selectprojectname", Type: "text" },
                            // { Id: "description", Type: "text" },
                            { Id: "efforts", Type: "text" },
                            { Id: "taskType", Type: "select" },
                        ];
                        validationResult = this._spservice.utils.validateFields(validateFields, true);
                        if (!validationResult.IsValid) {
                            return [2 /*return*/];
                        }
                        richtext = $('#description').summernote('code');
                        if ($('#description').summernote('isEmpty')) {
                            alert("Please enter the Task description");
                            return [2 /*return*/];
                        }
                        currentUserId = parseInt(this.props.context.pageContext.legacyPageContext.userId);
                        date = "" + this._spservice.moment($("#newDate").val(), "YYYY-MM-DD").toISOString();
                        project = $("#projectName").val();
                        description = richtext;
                        effort = $("#efforts").val();
                        tasktype = $("#taskType").val();
                        metadata = {
                            Date: date,
                            ProjectID: project,
                            TaskDescription: description,
                            Effort: effort,
                            TaskTypeId: tasktype,
                            Status: "Waiting for Approval",
                            Resubmit: false,
                            ResourceId: currentUserId
                        };
                        postURL = this._spservice.absoluteUrl + "/_api/web/lists/getbytitle('" + this.props.EmployeeList + "')/items";
                        return [4 /*yield*/, this._spservice.post(postURL, metadata)];
                    case 1:
                        _a.sent();
                        $('#custom-modal').modal('hide');
                        if (this.state.isCalender) {
                            this.calendar();
                        }
                        else if (this.state.isPending) {
                            this.getPendingTimesheets();
                        }
                        else {
                            this.getAllTimesheets();
                        }
                        this.setState({
                            successMessage: "Created Successfully",
                            efforts: ""
                        });
                        $("#newDate").val("");
                        $("#projectName").val("");
                        $("#selectprojectname").val("");
                        //$("#description").val("");
                        $('#description').summernote('code', "");
                        $("#efforts").val("");
                        $("#taskType").val(0);
                        return [2 /*return*/];
                }
            });
        }); };
        //edit timesheet    
        _this_1.getItemlist = function (index) { return __awaiter(_this_1, void 0, void 0, function () {
            var employeeListURL, employeeListResult, listURL, listResult, clientname, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document.getElementById("newDate1").classList.remove("border-danger");
                        document.getElementById("selectprojectname1").classList.remove("border-danger");
                        // document.getElementById("description1").classList.remove("border-danger");
                        document.getElementById("efforts1").classList.remove("border-danger");
                        document.getElementById("taskType1").classList.remove("border-danger");
                        employeeListURL = this._spservice.absoluteUrl + "/_api/web/lists/getbytitle('" + this.props.EmployeeList + "')/items(" + index + ")?$select=*,Resource/Title,Resource/EMail&$expand=Resource";
                        return [4 /*yield*/, this._spservice.get(employeeListURL)];
                    case 1:
                        employeeListResult = _a.sent();
                        $("#newDate1").val("" + this._spservice.moment(employeeListResult.data.Date).format("YYYY-MM-DD"));
                        listURL = "" + this._spservice.rootSite + this._spservice.rootURL + "/_api/web/lists/getbytitle('" + this.props.ProjectList + "')/items(" + employeeListResult.data.ProjectID + ")?$select=Title,ClientId,Client/Title&$expand=Client";
                        return [4 /*yield*/, this._spservice.get(listURL)];
                    case 2:
                        listResult = _a.sent();
                        if (listResult.ok) {
                            clientname = listResult.data.ClientId ? '[' + listResult.data.Client.Title + '] ' : '';
                            console.log(clientname + listResult.data.Title, listResult.data);
                            $("#selectprojectname1").val(clientname + listResult.data.Title);
                            $("#projectName1").val(employeeListResult.data.ProjectID);
                        }
                        status = employeeListResult.data.Status.toLowerCase();
                        if (status === "waiting for approval" || status === "revised") {
                            $('#description1').summernote('enable');
                        }
                        else {
                            $('#description1').summernote('disable');
                        }
                        $('#description1').summernote('code', employeeListResult.data.TaskDescription);
                        $("#efforts1").val(employeeListResult.data.Effort);
                        $("#comments1").val(employeeListResult.data.Comments);
                        $("#taskType1").val(employeeListResult.data.TaskTypeId);
                        $("#update").val(employeeListResult.data.Id);
                        this.setState({
                            status: employeeListResult.data.Status ? employeeListResult.data.Status.toLowerCase() : "", efforts: employeeListResult.data.Effort,
                            createdBy: employeeListResult.data.Resource.Title
                        });
                        this.getManager(this.props);
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.handleUpdate = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var validateFields, validationResult, richtext, date, project, description, effort, tasktype, metadata, postURL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validateFields = [
                            { Id: "newDate1", Type: "text" },
                            { Id: "selectprojectname1", Type: "text" },
                            { Id: "description1", Type: "text" },
                            { Id: "efforts1", Type: "text" },
                            { Id: "taskType1", Type: "select" },
                        ];
                        validationResult = this._spservice.utils.validateFields(validateFields, true);
                        if (!validationResult.IsValid) {
                            return [2 /*return*/];
                        }
                        richtext = $('#description1').summernote('code');
                        if ($('#description1').summernote('isEmpty')) {
                            alert("Please enter the Task description");
                            return [2 /*return*/];
                        }
                        date = "" + this._spservice.moment($("#newDate1").val(), "YYYY-MM-DD").toISOString();
                        project = $("#projectName1").val();
                        description = richtext;
                        effort = $("#efforts1").val();
                        tasktype = $("#taskType1").val();
                        metadata = {
                            Date: date,
                            ProjectID: project,
                            TaskDescription: description,
                            Effort: effort,
                            TaskTypeId: tasktype,
                            Status: "Waiting for Approval",
                            Resubmit: false
                        };
                        postURL = this._spservice.absoluteUrl + "/_api/web/lists/getbytitle('" + this.props.EmployeeList + "')/items(" + $("#update").val() + ")";
                        return [4 /*yield*/, this._spservice.update(postURL, metadata)];
                    case 1:
                        _a.sent();
                        $('#custom-modal1').modal('hide');
                        this.state.isPending ? this.getPendingTimesheets() : this.getAllTimesheets();
                        this.setState({
                            successMessage: "Updated Successfully"
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.handleResubmit = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var validateFields, validationResult, richtext, date, project, description, effort, tasktype, metadata, postURL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validateFields = [
                            { Id: "newDate1", Type: "text" },
                            { Id: "selectprojectname1", Type: "text" },
                            { Id: "description1", Type: "text" },
                            { Id: "efforts1", Type: "text" },
                            { Id: "taskType1", Type: "select" },
                        ];
                        validationResult = this._spservice.utils.validateFields(validateFields, true);
                        if (!validationResult.IsValid) {
                            return [2 /*return*/];
                        }
                        richtext = $('#description1').summernote('code');
                        if ($('#description1').summernote('isEmpty')) {
                            alert("Please enter the Task description");
                            return [2 /*return*/];
                        }
                        date = "" + this._spservice.moment($("#newDate1").val(), "YYYY-MM-DD").toISOString();
                        project = $("#projectName1").val();
                        description = richtext;
                        effort = $("#efforts1").val();
                        tasktype = $("#taskType1").val();
                        metadata = {
                            Date: date,
                            ProjectID: project,
                            TaskDescription: description,
                            Effort: effort,
                            TaskTypeId: tasktype,
                            Status: "Waiting for Approval",
                            Resubmit: true
                        };
                        postURL = this._spservice.absoluteUrl + "/_api/web/lists/getbytitle('" + this.props.EmployeeList + "')/items(" + $("#update").val() + ")";
                        return [4 /*yield*/, this._spservice.update(postURL, metadata)];
                    case 1:
                        _a.sent();
                        $('#custom-modal1').modal('hide');
                        this.state.isPending ? this.getPendingTimesheets() : this.getAllTimesheets();
                        this.setState({
                            successMessage: "Updated Successfully"
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.handleDelete = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var postURL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postURL = this._spservice.absoluteUrl + "/_api/web/lists/getbytitle('" + this.props.EmployeeList + "')/items(" + $("#update").val() + ")";
                        return [4 /*yield*/, this._spservice.delete(postURL)];
                    case 1:
                        _a.sent();
                        this.handleMail();
                        $('#custom-modal1').modal('hide');
                        $('#custom-modal2').modal('hide');
                        this.state.isPending ? this.getPendingTimesheets() : this.getAllTimesheets();
                        this.setState({
                            successMessage: "Deleted Successfully"
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this_1.handleMail = function () {
            var appweburl = _this_1._spservice.absoluteUrl;
            var urlTemplate = appweburl + "/_api/SP.Utilities.Utility.SendEmail";
            $.ajax({
                contentType: 'application/json',
                url: urlTemplate,
                type: "POST",
                data: JSON.stringify({
                    'properties': {
                        '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                        // 'From': "gowtham.rajkumar@qantler.com",
                        'To': { 'results': ["" + (_this_1.state.isManager ? _this_1.state.ManagerEMail : null)] },
                        'Body': "<div style=\"font-size: 15px; font-family: Calibri;\"><p>Hi " + _this_1.state.ManagerTitle + ",<p>\n                        <p>It is to inform that the timesheet requested by " + _this_1.state.createdBy + " has been deleted due to some reasons.</p>\n                        <p style=\"color: #ff0000 !important;\">Note: This is system generated mail, Please do not reply.</p></div>\n                   ",
                        'Subject': "Reg - Timesheet Request"
                    }
                }),
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "X-RequestDigest": _this_1._spservice.digest
                },
                success: function (data) {
                    console.log("An email was sent.");
                },
                error: function (args) {
                    console.log("We had a problem and an email was not sent.");
                }
            });
        };
        _this_1.handleInput = function (event) {
            var value = event.target.value;
            var pattern = /^\d*(\.\d{0,2})?$/;
            var test = pattern.test(event.target.value);
            if (value === "") {
                _this_1.setState({ efforts: "" });
            }
            else {
                if (test) {
                    if (parseInt(value) >= 0 && parseInt(value) <= 24) {
                        _this_1.setState({ efforts: value });
                    }
                }
            }
        };
        _this_1.handleClose = function () {
            $('#custom-modal').modal('hide');
            $("#selectprojectname").val("");
            $("#projectName").val("");
            //$("#description").val("");
            $('#description').summernote('code', "");
            $("#efforts").val("");
            $("#taskType").val(0);
            _this_1.setState({ efforts: "" });
        };
        _this_1.handleMouseEnter = function (info) {
            console.log(info.event.extendedProps.description);
            if (info.event.extendedProps.description) {
                $(info.el).tooltip({
                    title: '<div style="text-align: left">' + "Project: " + info.event.extendedProps.project + '</br>' + "Task Type: " + info.event.extendedProps.task + '</br>' + "Effort: " + info.event.extendedProps.effort + "hours" + '</br>' + "Description: " + info.event.extendedProps.description + '</div>',
                    html: true,
                    placement: "left",
                    trigger: "hover",
                    container: "body"
                });
                $(info.el).tooltip('show');
            }
        };
        _this_1.handleWeekendsToggle = function () {
            _this_1.setState({
                weekendsVisible: _this_1.state.weekendsVisible
            });
        };
        _this_1.handleDateSelect = function (selectInfo) {
            var title = prompt('Please enter a new title for your event');
            var calendarApi = selectInfo.view.calendar;
            calendarApi.unselect(); // clear date selection
            if (title) {
                calendarApi.addEvent({
                    id: createEventId(),
                    title: title,
                    start: selectInfo.startStr,
                    end: selectInfo.endStr,
                    allDay: selectInfo.allDay
                });
            }
        };
        _this_1.handleEventClick = function (clickInfo) {
            if (confirm("Are you sure you want to delete the event '" + clickInfo.event.title + "'")) {
                clickInfo.event.remove();
            }
        };
        _this_1.handleEvents = function (events) {
            _this_1.setState({
                currentEvents: events
            });
        };
        _this_1._spservice = new SPService(_this_1.props.context);
        _this_1.state = {
            EmployeeList: [],
            ProjectList: [],
            project: [],
            dateRange: 0,
            fromDate: "",
            toDate: "",
            errorMessageFromDate: "",
            errorMessageToDate: "",
            TaskType: [],
            status: "",
            statusFilter: "",
            successMessage: "",
            alertMessage: "",
            screen: false,
            export: false,
            isPending: true,
            efforts: "",
            isCalender: false,
            isManager: false,
            createdBy: "",
            groupColumn: "",
            weekendsVisible: true,
            currentEvents: [],
            event: [],
            ManagerEMail: "",
            ManagerTitle: ""
        };
        return _this_1;
    }
    MyTimesheet.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $("#calendar").hide();
                        this.toggleLoader(true);
                        _this = this;
                        return [4 /*yield*/, this.getProjects()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getTaskType()];
                    case 2:
                        _a.sent();
                        if (!$('#pending').hasClass('active')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getPendingTimesheets()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!$('#all').hasClass('active')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.getAllTimesheets()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        $(document).on('change', '#projectName2', function () {
                            var id = $('#projectName2').val();
                            _this.handleSelectedId(id);
                        });
                        $(document).on('change', '#projectName3', function () {
                            var id = $('#projectName3').val();
                            _this.handleSelectedId(id);
                        });
                        $('#description').summernote({
                            shortcuts: false,
                            addDefaultFonts: true,
                            height: 200,
                            toolbar: [
                                ['para', ['ul', 'ol']],
                            ],
                            callbacks: {
                                onPaste: function (e) {
                                    var bufferText = ((e.originalEvent || e).clipboardData).getData('text/html') || ((e.originalEvent || e).clipboardData).getData('text/plain');
                                    e.preventDefault();
                                    var div = $('<div />');
                                    div.append(bufferText);
                                    div.find('*').removeAttr('style');
                                    setTimeout(function () {
                                        document.execCommand('insertHtml', false, div.html());
                                    }, 10);
                                }
                            }
                        });
                        $('#description1').summernote({
                            shortcuts: false,
                            addDefaultFonts: true,
                            height: 200,
                            toolbar: [
                                ['para', ['ul', 'ol']],
                            ],
                            callbacks: {
                                onPaste: function (e) {
                                    var bufferText = ((e.originalEvent || e).clipboardData).getData('text/html') || ((e.originalEvent || e).clipboardData).getData('text/plain');
                                    e.preventDefault();
                                    var div = $('<div />');
                                    div.append(bufferText);
                                    div.find('*').removeAttr('style');
                                    setTimeout(function () {
                                        document.execCommand('insertHtml', false, div.html());
                                    }, 10);
                                }
                            }
                        });
                        $(document).on('change', 'input#selectprojectname', function (e) {
                            e.preventDefault();
                            var val = $("#selectprojectname").val();
                            var projectID = $('#projectsandclients option').filter(function () {
                                return this.value == val;
                            }).data('id');
                            if (projectID) {
                                $("#projectName").val(projectID);
                            }
                            else {
                                $("#projectName").val("");
                                $("#selectprojectname").val("");
                            }
                        });
                        $(document).on('change', 'input#selectprojectname1', function (e) {
                            e.preventDefault();
                            var val = $("#selectprojectname1").val();
                            var projectID = $('#projectsandclients1 option').filter(function () {
                                return this.value == val;
                            }).data('id');
                            if (projectID) {
                                $("#projectName1").val(projectID);
                            }
                            else {
                                $("#projectName1").val("");
                                $("#selectprojectname1").val("");
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    MyTimesheet.prototype.loadDefaultDates = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var opt, now, today, thisMonthsFromDate, thisMonthsToDate, lastMonthFromDate, lastMonthToDate, lasttwoMonthsFromDate, lasttwoMonthsToDate, lastthreeMonthsFromDate, lastthreeMonthsToDate;
            return __generator(this, function (_a) {
                opt = option;
                now = moment();
                console.log(now, "date");
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
    //lookup
    MyTimesheet.prototype.getManager = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var _this_1 = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this_1.props.context.msGraphClientFactory.getClient()
                            .then(function (client) {
                            // https://graph.microsoft.com/v1.0/me/manager
                            var UserEmail = _this_1.props.context.pageContext.legacyPageContext.userEmail;
                            return client.api('users?$expand=manager').version('beta').filter("mail eq '" + UserEmail + "'").get(function (error, response, rawResponse) {
                                if (error) {
                                    // reject(error);
                                    resolve(null);
                                    return;
                                }
                                else {
                                    // resolve(response.value[0].manager.displayName)
                                    // console.log(response.value[0].manager.displayName)
                                    _this_1.setState({ ManagerEMail: response.value[0].manager.mail, ManagerTitle: response.value[0].manager.displayName, isManager: response.value[0].manager.displayName ? true : false });
                                }
                            });
                        });
                    })];
            });
        });
    };
    MyTimesheet.prototype.callDataTable = function (tableId, groupBy) {
        var groupColumn = groupBy ? parseInt(groupBy) : -1;
        if (groupColumn >= 0) {
            if ($('#pending').hasClass('active')) {
                var colspan1 = 2;
                var colspan2 = 2;
            }
            else if ($('#all').hasClass('active')) {
                var colspan1 = (groupBy == "4") ? 3 : 2;
                var colspan2 = (groupBy == "4") ? 2 : 3;
            }
            applyDataTableGroupBy(tableId, parseInt(groupBy), 3, colspan1, colspan2);
        }
        else {
            applyDataTable(tableId);
        }
    };
    MyTimesheet.prototype.handleSelectedId = function (id) {
        this.setState({ project: id });
        this.handleSearch();
    };
    //calculation  
    MyTimesheet.prototype.calcTotalEfforts = function () {
        var total = 0;
        // var efforts = document.getElementsByClassName("pendingefforts");
        // for (var i = 0; i < efforts.length; i++){	 
        //   total = +total + (+efforts[i].innerHTML);
        // }
        var efforts = this.state.EmployeeList;
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
    MyTimesheet.prototype.calcTotalAllEfforts = function () {
        var total = 0;
        // var efforts = document.getElementsByClassName("allefforts");
        // for (var i = 0; i < efforts.length; i++){	 
        //   total = +total + (+efforts[i].innerHTML);
        // }
        var efforts = this.state.EmployeeList;
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
    MyTimesheet.prototype.calcEfforts = function () {
        var total = 0;
        // var efforts = document.getElementsByClassName("exportefforts");
        // for (var i = 0; i < efforts.length; i++){	 
        //   total = +total + (+efforts[i].innerHTML);
        // }
        var efforts = this.state.EmployeeList;
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
    MyTimesheet.prototype.toggleLoader = function (IsShow) {
        if (IsShow)
            $('#loader').css("display", "block");
        else
            $('#loader').css("display", "none");
    };
    MyTimesheet.prototype.calendar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var arr, currentUserId, _select, _expand, _filter, _orderby, employeeListResult, User, url, value, data;
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $(".hide-show-search").hide();
                        $("#staffTablehide1").hide();
                        $("#staffTablehide2").hide();
                        $("#myTabContent").hide();
                        $("#calendar").show();
                        $(".fc-button").css("border", "rgb(34, 110, 183)");
                        $(".fc-button").css("background-color", "rgb(34, 110, 183)");
                        this.setState({ isCalender: true });
                        arr = [];
                        currentUserId = parseInt(this.props.context.pageContext.legacyPageContext.userId);
                        _select = [{ fieldType: null, key: '*,Resource/Title,TaskType/Title,FieldValuesAsText/TaskDescription' }];
                        _expand = ["Resource,TaskType,FieldValuesAsText"];
                        _filter = "ResourceId eq " + currentUserId;
                        _orderby = "Date";
                        return [4 /*yield*/, this._spservice.getPagedListItems(this.props.EmployeeList, _select, _filter, _orderby, _expand)];
                    case 1:
                        employeeListResult = _a.sent();
                        employeeListResult.map(function (item) {
                            var Project;
                            _this_1.state.ProjectList.map(function (proitem) {
                                if (proitem.Id == item.ProjectID) {
                                    Project = proitem.Title;
                                }
                            });
                            var Description = item.TaskDescription;
                            arr.push({
                                title: Project + ": " + item.Effort + "hours",
                                date: moment(item.Date).format("YYYY-MM-DD"),
                                extendedProps: {
                                    effort: item.Effort,
                                    task: item.TaskType.Title,
                                    project: Project,
                                    description: Description
                                }
                            });
                        });
                        User = this.props.context.pageContext.legacyPageContext.userId;
                        console.log(User);
                        url = "" + this._spservice.rootSite + this._spservice.rootURL + "/LMS/_api/web/lists/getbytitle('" + this.props.Leaves + "')/items?$filter=AuthorId eq '" + User + "'";
                        return [4 /*yield*/, this._spservice.get(url)];
                    case 2:
                        value = _a.sent();
                        data = value.data.value;
                        data === null || data === void 0 ? void 0 : data.map(function (item) {
                            console.log(item);
                            var leave;
                            var color;
                            if (item.Status === "Approved") {
                                leave = 'Leave';
                                color = "#c2c6cc";
                            }
                            else {
                                leave = 'Waiting for Approval';
                                color = "#ff0000";
                            }
                            // date: `${moment(item.StartDate).format("YYYY-MM-DD").toString()}'-'${moment(item.EndDate).format("YYYY-MM-DD").toString()}`,
                            var startDay = new Date(item.StartDate);
                            var endDay = new Date(item.EndDate);
                            while (startDay <= endDay) {
                                arr.push({
                                    title: leave,
                                    date: moment(startDay).format("YYYY-MM-DD"),
                                    overlap: true,
                                    color: color,
                                });
                                console.log(startDay);
                                var newDate = startDay.setDate(startDay.getDate() + 1);
                                startDay = new Date(newDate);
                            }
                        });
                        console.log(arr);
                        this.setState({ event: arr }, function () {
                            console.log(_this_1.state.event);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    MyTimesheet.prototype.convertToPlain = function (html) {
        // Create a new div element
        var tempDivElement = document.createElement("div");
        // Set the HTML content with the given value
        tempDivElement.innerHTML = html;
        // Retrieve the text property of the element 
        return tempDivElement.textContent || tempDivElement.innerText || "";
    };
    MyTimesheet.prototype.renderEventContent = function (eventInfo) {
        return (React.createElement(React.Fragment, null,
            React.createElement("b", null, eventInfo.timeText),
            React.createElement("i", null, eventInfo.event.title)));
    };
    MyTimesheet.prototype.renderSidebarEvent = function (event) {
        return (React.createElement("li", { key: event.id },
            React.createElement("b", null, formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })),
            React.createElement("i", null, event.title)));
    };
    MyTimesheet.prototype.render = function () {
        var _this_1 = this;
        var _a = this.state, EmployeeList = _a.EmployeeList, ProjectList = _a.ProjectList, TaskType = _a.TaskType, status = _a.status, successMessage = _a.successMessage, alertMessage = _a.alertMessage, isManager = _a.isManager;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { id: "loader" }),
            React.createElement("div", { className: "content-page" },
                React.createElement("div", { className: "content" },
                    React.createElement("div", { className: "container-fluid pl-0 pr-0" }),
                    React.createElement("div", { className: "row mb-2 add-bar", style: { paddingBottom: "19px" } },
                        React.createElement("div", { className: "col-sm-12 col-md-12 float-left ml-4", style: { paddingRight: "65px" } },
                            React.createElement("span", { style: {
                                    color: "#000000", right: "10px",
                                    top: "58px", fontSize: "20px", cursor: "pointer"
                                }, onClick: function (e) { return _this_1.handleHamBurger(0); } }, " \u2630 "),
                            React.createElement("span", { className: 'pl-3', style: { fontSize: "20px", fontWeight: "bold" } }, "My Timesheet"),
                            React.createElement("button", { onClick: this.handleNewTimesheet, type: "button", className: "btn btn-primary waves-effect waves-light float-right", "data-toggle": "modal", "data-backdrop": "static", "data-keyboard": "false", "data-target": "#custom-modal", style: { backgroundColor: "#226EB7", minHeight: "42px", minWidth: "154px" } },
                                React.createElement("i", { className: "fa fa-plus mr-1" }),
                                " New Timesheet"),
                            React.createElement("button", { onClick: this.handleExcel, type: "button", className: "btn btn-primary waves-effect waves-light float-right", style: { backgroundColor: "#226EB7", marginRight: "30px", minHeight: "42px", minWidth: "110px" } },
                                React.createElement("i", { className: "fa fa-download mr-2" }),
                                "Export")),
                        React.createElement("div", { className: "col-sm-12 col-sm-6 col-6 " }),
                        React.createElement("div", { className: "col-sm-1" }, " ")),
                    React.createElement("div", { className: 'row' },
                        React.createElement("div", { className: 'row' },
                            React.createElement("ul", { className: "nav nav-tabs", id: "myTab", role: "tablist", style: { margin: "15px 0px 15px 39px", width: "96%" } },
                                React.createElement("li", { className: "nav-item", role: "presentation" },
                                    React.createElement("button", { className: "nav-link active", id: "pending-tab", "data-toggle": "tab", "data-target": "#pending", type: "button", role: "tab", "aria-controls": "pending", "aria-selected": "true", onClick: this.getPendingTimesheets }, "Pending")),
                                React.createElement("li", { className: "nav-item", role: "presentation" },
                                    React.createElement("button", { className: "nav-link", id: "all-tab", "data-toggle": "tab", "data-target": "#all", type: "button", role: "tab", "aria-controls": "all", "aria-selected": "false", onClick: this.getAllTimesheets }, "All")),
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
                            React.createElement("div", { className: "tab-pane fade show active", id: "pending", role: "tabpanel", "aria-labelledby": "home-tab" },
                                React.createElement("div", { className: "row", id: "search-filter", style: { margin: "10px", marginTop: "30px", display: "flex" } },
                                    React.createElement("div", { className: "col-sm-3 col-md-3" },
                                        React.createElement("label", { htmlFor: "position", id: "label" }, "Project"),
                                        React.createElement("select", { className: "form-control place-holder", id: "projectName2", multiple: true }, ProjectList && ProjectList.map(function (item, index) { return (React.createElement("option", { value: item.Id }, (item.ClientId ? '[' + item.Client.Title + ']' : '') + " " + item.Title)); }))),
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
                                        React.createElement("label", { id: "label" }, "From Date"),
                                        React.createElement("input", { className: 'form-control datepicker place-holder', type: "date", id: "fromDate", name: "fromDate", value: this.state.fromDate, onChange: this.handleFromDateChange, max: moment().format("YYYY-MM-DD") }),
                                        React.createElement("span", { style: { color: "#D8000C" } }, this.state.errorMessageFromDate || null)),
                                    React.createElement("div", { className: "col-sm-3 col-md-3" },
                                        React.createElement("label", { id: "label" }, "To Date"),
                                        React.createElement("input", { className: 'form-control datepicker place-holder', type: "date", id: "toDate", name: "toDate", value: this.state.toDate, onChange: this.handleToDateChange, max: moment().format("YYYY-MM-DD") }),
                                        React.createElement("span", { style: { color: "#D8000C" } }, this.state.errorMessageToDate || null)),
                                    React.createElement("div", { className: "col-sm-3 col-md-3 mt-4" },
                                        React.createElement("label", { id: "label" }, "Group By"),
                                        React.createElement("select", { className: "form-control place-holder", id: "example-select", value: this.state.groupColumn, onChange: this.handleGroupBy },
                                            React.createElement("option", { value: "", selected: true }, "None"),
                                            React.createElement("option", { value: "0" }, "Project"),
                                            React.createElement("option", { value: "2" }, "Task Type"))),
                                    React.createElement("div", { className: "col-sm-6 col-md-6 mt-4" }),
                                    React.createElement("div", { className: "col-sm-12 col-md-3 mt-2" },
                                        React.createElement("div", { className: 'row' },
                                            React.createElement("div", { className: "col-xs-12 col-sm-12", style: { padding: "0px 0px 0px 15px" } },
                                                React.createElement("button", { type: "button", style: { width: "50%", height: "96%", color: "#226EB7", border: "1px solid" }, className: "btn waves-effect waves-light mt-3 float-end", onClick: this.handleClear },
                                                    React.createElement("i", { className: "fa fa-undo mr-1" }),
                                                    " Reset"))))),
                                React.createElement("div", { className: "row", id: 'staffTablehide1' },
                                    React.createElement("div", { className: "col-xl-12" },
                                        React.createElement("div", { className: "card-box bg-trans" },
                                            React.createElement("div", { className: "row pt-1" },
                                                React.createElement("div", { className: "col-xs-12 col-md-12 pl-4" },
                                                    React.createElement("span", { className: "pl-4", style: { fontWeight: "800", color: "#958F8F", fontSize: "13px" } }, EmployeeList.length ? EmployeeList.length + " Items Found" : "0 Items Found"))),
                                            React.createElement("div", { className: "table-responsive pt-3", style: { cursor: "pointer", padding: "0px 26px 0px 30px" } },
                                                React.createElement("table", { id: "staffTable", className: "table table-hover product_table" },
                                                    React.createElement("thead", null,
                                                        React.createElement("tr", { className: "table-active" },
                                                            React.createElement("th", null, "Project"),
                                                            React.createElement("th", null, "Task Description"),
                                                            React.createElement("th", null, "Task Type"),
                                                            React.createElement("th", null, "Effort (in hours)"),
                                                            React.createElement("th", null, "Date"))),
                                                    React.createElement("tbody", null, EmployeeList && EmployeeList.map(function (item, index) { return (React.createElement("tr", { "data-toggle": "modal", "data-target": "#custom-modal1", "data-backdrop": "static", "data-keyboard": "false", onClick: function () { return _this_1.getItemlist(item.Id); } },
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
                                                            React.createElement("td", { style: { fontWeight: "bold" } }, EmployeeList.length ? "Total Efforts: " : ""),
                                                            React.createElement("td", null),
                                                            React.createElement("td", { style: { fontWeight: "bold" } }, EmployeeList.length ? React.createElement("span", { id: "totalpendingefforts" }) : null),
                                                            React.createElement("td", null))))))))),
                            React.createElement("div", { className: "tab-pane fade show", id: "all", role: "tabpanel", "aria-labelledby": "home-tab" },
                                React.createElement("div", { className: "row", id: "search-filter1", style: { margin: "10px", marginTop: "30px", display: "flex" } },
                                    React.createElement("div", { className: "col-sm-3 col-md-3" },
                                        React.createElement("label", { htmlFor: "position", id: "label" }, "Project"),
                                        React.createElement("select", { className: "form-control place-holder multiselect", id: "projectName3", multiple: true, onChange: this.handleSearch }, ProjectList && ProjectList.map(function (item, index) { return (React.createElement("option", { value: item.Id }, (item.ClientId ? '[' + item.Client.Title + ']' : '') + " " + item.Title)); }))),
                                    React.createElement("div", { className: "col-sm-3 col-md-3" },
                                        React.createElement("label", { htmlFor: "position", id: "label" }, "Date Range"),
                                        React.createElement("select", { className: "form-control place-holder", id: "daterange1", value: this.state.dateRange, onChange: this.handleDateRange },
                                            React.createElement("option", { value: "1" }, "Today"),
                                            React.createElement("option", { value: "0" }, "This Month"),
                                            React.createElement("option", { value: "2" }, "Last Month"),
                                            React.createElement("option", { value: "4" }, "Last Two Months"),
                                            React.createElement("option", { value: "5" }, "Last Three Months"),
                                            React.createElement("option", { value: "3", disabled: true }, "Custom"))),
                                    React.createElement("div", { className: "col-sm-3 col-md-3" },
                                        React.createElement("label", { id: "label" }, "From Date"),
                                        React.createElement("input", { className: 'form-control datepicker place-holder', type: "date", id: "fromDate1", name: "fromDate", value: this.state.fromDate, onChange: this.handleFromDateChange, max: moment().format("YYYY-MM-DD") }),
                                        React.createElement("span", { style: { color: "#D8000C" } }, this.state.errorMessageFromDate || null)),
                                    React.createElement("div", { className: "col-sm-3 col-md-3" },
                                        React.createElement("label", { id: "label" }, "To Date"),
                                        React.createElement("input", { className: 'form-control datepicker place-holder', type: "date", id: "toDate", name: "toDate", value: this.state.toDate, onChange: this.handleToDateChange, max: moment().format("YYYY-MM-DD") }),
                                        React.createElement("span", { style: { color: "#D8000C" } }, this.state.errorMessageToDate || null)),
                                    React.createElement("div", { className: "col-sm-3 col-md-3 mt-4" },
                                        React.createElement("label", { htmlFor: "position", id: "label" }, "Status"),
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
                                            React.createElement("option", { value: "0" }, "Project"),
                                            React.createElement("option", { value: "2" }, "Task Type"),
                                            React.createElement("option", { value: "4" }, "Status"))),
                                    React.createElement("div", { className: "col-sm-3 col-md-3 mt-4" }),
                                    React.createElement("div", { className: "col-xs-12 col-sm-3 mt-2" },
                                        React.createElement("div", { className: 'row' },
                                            React.createElement("div", { className: "col-xs-12 col-sm-12", style: { padding: "0px 0px 0px 15px" } },
                                                React.createElement("button", { type: "button", style: { width: "50%", height: "96%", color: "#226EB7", border: "1px solid" }, className: "btn waves-effect waves-light mt-3 float-end", onClick: this.handleClear },
                                                    React.createElement("i", { className: "fa fa-undo mr-1" }),
                                                    " Reset"))))),
                                React.createElement("div", { className: "row", id: 'staffTablehide2' },
                                    React.createElement("div", { className: "col-xl-12" },
                                        React.createElement("div", { className: "card-box bg-trans" },
                                            React.createElement("div", { className: "row pt-1" },
                                                React.createElement("div", { className: "col-xs-12 col-md-12 pl-4" },
                                                    React.createElement("span", { className: "pl-4", style: { fontWeight: "800", color: "#958F8F", fontSize: "13px" } }, EmployeeList.length ? EmployeeList.length + " Items Found" : "0 Items Found"))),
                                            React.createElement("div", { className: "table-responsive pt-3", style: { cursor: "pointer", padding: "0px 26px 0px 30px" } },
                                                React.createElement("table", { id: "staffTable1", className: "table table-hover product_table" },
                                                    React.createElement("thead", null,
                                                        React.createElement("tr", { className: "table-active" },
                                                            React.createElement("th", null, "Project"),
                                                            React.createElement("th", null, "Task Description"),
                                                            React.createElement("th", null, "Task Type"),
                                                            React.createElement("th", null, "Effort (in hours)"),
                                                            React.createElement("th", null, "Status"),
                                                            React.createElement("th", null, "Date"))),
                                                    React.createElement("tbody", null, EmployeeList && EmployeeList.map(function (item, index) { return (React.createElement("tr", { "data-toggle": "modal", "data-backdrop": "static", "data-keyboard": "false", onClick: function () { return _this_1.getItemlist(item.Id); }, "data-target": "#custom-modal1" },
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
                                                            React.createElement("td", { style: { fontWeight: "bold" } }, EmployeeList.length ? "Total Efforts: " : ""),
                                                            React.createElement("td", null),
                                                            React.createElement("td", { style: { fontWeight: "bold" } }, EmployeeList.length ? React.createElement("span", { id: "totalallefforts" }) : null),
                                                            React.createElement("td", null),
                                                            React.createElement("td", null))))))))))))),
            React.createElement("div", { className: "modal left fade", id: "custom-modal", tabIndex: -1, role: "dialog", "aria-hidden": "true" },
                React.createElement("div", { className: "modal-dialog modal-dialog-centered" },
                    React.createElement("div", { className: "modal-content" },
                        React.createElement("div", { className: "modal-header bg-light" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-2 col-md-2 col-sm-2", style: { padding: "3px" } },
                                    React.createElement("span", { className: "close", style: { textAlign: "right", fontSize: "24px !important" }, onClick: this.handleClose, "aria-hidden": "true" }, "\u00D7")),
                                React.createElement("div", { className: "col-10 col-md-10 col-sm-10" },
                                    React.createElement("h4", { className: "modal-title", id: "myCenterModalLabel" }, "New Timesheet")))),
                        React.createElement("div", { className: "modal-body p-4" },
                            React.createElement("form", { id: "myform" },
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { htmlFor: "name" }, "Date"),
                                    React.createElement("input", { max: "" + this._spservice.moment(new Date()).format("YYYY-MM-DD"), className: 'form-control datepicker', type: "date", id: "newDate", name: "newDate" })),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { htmlFor: "name" }, "Project"),
                                    React.createElement("input", { className: "form-control", type: "text", id: "selectprojectname", list: "projectsandclients", autoComplete: 'false' }),
                                    React.createElement("input", { className: "form-control", type: "hidden", id: "projectName", name: "projectName" }),
                                    React.createElement("datalist", { id: "projectsandclients" }, ProjectList && ProjectList.map(function (item, index) { return (React.createElement("option", { "data-id": item.Id, id: item.Title, value: (item.ClientId ? '[' + item.Client.Title + ']' : '') + " " + item.Title })); }))),
                                React.createElement("div", { className: "form-group", id: 'summernotedescription' },
                                    React.createElement("label", { htmlFor: "position" }, "Task Description"),
                                    React.createElement("div", { className: "summernote", id: "description" })),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { htmlFor: "category" }, "Effort (in hours)"),
                                    React.createElement("input", { type: "text", className: "form-control", id: "efforts", name: "efforts", value: this.state.efforts, onChange: this.handleInput })),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { htmlFor: "category" }, "Task Type"),
                                    React.createElement("select", { className: "form-control", id: "taskType" },
                                        React.createElement("option", { value: 0 }, "-- Select --"),
                                        TaskType && TaskType.map(function (item, index) { return (React.createElement("option", { value: item.Id }, item.Title)); }))),
                                isManager ? null :
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("div", { className: "alert alert-danger" },
                                            React.createElement("strong", null, "Warning!"),
                                            " No manager is assigned to you. Please contact HR.")))),
                        React.createElement("div", { className: "modal-footer text-center display-block p-4" },
                            React.createElement("button", { type: "button", className: "btn btn-secondary right-button", onClick: this.handleClose }, "Close"),
                            React.createElement("button", { type: "button", style: { backgroundColor: "#226EB7" }, className: "btn btn-primary left-button", onClick: this.handleSubmit }, "Submit"))))),
            React.createElement("div", { className: "modal left fade", id: "custom-modal1", tabIndex: -1, role: "dialog", "aria-hidden": "true" },
                React.createElement("div", { className: "modal-dialog modal-dialog-centered" },
                    React.createElement("div", { className: "modal-content" },
                        React.createElement("div", { className: "modal-header bg-light" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-2 col-md-2 col-sm-2", style: { padding: "3px" } },
                                    React.createElement("span", { style: { textAlign: "right", fontSize: "24px !important" }, className: "close", "data-dismiss": "modal", "aria-hidden": "true" }, "\u00D7")),
                                React.createElement("div", { className: "col-10 col-md-10 col-sm-10" },
                                    React.createElement("h4", { className: "modal-title", id: "myCenterModalLabel" }, "Edit Timesheet")))),
                        React.createElement("div", { className: "modal-body p-4" },
                            React.createElement("form", { id: "myform1" },
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { htmlFor: "name" }, "Date"),
                                    React.createElement("input", { max: "" + this._spservice.moment(new Date()).format("YYYY-MM-DD"), className: 'form-control datepicker', disabled: status === "waiting for approval" || status === "revised" ? false : true, type: "date", id: "newDate1", name: "newDate1" })),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { htmlFor: "name" }, "Project"),
                                    React.createElement("input", { className: "form-control", type: "text", id: "selectprojectname1", list: "projectsandclients1", autoComplete: 'false', disabled: status === "waiting for approval" || status === "revised" ? false : true }),
                                    React.createElement("input", { className: "form-control", type: "hidden", id: "projectName1", name: "projectName1" }),
                                    React.createElement("datalist", { id: "projectsandclients1" }, ProjectList && ProjectList.map(function (item, index) { return (React.createElement("option", { "data-id": item.Id, id: item.Title, value: (item.ClientId ? '[' + item.Client.Title + ']' : '') + " " + item.Title })); }))),
                                React.createElement("div", { className: "form-group", id: 'summernotedescription' },
                                    React.createElement("label", { htmlFor: "position" }, "Task Description"),
                                    React.createElement("div", { className: "summernote", id: "description1" })),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { htmlFor: "category" }, "Effort (in hours)"),
                                    React.createElement("input", { type: "text", className: "form-control", id: "efforts1", name: "efforts1", value: this.state.efforts, onChange: this.handleInput, disabled: status === "waiting for approval" || status === "revised" ? false : true })),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { htmlFor: "category" }, "Task Type"),
                                    React.createElement("select", { className: "form-control", id: "taskType1", disabled: status === "waiting for approval" || status === "revised" ? false : true },
                                        React.createElement("option", { value: 0 }, "-- Select --"),
                                        TaskType && TaskType.map(function (item, index) { return (React.createElement("option", { value: item.Id }, item.Title)); }))),
                                status === "waiting for approval" ? null :
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { htmlFor: "position" }, "Comments"),
                                        React.createElement("textarea", { className: "form-control", id: "comments1", name: "comments1", disabled: true, rows: 4 })))),
                        React.createElement("div", { className: "modal-footer text-center display-block p-4" },
                            React.createElement("button", { type: "button", id: 'delete', className: (status === "waiting for approval" || status === "revised" ? "" : "d-none") + " btn btn-danger", style: { width: "31%" }, "data-toggle": "modal", "data-target": "#custom-modal2" }, "Delete"),
                            status === "waiting for approval" || status === "revised" ?
                                React.createElement("button", { type: "button", className: "btn btn-secondary", style: { width: "31%" }, "data-dismiss": "modal" }, "Close")
                                :
                                    React.createElement("button", { type: "button", className: "btn btn-secondary", style: { width: "100%" }, "data-dismiss": "modal" }, "Close"),
                            React.createElement("button", { type: "button", id: "update", className: (status === "waiting for approval" ? "" : "d-none") + " btn btn-primary", style: { width: "32%", backgroundColor: "#226EB7" }, onClick: this.handleUpdate }, "Update"),
                            React.createElement("button", { type: "button", id: "update", className: (status === "revised" ? "" : "d-none") + " btn btn-primary", style: { width: "32%", backgroundColor: "#226EB7" }, onClick: this.handleResubmit }, "Resubmit"))))),
            React.createElement("div", { className: "modal fade", id: "custom-modal2", tabIndex: -1, role: "dialog" },
                React.createElement("div", { className: "modal-dialog", role: "document" },
                    React.createElement("div", { className: "modal-content" },
                        React.createElement("div", { className: "modal-header" },
                            React.createElement("h5", { className: "modal-title", style: { margin: "0px" } }, "Delete"),
                            React.createElement("span", { className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                                React.createElement("span", { "aria-hidden": "true", style: { marginLeft: "80px" } }, "\u00D7"))),
                        React.createElement("div", { className: "modal-body" },
                            React.createElement("p", null, "Are you sure want to delete?")),
                        React.createElement("div", { className: "modal-footer" },
                            React.createElement("button", { type: "button", className: "btn btn-primary", style: { backgroundColor: "#226EB7" }, onClick: this.handleDelete }, "OK"),
                            React.createElement("button", { type: "button", className: "btn btn-secondary", "data-dismiss": "modal" }, "Cancel"))))),
            React.createElement("div", { className: "modal fade", id: "custom-modal3", tabIndex: -1, role: "dialog" },
                React.createElement("div", { className: "modal-dialog", role: "document" },
                    React.createElement("div", { className: "modal-content" },
                        React.createElement("div", { className: "modal-body" },
                            React.createElement("p", null, alertMessage)),
                        React.createElement("div", { className: "modal-footer" },
                            React.createElement("button", { type: "button", className: "btn btn-primary btn-sm", style: { backgroundColor: "#226EB7" }, "data-dismiss": "modal" }, "OK"))))),
            React.createElement("table", { id: "myTimesheet-export", className: "display nowrap d-none", style: { width: "100%" } },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Date"),
                        React.createElement("th", null, "Project"),
                        React.createElement("th", null, "Task Description"),
                        React.createElement("th", null, "Task Type"),
                        React.createElement("th", null, "Effort (in hours)"),
                        React.createElement("th", null, this.state.isPending ? "" : "Status"))),
                React.createElement("tbody", null, EmployeeList && EmployeeList.map(function (item, i) {
                    return (React.createElement("tr", { key: i },
                        React.createElement("td", null, item.Date ? _this_1._spservice.moment(item.Date).format("YYYY-MM-DD") : ""),
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
    return MyTimesheet;
}(React.Component));
export default MyTimesheet;
//# sourceMappingURL=MyTimesheet.js.map