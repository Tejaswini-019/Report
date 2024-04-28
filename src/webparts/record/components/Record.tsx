import * as React from 'react';
import './Record.module.scss';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { IRecordProps } from './IRecordProps';
import { DatePicker } from 'bootstrap-datepicker'
import SPService from '../../../shared/services/SPService';
import * as moment from 'moment';
import * as $ from 'jquery';
import { applyDataTable, destroyDataTable, applyDataTableGroupBy } from '../../../shared/utils/datatable';
import { download, downloadWithGroupBy } from '../../../shared/utils/datatable-export';
import { IValidationField } from '../../../shared/models/IValidationField';
import { filter, orderBy } from 'lodash';
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
import 'jquery-ui-dist/jquery-ui.min.js';
import 'jquery-ui-dist/jquery-ui.min.css';
require("../../../shared/js/summernote-bs4.js");
import { initializeIcons } from '@fluentui/react/lib/Icons';
initializeIcons();
import FullCalendar, { formatDate, startOfDay } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { ColorPicker, IBasePickerStyles } from 'office-ui-fabric-react';
import { MSGraphClient } from '@microsoft/sp-http';
let tooltipInstance = null;
export interface IRecordState {
  TeamListData: any[];
  groupName: string;
  ProjectList: any[];
  project: any;
  dateRange: any;
  fromDate: any;
  date: any;
  toDate: any;
  errorMessageFromDate: string;
  errorMessageToDate: string;
  PeopleId: any;
  TaskType: any[];
  status: string;
  statusFilter: string;
  successMessage: string;
  alertMessage: string;
  screen: boolean;
  isPending: boolean;
  groupColumn: any;
  isAdmin: boolean;
  isHR: boolean;
  event: any,
  staff: any[];
  allUser: any[];
  userMail: any;
  changeYear: any;
  submittedDays: number;
  approvedDays: number;
  EmpName: any,
  approved: number;
  approvedleaves: any;
  jobTitle: any;
  workingday: number;
  defaultDate: any;
  calendarshow: boolean;
  ename: string;
}

export default class Record extends React.Component<IRecordProps, IRecordState> {
  private _spservice: SPService;
  protected ppl;
  constructor(props) {
    super(props);
    this._spservice = new SPService(this.props.context);
    this.state = {
      TeamListData: [],
      calendarshow: false,
      groupName: "",
      ProjectList: [],
      project: [],
      date: "",
      workingday: 0,
      dateRange: 0,
      fromDate: "",//moment().format("YYYY-MM-DD"),
      toDate: "",
      changeYear: "",
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
      submittedDays: 0,
      approvedDays: 0,
      userMail: this.props.context.pageContext.legacyPageContext.userEmail,
      EmpName: "",
      approved: 0,
      approvedleaves: 0,
      jobTitle: "",
      defaultDate: moment().format("YYYY-MM"),
      ename: ""

    }

  }
  private pickerStylesSingle: Partial<IBasePickerStyles> = {
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
  }

  componentDidMount = async () => {
    this.toggleLoader(true);
    $("#calendar").hide();
    //await this.getPendingTimesheets();
    const myArray = $("#fromDate").val().split("-");
    const startDate = new Date(parseInt(myArray[0]), parseInt(myArray[1]) - 1, 1);
    const firstDay = moment(startDate).format("YYYY-MM-DD");
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    const lastDay = moment(endDate).format("YYYY-MM-DD");
    this.setState({fromDate:firstDay,toDate:lastDay});
    console.log(this.state.fromDate);
    let _this = this;
    //this.setState({fromDate:this.state.defaultDate})
    console.log(formatDate,"fromdate")
    await this.checkPermission();
    await this.getProjects();
    await this.getAllUser();
    await this.getManager();
    if ($('#pending').addClass('active')) {
      //await this.getPendingTimesheets();
     // this.loadDefaultDates("1");
    }
    $(document).on('change', '#projectName2', function () {
      let id = $('#projectName2').val();
      _this.handleSelectedId(id);
      _this.handleSearch();
    });
    $(document).on('change', '#projectName3', function () {
      let id = $('#projectName3').val();
      _this.handleSelectedId(id);
      _this.handleSearch();
    });
    ($('#description1') as any).summernote({
      addDefaultFonts: false,
      height: 200,
      toolbar: false,
    });
    $("#reporttable_length").hide()
    $("#reporttable_filter").hide()
    $("#reporttable_paginate").hide()
  }
  private handleSearch = async () => {
    if (this.state.toDate && !this.state.fromDate) {
      this.setState({
        errorMessageFromDate: "Please enter From Date",
        errorMessageToDate: ""
      });
      return;
    }
    if (moment(this.state.fromDate).isAfter(this.state.toDate)) {
      this.setState({
        errorMessageFromDate: "From Date should be lesser",
        errorMessageToDate: "To Date should be greater"
      });
      return;
    }
    this.setState({
      errorMessageFromDate: "",
      errorMessageToDate: ""
    });
    var filter = "";
    if (this.state.PeopleId !== 0) {
      var isStaff = this.state.staff.filter((item) => (item.Id === this.state.PeopleId));
      if (!this.state.isAdmin && !this.state.isHR) {
        if (filter == "") {
          filter = isStaff.length > 0 ? `ResourceId eq ${this.state.PeopleId}` : "ResourceId eq null";
        } else {
          filter += isStaff.length > 0 ? ` and ResourceId eq ${this.state.PeopleId}` : " and ResourceId eq null";
        }
      } else {
        if (filter == "") {
          filter = `ResourceId eq ${this.state.PeopleId}`;
        } else {
          filter += ` and ResourceId eq ${this.state.PeopleId}`;
        }
      }
    } else {
      //default filter for manager
      if (!this.state.isAdmin && !this.state.isHR) {
        this.state.staff.forEach((ele, index) => {
          if (index == 0)
            filter = `(ResourceId eq ${ele.Id}`;
          else
            filter += ` or ResourceId eq ${ele.Id}`
          if (index + 1 == this.state.staff.length) {
            filter += `)`
          }
        })
      }
    }
    if ((this.state.project).length > 0) {
      this.state.project.forEach((id, index) => {
        if (filter == "") {
          if (index == 0)
            filter = `(ProjectID eq ${id}`;
          else
            filter += ` or ProjectID eq ${id}`
          if (index + 1 == this.state.project.length)
            filter += `)`
        } else {
          if (index == 0)
            filter += ` and (ProjectID eq ${id}`;
          else
            filter += ` or ProjectID eq ${id}`
          if (index + 1 == this.state.project.length)
            filter += `)`
        }
      })
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
        filter = `Status eq '${this.state.statusFilter}'`;
      } else {
        filter += ` and Status eq '${this.state.statusFilter}'`;
      }
    }
    // var searchListURL = `${this._spservice.absoluteUrl}/_api/web/lists/getbytitle('${this.props.EmployeeList}')/items?$select=*,Project/Title,Resource/Title,TaskType/Title&$expand=Project,Resource,TaskType&$filter=${filter}`
    var _select = [{ fieldType: null, key: '*,Resource/Title,TaskType/Title,FieldValuesAsText/TaskDescription' }];
    var _expand = ["Resource,TaskType,FieldValuesAsText"];
    var _filter = `${filter}`;
    var _orderby = `Date`;
    var _name = `Timesheet`;
    const searchListResult = await this._spservice.getPagedListItems(_name, _select, _filter, _orderby, _expand);
    destroyDataTable("reporttable")
    //destroyDataTable("staffTable1")
    destroyDataTable("teamTimesheet-export")
    if (this.state.isPending) {
      var data = searchListResult?.filter((item) => item.Status.toLowerCase() === "waiting for approval")
      data.reverse();
      let filterdata = [];
      data.forEach(element => {
        if (moment(element.Date).format("YYYY-MM-DD") >= this.state.fromDate && moment(element.Date).format("YYYY-MM-DD") <= this.state.toDate) {
          filterdata.push(element)
        }
      });
      this.setState({ TeamListData: filterdata ? filterdata : [] });
      this.callDataTable("reporttable", this.state.groupColumn);
      this.calcTotalEfforts();
      this.calcEfforts();
    }
    else {
      searchListResult.reverse()
      let filterdata = [];
      searchListResult.forEach(element => {
        if (moment(element.Date).format("YYYY-MM-DD") >= this.state.fromDate && moment(element.Date).format("YYYY-MM-DD") <= this.state.toDate) {
          filterdata.push(element)
        }

      });
      this.setState({ TeamListData: filterdata ? filterdata : [] })
      //this.callDataTable("staffTable1", this.state.groupColumn);
      this.calcTotalAllEfforts();
      this.calcEfforts();
    }
  }
  private handleSelectedId(id) {
    this.setState({ project: id });
  }
  private handleHamBurger = (id) => {
    const { screen } = this.state;
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
      this.setState({ screen: true })
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
      this.setState({ screen: false });
      // $('.left-side-menu-mini').hide();
      // $('.left-side-menu').show();
    }
  }
  private async checkPermission() {
    let currentUserId = parseInt(this.props.context.pageContext.legacyPageContext.userId);
    //var title=currentUserId.value.Title
    var adminURL = `${this._spservice.absoluteUrl}/_api/web/GetUserById('${currentUserId}')/Groups?$filter=Title eq '${this.props.adminGroup}'`;
    const adminResult = await this._spservice.get(adminURL);
    var hrURL = `${this._spservice.absoluteUrl}/_api/web/GetUserById('${currentUserId}')/Groups?$filter=Title eq '${this.props.hrGroup}'`;
    const hrResult = await this._spservice.get(hrURL);
    this.setState({
      isAdmin: adminResult.data.value.length > 0 ? true : false,
      isHR: hrResult.data.value.length > 0 ? true : false
    });
  }
  private getTaskType = async () => {
    var TaskTypeURL = `${this._spservice.absoluteUrl}/_api/web/lists/getbytitle('TaskType')/items`
    const TaskTypeResult = await this._spservice.get(TaskTypeURL);
    this.setState({ TaskType: TaskTypeResult.ok ? TaskTypeResult.data.value : [] });
  }
  private getProjects = async () => {
    var _project = `Projects`;
    var projectListURL = `${this._spservice.rootSite}${this._spservice.rootURL}/_api/web/lists/getbytitle('${_project}')/items?$select=*,Title,Client/Title&$filter=IsActive eq 1&$expand=Client&$orderby=Client/Title`
    const projectListResult = await this._spservice.get(projectListURL);
    ($('#projectName2') as any).select2();
    ($('#projectName3') as any).select2();
    this.setState({ ProjectList: projectListResult.ok ? projectListResult.data.value : [] });
  }
  private async getAllUser() {
    var allUser = `${this._spservice.rootSite}${this._spservice.rootURL}/_api/web/siteusers?$top=4999`
    const allUserValue = await this._spservice.get(allUser);
    let getUser = allUserValue.data.value;
    this.setState({ allUser: getUser });
  }
  //datatable
  private async getManager(): Promise<any> {
    new Promise<any>((resolve, reject) => {
      this.props.context.msGraphClientFactory.getClient()
        .then(async (client: MSGraphClient) => {
          // https://graph.microsoft.com/v1.0/me/manager
          client.api('users').version('beta').filter(`mail eq '${this.state.userMail}'`).get((error, response: any, rawResponse?: any) => {
            // client.api('users').version('beta').filter(`mail eq 'ganesh.kumar@qantler.com'`).get((error, response: any, rawResponse?: any) => {
            let managetId = response.value[0].id
            this.getStaff(managetId);
            //console.log(getManager)
            if (error) {
              // reject(error);.filter(`manager.mail eq '${UserEmail}'`)
              resolve(null);
              return
            }
            else {
              this.setState({ jobTitle: response.value[0].jobTitle })
              // resolve(response.value[0].manager.displayName)
            }
          });
        });
      this.toggleLoader(false);
    });
  }

  private async getStaff(managetId): Promise<any> {
    new Promise<any>((resolve, reject) => {
      this.props.context.msGraphClientFactory.getClient()
        .then(async (client: MSGraphClient) => {
          // https://graph.microsoft.com/v1.0/me/manager
          client.api(`users/${managetId}/directReports`).version('beta').get((error, response: any, rawResponse?: any) => {
            if (error) {
              // reject(error);.filter(`manager.mail eq '${UserEmail}'`)
              resolve(null);
              return
            }
            else {
              // resolve(response.value[0].manager.displayName)
              let staffArr = [];
              // let currentUser = "nandhini.thiraviyam@qantler.com"
              response.value?.map((element) => {
                this.state.allUser?.map((value) => {
                  if (value.Email === element.mail) {
                    staffArr.push({ Id: value.Id })
                  }
                })
              })
              this.setState({ staff: staffArr })
              //this.getAllTimesheets();
            }
          });
        });
      this.toggleLoader(false);
    });
    return true;
  }
  private report = async () => {
    //debugger;
    const my = $("#fromDate").val();
    this.setState({defaultDate: moment(my).format("YYYY-MM")})
    console.log(this.state.defaultDate,"report default");
    const myArray = $("#fromDate").val().split("-");
    console.log(myArray, "myarray");
    const startDate = new Date(parseInt(myArray[0]), parseInt(myArray[1]) - 1, 1);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    const firstDay = moment(startDate).format("YYYY-MM-DD");
    const lastDay = moment(endDate).format("YYYY-MM-DD");
    this.setState({ fromDate: firstDay, toDate: lastDay })
    console.log(this.state.fromDate, "form");
    console.log(this.state.toDate, "todate")
    $(".hide-show-search").show();
    $('#myTabContent').show();
    $("#calendar").hide();
    $("#Pendingshow").show();
    //$('#datepicker').val(null).trigger("change");
    $('#projectName3').val(null).trigger("change");
    this.setState({ isPending: true, project: [], dateRange: 0, errorMessageFromDate: "", errorMessageToDate: "", statusFilter: "", groupColumn: "" });
    let currentUserId = parseInt(this.props.context.pageContext.legacyPageContext.userId);
   // var filter = "";
    /*  this.state.staff.forEach((ele, index) => { */
   // if (filter == "") {
      /*  if (index == 0) */
   var filter = `ResourceId eq ${this.state.PeopleId}`;
      /*  else */
      /*   filter += ` or ResourceId eq ${ele.Id}` */
   // }
    var _filter1 = `${filter}`;
    var _select = [{ fieldType: null, key: '*,Resource/Title,Resource/EMail' }];
    var _expand = ["Resource"];
    var _orderby = `Date`;
    var _Timesheet = `Timesheet`
    //var _LMS = `LMS`;
    // let datefilter = `Date ge '${this.state.fromDate}' and Date le '${this.state.toDate}'`;
    var _filter = `${filter}`;
    const teamListResult1 = await this._spservice.getPagedListItems(_Timesheet, _select, filter, _orderby, _expand);
    console.log(teamListResult1);
    //let leavefilter = "";
    /*  this.state.staff.forEach((ele, index) => { */
    //if (leavefilter == "") {

      /* if (index == 0) */
    var  leavefilter = `AuthorId eq ${this.state.PeopleId}`;
   // }
    /*  else
       leavefilter += ` or AuthorId eq ${ele.Id}`
   } else {
     if (index == 0)
       leavefilter += ` and AuthorId eq ${ele.Id}`;
     else
       leavefilter += ` or AuthorId eq ${ele.Id}`
   }
 }); */
    var _filter1 = `${leavefilter}`;
    let url = `${this._spservice.rootSite}${this._spservice.rootURL}/LMS/_api/web/lists/getbytitle('Leaves')/items?$select=*,Author/Title&$expand=Author&$filter=${_filter1}`;
    let leavevalue = await this._spservice.get(url);
    let leavedate = leavevalue.data.value;
    // let approvedLeaves = leavedate?.filter(item => item.Status === "Approved");

    let submittedDays = 0;
    let approved = 0;
    this.setState({ date: this.state.fromDate });
    let uniqueDatesleave = new Set();
    let appliedleaves = 0;
    leavedate.forEach(item => {
      if (item.hasOwnProperty('StartDate') && (item.hasOwnProperty('EndDate'))) {
        let startdate = moment(item.StartDate).format("YYYY-MM-DD");
        let Enddate = moment(item.EndDate).format("YYYY-MM-DD");
        if (startdate >= this.state.fromDate && Enddate <= this.state.toDate) {
          uniqueDatesleave.add(startDate);
          uniqueDatesleave.add(endDate);
          if (item.hasOwnProperty('Status')) {
            appliedleaves++;
            if (item.Status === "Approved") {
              approved++;
            }

          }
        }
      }
    });
    this.setState({ approvedleaves: appliedleaves });
    console.log(appliedleaves)
    //console.log(approvedLeaves)
    this.setState({ approved: approved });
    let uniqueDates = new Set();
    teamListResult1.forEach(item => {
      debugger;
      if (item.hasOwnProperty('Date')) {
        let date = moment(item.Date).format("YYYY-MM-DD");
        if (date >= this.state.fromDate && date <= this.state.toDate) {
          uniqueDates.add(date);
          if (item.hasOwnProperty('Resource')) {
            this.setState({ EmpName: item.Resource.Title });

          }
        }
      }
    });

    console.log(this.state.EmpName, "empname")
    submittedDays = uniqueDates.size;
    let approvedDays = 0;
    let uniqueDatesstatus = new Set();
    this.setState({ submittedDays: submittedDays });
    console.log(submittedDays, "submitttedays")
    teamListResult1.forEach(item => {
      if (item.hasOwnProperty('Date')) {
        let date = moment(item.Date).format("YYYY-MM-DD");

        if (date >= this.state.fromDate && date <= this.state.toDate) {
          if (item.Status === "Approved") {
            uniqueDatesstatus.add(date);
          }
        }
      }
    });
    approvedDays = uniqueDatesstatus.size;
    let HolidayCalendar = `${this._spservice.rootSite}${this._spservice.rootURL}/HolidayCalendar/_api/web/lists/GetByTitle('Mandatory Holidays')/items?$select=*&$filter=Date ge '${this.state.fromDate}' and Date le '${this.state.toDate}'`;
    let mandatory = await this._spservice.get(HolidayCalendar);
    let mandatorydate = mandatory.data.value;
    let count = mandatorydate?.length || 0;
    let fromDate = moment(this.state.fromDate);
    let toDate = moment(this.state.toDate);
    if (fromDate.isSameOrBefore(toDate)) {
      let currentDate = moment(fromDate).startOf('month');
      let lastDayOfMonth = moment(fromDate).endOf('month');
      let remainingDaysCount = 0;
      while (currentDate.isSameOrBefore(lastDayOfMonth)) {
        if (currentDate.day() !== 0) {
          if (currentDate.day() === 6 && this.state.jobTitle === "Senior") {
            // Exclude Saturdays for senior employees
          } else {
            if (currentDate.isBetween(fromDate, toDate, null, '[]')) {
              remainingDaysCount++;
              if (currentDate.day() === 6 && this.state.jobTitle === "Junior") {
                // Include Saturdays for junior employees
              }
            }
          }
        }
        currentDate.add(1, 'day');
      }
      let workingdays = remainingDaysCount - count
      this.setState({ workingday: workingdays });
      console.log("Remaining days count:", workingdays);
    } else {
      console.log("Invalid date range: 'fromDate' is after 'toDate'.");
    }
    this.setState({ approvedDays: approvedDays })
    console.log("approvedDays", approvedDays)
    destroyDataTable("reporttable")
    // destroyDataTable("staffTable1")
    destroyDataTable("teamTimesheet-export")
    this.setState({});
    console.log(this.state.TeamListData)
    this.callDataTable("reporttable", this.state.groupColumn);
    this.calcTotalEfforts();
    this.calcEfforts();
    //this.loadDefaultDates(1);
  }
  private callDataTable(tableId: string, groupBy: string) {
    if ($('#pending').hasClass('active')) {
      var colspan1 = 3;
      var colspan2 = 2;
    } else if ($('#all').hasClass('active')) {
      var colspan1 = (groupBy == "5") ? 4 : 3;
      var colspan2 = (groupBy == "5") ? 2 : 3;
    }
    let groupColumn = groupBy ? parseInt(groupBy) : -1;
    if (groupColumn >= 0) {
      applyDataTableGroupBy(tableId, parseInt(groupBy), 4, colspan1, colspan2);
    } else {
      applyDataTable(tableId);
    }
  }
  private async loadDefaultDates(option) {
    let opt = option;
    //let opt = $('#daterange').val();
    //let opt = this.state.dateRange;
    const now = moment();
    switch (opt) {
      case "1":
        //Today
        let today = now.format("YYYY-MM-DD");
        this.setState({
          fromDate: today ? today : "",
          toDate: today ? today : ""
        });
        break;
      case "2":
        //Today
        let change = this.state.fromDate;
        this.setState({
          fromDate: change ? change : "",
          toDate: change ? change : ""
        });
        break;

    }
  }
  //filter
  private hideSearch = () => {
    $("#search-filter").css("display", "none");
    $("#search-filter1").css("display", "none");
    $("#hide-search").css("display", "none");
    $("#show-search").css("display", "flex");
  }
  private showSearch = () => {
    //this.setState({toDate: moment().format("YYYY-MM-DD")});
    //$("#toDate").val(moment().format("YYYY-MM-DD"));   
    $("#search-filter").css("display", "flex");
    $("#search-filter1").css("display", "flex");
    $("#hide-search").css("display", "flex");
    $("#show-search").css("display", "none");
  }
  private getPeople = async (items) => {
    let value = items[0]?.id
    let name = items[0]?.text;
    console.log(items, "people");
    if (items.length > 0) {
     this.setState({ PeopleId: value, ename: name }, () => {
        this.report();
      })
    }
    else {
      this.setState({ PeopleId: 0 },()=>{
        this.report();
      })

    }
   
  }
  private handleHRdatechange = (event) => {
    const nodeName = event.target.name;
    this.state[nodeName] = event.target.value;
    this.setState({ date: nodeName,defaultDate:nodeName,fromDate:nodeName });
    this.loadDefaultDates("2");
    this.report();
  }
  private handleClear = async () => {
    //$('#fromDate').val(null).trigger("change");
    this.setState({ename:"",workingday:0,approved:0,approvedDays:0,approvedleaves:0,submittedDays:0,date:0,defaultDate:""})
    // $('#projectName3').val(null).trigger("change");
    this.setState({ project: [], dateRange: 0, statusFilter: "", groupColumn: "", changeYear: "" });
    //await this.loadDefaultDates("0");
    //this.state.isPending ? this.getPendingTimesheets(): this.getAllTimesheets();
  }

  private async calendar() {
    $(".hide-show-search").hide();
    $('#Pendingshow').hide();
    $('#Allshow').hide();
    $('#myTabContent').hide();
    $("#calendar").show();
    $(".fc-prev-button").removeClass("fc-button fc-button-primary");
    $(".fc-prev-button").addClass("fc-new");
    $(".fc-today-button").removeClass("fc-button fc-button-primary");
    $(".fc-new").css("background-color", "#226eb7");
    $(".fc-today-button").css("background-color", "#226eb7");
    $(".fc-today-button").removeAttr("disabled");
    $(".fc-today-button").css("color", "#fff");
    $(".fc-next-button").removeClass("fc-button fc-button-primary");
    $(".fc-next-button").css("color", "#fff");
    $(".fc-prev-button").css("color", "#fff");
    $(".fc-next-button").addClass("fc-new");
    $(".fc-new").css("background-color", "#226eb7");
    $(".fc-button").on("click", function () {
      $(this).removeClass("fc-button fc-button-primary");
      $(this).removeAttr("disabled");
    });
    /*   let startdate = moment(this.state.fromDate).format("YYYY-MM-DD");
      let Enddate = moment(this.state.toDate).format("YYYY-MM-DD");
      var arr = [];
      var filter = "";
      if (filter == "") {
       //filter = `ResourceId eq ${PeopleId} and month(Date) eq ${moment(fromDate).month() + 1} and year(Date) eq ${moment(fromDate).year()}`;
       filter = `ResourceId eq ${this.state.PeopleId} and ${startdate} && date <= ${Enddate} `;
      } */
    let startdate = moment(this.state.fromDate).toISOString();
    let Enddate = moment(this.state.toDate).toISOString();
    var arr = [];
    var filter = "";
    if (filter == "") {
      filter = `ResourceId eq '${this.state.PeopleId}' and Date ge '${startdate}' and Date le '${Enddate}'`;
    }
    //const urlParams = new URLSearchParams(window.location.search.toLocaleLowerCase());
    var _select = [{ fieldType: null, key: '*,Resource/Title,TaskType/Title,FieldValuesAsText/TaskDescription' }];
    var _expand = ["Resource,TaskType,FieldValuesAsText"];
    var _orderby = `Date`;
    var _filter = `${filter}`;
    var _Timesheet = `Timesheet`;
    const teamListResult1 = await this._spservice.getPagedListItems(_Timesheet, _select, _filter, _orderby, _expand);
    var pendingData = teamListResult1;
    console.log(pendingData)
    let uniqueDates = [];
    pendingData.forEach(item => {
      if (item.hasOwnProperty('Date')) {
        let date = moment(item.Date).format("YYYY-MM-DD");
        if (date >= this.state.fromDate && date <= this.state.toDate) {
          uniqueDates.push(item)
        }
      }
    });
    console.log(uniqueDates, "uniqueDate")
    uniqueDates.map((item) => {
      let Project;
      this.state.ProjectList.map(proitem => {
        if (proitem.Id == item.ProjectID) {
          Project = proitem.Title;
        }
      })
      let Description = item.TaskDescription;
      arr.push({
        title: `${Project}: ${item.Effort}hours`,
        //title: `${item.Effort}hours`,
        name: item.Resource.Title,
        date: moment(item.Date).format("YYYY-MM-DD"),
        effort: item.Effort,
        task: item.TaskType.Title,
        project: Project,
        extendedProps: {
          description: Description
        }
      })
    })
    let leavefilter = "";
    /* this.state.staff.forEach((ele, index) => { */
    if (leavefilter == "") {
      /* if (index == 0) */
      leavefilter = `AuthorId eq ${this.state.PeopleId}`;
    }
    let url = `${this._spservice.rootSite}${this._spservice.rootURL}/LMS/_api/web/lists/getbytitle('Leaves')/items?$select=*,Author/Title&$expand=Author&$filter=${leavefilter}`;
    let leaveValue = await this._spservice.get(url);
    let leavedate = leaveValue.data.value;
    console.log(leavedate, "leavedate");
    let uniqueleave = [];
    leavedate?.forEach(item => {
      if (item.hasOwnProperty('StartDate') && (item.hasOwnProperty('EndDate'))) {
        let startdate = moment(item.StartDate).format("YYYY-MM-DD");
        let Enddate = moment(item.EndDate).format("YYYY-MM-DD");
        if (startdate >= this.state.fromDate && Enddate <= this.state.toDate) {
          uniqueleave.push(item)
        }
      }
    });
    console.log(leaveValue, "leavevalue")
    uniqueleave?.map((item) => {
      let leave, color;
      if (item.Status === "Approved") {
        leave = 'Leave - ' + item.Author.Title
        color = "#c2c6cc"
      } else {
        leave = 'Leave:Waiting for Approval - ' + item.Author.Title
        color = "#ff0000"
      }
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
        })
        var newDate = startDay.setDate(startDay.getDate() + 1);
        startDay = new Date(newDate);
      }
    })
    this.setState({ event: arr, calendarshow: true }, () => {

    })
  }
  handleMouseEnter = (info) => {
    tooltipInstance = info.event.extendedProps.description;
    let Name = info.event.extendedProps.name;
    let task = info.event.extendedProps.task;
    let effort = info.event.extendedProps.effort;
    let Project = info.event.extendedProps.project;
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
  private calcTotalEfforts() {
    let total = 0;
    // var efforts = document.getElementsByClassName("pendingefforts");
    // for (var i = 0; i < efforts.length; i++){	 
    //   total = +total + (+efforts[i].innerHTML);
    // }
    let efforts = this.state.TeamListData;
    for (var i = 0; i < efforts.length; i++) {
      // total = +total + (+efforts[i].Effort);
    }
    var decimalTimeString: any = total;
    var decimalTime = parseFloat(decimalTimeString);
    decimalTime = decimalTime * 60 * 60;
    var hours: any = Math.floor((decimalTime / (60 * 60)));
    decimalTime = decimalTime - (hours * 60 * 60);
    var minutes: any = Math.floor((decimalTime / 60));
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
    let totalefforts = hours + ':' + minutes;
    //$('#totalpendingefforts').text(totalefforts); //td total       
    $('#totalpendingefforts').text((total).toFixed(2)); //td total
  }
  private calcTotalAllEfforts() {
    let total = 0;
    // var efforts = document.getElementsByClassName("allefforts");
    // for (var i = 0; i < efforts.length; i++){	 
    //   total = +total + (+efforts[i].innerHTML);
    // }
    let efforts = this.state.TeamListData;
    for (var i = 0; i < efforts.length; i++) {
      total = +total + (+efforts[i].Effort);
    }
    var decimalTimeString: any = total;
    var decimalTime = parseFloat(decimalTimeString);
    decimalTime = decimalTime * 60 * 60;
    var hours: any = Math.floor((decimalTime / (60 * 60)));
    decimalTime = decimalTime - (hours * 60 * 60);
    var minutes: any = Math.floor((decimalTime / 60));
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
    let totalefforts = hours + ':' + minutes;
    //$('#totalallefforts').text(totalefforts); //td total       
    $('#totalallefforts').text((total).toFixed(2));
  }
  private calcEfforts() {
    let total = 0;
    // var efforts = document.getElementsByClassName("exportefforts");
    // for (var i = 0; i < efforts.length; i++){	 
    //   total = +total + (+efforts[i].innerHTML);
    // }
    let efforts = this.state.TeamListData;
    for (var i = 0; i < efforts.length; i++) {
      total = +total + (+efforts[i].Effort);
    }
    var decimalTimeString: any = total;
    var decimalTime = parseFloat(decimalTimeString);
    decimalTime = decimalTime * 60 * 60;
    var hours: any = Math.floor((decimalTime / (60 * 60)));
    decimalTime = decimalTime - (hours * 60 * 60);
    var minutes: any = Math.floor((decimalTime / 60));
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
    let totalefforts = hours + ':' + minutes;
    //$('#exporttotalefforts').text(totalefforts); //td total     
    $('#exporttotalefforts').text((total).toFixed(2));
  }
  private toggleLoader(IsShow: boolean) {
    if (IsShow)
      $('#loader').css("display", "block");
    else
      $('#loader').css("display", "none");
  }
  private getItemlist = async (index) => {
    document.getElementById("comments1").classList.remove("border-danger");

    var employeeListURL = `${this._spservice.absoluteUrl}/_api/web/lists/getbytitle('Timesheet')/items(${index})?$select=*,Resource/Title&$expand=Resource`
    const employeeListResult = await this._spservice.get(employeeListURL);
    $("#newDate1").val(`${this._spservice.moment(employeeListResult.data.Date).format("YYYY-MM-DD")}`);
    var listURL = `${this._spservice.rootSite}${this._spservice.rootURL}/_api/web/lists/getbytitle('${this.props.ProjectList}')/items(${employeeListResult.data.ProjectID})?$select=*,Client/Title&$expand=Client`;
    const listResult = await this._spservice.get(listURL);
    if (listResult.ok) {
      let clientname = listResult.data.ClientId ? '[' + listResult.data.Client.Title + '] ' : '';
      $("#projectName1").val(clientname + listResult.data.Title);
    }
    //$("#description1").val(employeeListResult.data.TaskDescription);
    ($('#description1') as any).summernote('disable');
    ($('#description1') as any).summernote('code', employeeListResult.data.TaskDescription);
    $("#efforts1").val(employeeListResult.data.Effort);
    $("#taskType1").val(employeeListResult.data.TaskTypeId);
    $("#update").val(employeeListResult.data.Id);
    $("#comments1").val(employeeListResult.data.Comments);
    $("h4#myCenterModalLabel").text(employeeListResult.data.Resource.Title ? employeeListResult.data.Resource.Title : "Employee Name");
    this.setState({ status: employeeListResult.data.Status ? employeeListResult.data.Status.toLowerCase() : "" })
  }
  public render(): React.ReactElement<IRecordProps> {
    const { TeamListData, ProjectList, TaskType, status, successMessage, alertMessage } = this.state
    return (
      <>
        <div id="loader"></div>
        <div className="content-page">
          <div className="content">
            <div className="container-fluid pl-0 pr-0"></div>
            <div className="row mb-2 add-bar" style={{ paddingBottom: "29px" }}>
              <div className="col-sm-12 col-md-12 float-left ml-4">
                <span style={{
                  color: "#000000", right: "10px",
                  top: "58px", fontSize: "20px", cursor: "pointer"
                }} onClick={(e) => this.handleHamBurger(0)}> &#9776; </span>
                <span className='pl-3' style={{ fontSize: "20px", fontWeight: "bold" }}>Report</span>
                {/* <button onClick={this.handleExcel} type="button" className="btn btn-primary waves-effect waves-light float-right" style={{ backgroundColor: "#226EB7", marginRight: "52px", minHeight: "42px", minWidth: "110px" }}>
                <i className="fa fa-download mr-2" />Export</button> */}
              </div>
            </div>

            <div className="row">
              <div className='row'>
                <ul className="nav nav-tabs" id="myTab" role="tablist" style={{ margin: "2px 0px 2px 39px", width: "96%" }}>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link show active" id="pending-tab" data-toggle="tab" data-target="#pending" type="button" role="tab" aria-controls="pending" aria-selected="true" onClick={() => { this.report(); this.ppl.state.selectedPersons = [] }}>Report</button>
                  </li>
                  {/*    <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="all-tab" data-toggle="tab" data-target="#all" type="button" role="tab" aria-controls="all" aria-selected="false" onClick={() => { this.getAllTimesheets(); this.ppl.state.selectedPersons = [] }}>All</button>
                </li> */}
                  {/*  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="all-tab" data-toggle="tab" data-target="#all" type="button" role="tab" aria-controls="all" aria-selected="false" onClick={this.calendar.bind(this)} >Calendar View</button>
                  </li> */}
                  <div className='hide-show-search'>
                    <div className='hide-search' id="hide-search" onClick={this.hideSearch}>Hide Search <i className="arrow-down"></i></div>
                    <div className='hide-search' id="show-search" style={{ display: "none" }} onClick={this.showSearch}>Show Search <i className="arrow-up"></i></div>
                  </div>
                </ul>
              </div>

              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab">
                  <div className="row" id="search-filter" style={{ display: "flex", margin: "10px", marginTop: "30px", paddingRight: "35px" }}>
                    <div className="col-sm-3 col-md-3" >
                      <label htmlFor="position" id="label">Employee Name</label>
                      {/* <div className="form-control"> */}
                      <PeoplePicker
                        context={this.props.context}
                        personSelectionLimit={1}
                        groupName={""} // Leave this blank in case you want to filter from all users
                        showtooltip={false}
                        required={false}
                        ensureUser={true}
                        showHiddenInUI={false}
                        principalTypes={[PrincipalType.User]}
                        onChange={this.getPeople}
                        resolveDelay={1000}
                        styles={this.pickerStylesSingle}
                        ref={c => (this.ppl = c)} />
                      {/* </div> */}
                    </div>
                    <div className="col-sm-3 col-md-3">
                      <label htmlFor="position" id="label">Month and Year</label>
                      <input
                        className='form-control datepicker place-holder'
                        type="month"
                        id="fromDate"
                        name="fromDate"
                        value={this.state.defaultDate}
                        onChange={this.handleHRdatechange}
                      />
                      {/* <span style={{ color: "#D8000C" }}>{this.state.errorMessageToDate || null}</span> */}
                    </div>
                    <div className='col-sm-3 col-md-3'></div>
                    <div className="col-sm-3 col-md-3">
                      <button type="button" className="btn waves-effect waves-light  float-right" style={{ width: "70%", height: "100%", color: "#226EB7", border: "1px solid" }} onClick={() => { this.ppl.state.selectedPersons = []; this.handleClear() }}><i className="fa fa-undo mr-1" /> Reset</button>
                    </div>
                  </div>
                  <div className="row" id='Pendingshow'>
                    <div className="col-xl-12">
                      <div className="card-box bg-trans">
                        <div className="row pt-1">
                          {/* <div className="col-xs-6 col-md-6 pl-4">
                            <span className="pl-4" style={{ fontWeight: "800", color: "#958F8F", fontSize: "13px" }}>{TeamListData.length ? `${TeamListData.length} Items Found` : "0 Items Found"}</span>
                            {/* <span className="pl-4" style={{ color: "#958F8F" }}>{EmployeeList.length ? `${EmployeeList.length} Items` : "0 Items"}</span> 
                </div> */}
                        </div>
                        <div className="table-responsive pt-3 ml-2" style={{ cursor: "pointer", padding: "0px 26px 0px 30px" }}>
                          <table id="reporttable" className="table table-hover product_table">
                            <thead>
                              <tr className="table-active">
                                <th>Employee Name</th>
                                <th>Month and Year</th>
                                <th>Working Days</th>
                                <th>Submitted Days</th>
                                <th>Approved</th>
                                <th>Applied Leaves</th>
                                <th>Approved Leaves</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{this.state.ename}</td>
                                <td onClick={this.calendar.bind(this)}>
                                  {this.state.date ? moment(this.state.date).format("MMM YY") : ""}
                                </td>
                                <td>{this.state.workingday}</td>
                                <td>{this.state.submittedDays}</td>
                                <td>{this.state.approvedDays}</td>
                                <td>{this.state.approvedleaves}</td>
                                <td>{this.state.approved}</td>
                              </tr>
                            </tbody>
                            {/*  <tfoot>
                            <tr>
                              <td></td>
                              <td></td>
                              <td style={{ fontWeight: "bold" }}>{TeamListData.length ? "Total Efforts: " : ""}</td>
                              <td></td>
                              <td style={{ fontWeight: "bold" }}>{TeamListData.length ? <span id="totalpendingefforts"></span> : null}</td>
                              <td></td>
                            </tr>
                          </tfoot> */}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div >
        {this.state.fromDate !== "" && this.state.ename !== "" && this.state.calendarshow === true && (
          <div id='calendar' style={{ padding: "2.2%" }}>
            <div className='demo-app'>
              <div className='demo-app-main'>
                <a href={this.props.context.pageContext.web.absoluteUrl + "/Pages/Record.aspx"} style={{ backgroundColor: "#007bff", fontWeight: "bold", paddingLeft: "30px", paddingRight: "30px", paddingTop: "8px", paddingBottom: "8px", display: "inline-block", textDecoration: "none", color: "white", borderRadius: "4px", border: "none" }}>Back</a>
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  headerToolbar={{
                    left: '',
                    center: 'title',
                    right: ''
                  }}
                  initialView='dayGridMonth'
                  initialDate={this.state.fromDate || '2023-01-02'}
                  eventMouseEnter={this.handleMouseEnter}
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  events={this.state.event}
                />
              </div>
            </div>
          </div>
        )}

      </>
    );
  }
}
