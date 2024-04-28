import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'RecordWebPartStrings';
import Record from './components/Record';
import { IRecordProps } from './components/IRecordProps';

export interface IRecordWebPartProps {
  Leaves: string;
  TaskType: string;
  ProjectList: string;
  ClientList: string;
  EmployeeList: string;
  description: string;
  EmployeeLMS:string;
}

export default class RecordWebPart extends BaseClientSideWebPart<IRecordWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRecordProps> = React.createElement(
      Record,
      {
        context: this.context,
        description: this.properties.description,
        EmployeeList: this.properties.EmployeeList,
        EmployeeLMS:this.properties.EmployeeLMS,
        ClientList: this.properties.ClientList,
        ProjectList: this.properties.ProjectList,
        TaskType: this.properties.TaskType,
        // TeamList: this.properties.TeamList,
        Leaves:this.properties.Leaves,

      }
    );

    ReactDom.render(element, this.domElement);
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                  value: 'HR'//'Human Resource (HR)'
                }),
                PropertyPaneTextField('Leaves', {
                  label: "Leaves",
                  value: "Leaves"
                }),
                PropertyPaneTextField('EmployeeLMS', {
                  label: "Employee LMS",
                  value: "LMS"
                }),                          
              ]
            }
          ]
        }
      ]
    };
  }
}
