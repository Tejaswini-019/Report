import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface ITeamTimesheetProps {
    description: string;
    context: WebPartContext;
    EmployeeList: string;
    ClientList: string;
    ProjectList: string;
    TaskType: string;
    adminGroup: string;
    hrGroup: string;
    Leaves: string;
}
//# sourceMappingURL=ITeamTimesheetProps.d.ts.map