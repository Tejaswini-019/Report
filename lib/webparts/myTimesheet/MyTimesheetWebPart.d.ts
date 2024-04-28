import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IMyTimesheetWebPartProps {
    description: string;
    context: string;
    EmployeeList: string;
    ClientList: string;
    ProjectList: string;
    TaskType: string;
    Leaves: string;
}
export default class MyTimesheetWebPart extends BaseClientSideWebPart<IMyTimesheetWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=MyTimesheetWebPart.d.ts.map