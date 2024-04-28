import { ISideMenuProps } from './ISideMenuProps';
import * as React from 'react';
export interface ISideMenuState {
    teamMembers: any[];
    profile: any;
    isAdmin: boolean;
    isHR: boolean;
    isManager: boolean;
    userMail: any;
}
export default class SideMenu extends React.Component<ISideMenuProps, ISideMenuState> {
    private _spservice;
    constructor(props: any);
    componentDidMount: () => void;
    componentDidUpdate: () => void;
    private getProfile;
    private checkPermission;
    private getManager;
    private getStaff;
    private handleHamBurger;
    render(): React.ReactElement<ISideMenuProps>;
}
//# sourceMappingURL=SideMenu.d.ts.map