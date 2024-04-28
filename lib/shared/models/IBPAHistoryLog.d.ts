import { IUser } from "./IUser";
export interface IBPAHistoryLog {
    CompanyCode?: any;
    Id?: number;
    Title?: string;
    RequestIDId?: number;
    Action?: String;
    ActionBy?: IUser;
    ActionById?: number;
    Timestamp?: string;
    Remarks?: string;
    IsActionByDelegatee?: boolean;
}
//# sourceMappingURL=IBPAHistoryLog.d.ts.map