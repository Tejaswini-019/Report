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
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'TeamTimesheetWebPartStrings';
import TeamTimesheet from './components/TeamTimesheet';
var TeamTimesheetWebPart = /** @class */ (function (_super) {
    __extends(TeamTimesheetWebPart, _super);
    function TeamTimesheetWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeamTimesheetWebPart.prototype.render = function () {
        var element = React.createElement(TeamTimesheet, {
            context: this.context,
            description: this.properties.description,
            // TeamList: this.properties.TeamList,
            EmployeeList: this.properties.EmployeeList,
            ClientList: this.properties.ClientList,
            ProjectList: this.properties.ProjectList,
            TaskType: this.properties.TaskType,
            Leaves: this.properties.Leaves,
            // TaskDescription: this.properties.TaskDescription,
            adminGroup: this.properties.adminGroup,
            hrGroup: this.properties.hrGroup
        });
        ReactDom.render(element, this.domElement);
    };
    TeamTimesheetWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(TeamTimesheetWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    TeamTimesheetWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                }),
                                // PropertyPaneTextField('TeamList', {
                                //   label: "Team List",
                                //   value: "Managers"
                                // }),
                                PropertyPaneTextField('EmployeeList', {
                                    label: 'Timesheet List',
                                    value: 'Timesheet'
                                }),
                                // PropertyPaneTextField('TaskDescription', {
                                //   label: 'TaskDescription Library Internal Name',
                                //   value: 'TaskDescription'
                                // }), 
                                PropertyPaneTextField('ClientList', {
                                    label: 'Client List',
                                    value: 'Clients'
                                }),
                                PropertyPaneTextField('ProjectList', {
                                    label: 'Project List',
                                    value: 'Projects'
                                }),
                                PropertyPaneTextField('TaskType', {
                                    label: 'Task Type',
                                    value: 'TaskType'
                                }),
                                PropertyPaneTextField('adminGroup', {
                                    label: 'Admin Group Name',
                                    value: 'QT Portal Admin'
                                }),
                                PropertyPaneTextField('hrGroup', {
                                    label: 'HR Group Name',
                                    value: 'HR' //'Human Resource (HR)'
                                }),
                                PropertyPaneTextField('Leaves', {
                                    label: "Leaves",
                                    value: "Leaves"
                                }),
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return TeamTimesheetWebPart;
}(BaseClientSideWebPart));
export default TeamTimesheetWebPart;
//# sourceMappingURL=TeamTimesheetWebPart.js.map