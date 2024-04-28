import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface ITeamTimesheetWebPartProps {
    description: string;
    context: string;
    EmployeeList: string;
    ClientList: string;
    ProjectList: string;
    TaskType: string;
    adminGroup: string;
    hrGroup: string;
    Leaves: string;
}
export default class TeamTimesheetWebPart extends BaseClientSideWebPart<ITeamTimesheetWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=TeamTimesheetWebPart.d.ts.map