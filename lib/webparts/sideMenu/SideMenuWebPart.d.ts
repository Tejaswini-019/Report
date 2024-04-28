import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface ISideMenuWebPartProps {
    description: string;
    context: string;
    adminGroup: string;
    hrGroup: string;
}
export default class SideMenuWebPart extends BaseClientSideWebPart<ISideMenuWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=SideMenuWebPart.d.ts.map