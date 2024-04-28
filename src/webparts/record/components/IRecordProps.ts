import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IRecordProps {
  description: string;
  adminGroup: string;
  hrGroup: string;
  context:WebPartContext;
  EmployeeList: string;
  EmployeeLMS:string;
  ClientList: string;
  ProjectList: string;
  TaskType: string;
  // TeamList: string;
  Leaves:string;
}
