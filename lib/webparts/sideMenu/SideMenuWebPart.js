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
import * as strings from 'SideMenuWebPartStrings';
import SideMenu from './components/SideMenu';
var SideMenuWebPart = /** @class */ (function (_super) {
    __extends(SideMenuWebPart, _super);
    function SideMenuWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SideMenuWebPart.prototype.render = function () {
        var element = React.createElement(SideMenu, {
            context: this.context,
            description: this.properties.description,
            // TeamList: this.properties.TeamList,
            adminGroup: this.properties.adminGroup,
            hrGroup: this.properties.hrGroup
        });
        ReactDom.render(element, this.domElement);
    };
    SideMenuWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(SideMenuWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    SideMenuWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                PropertyPaneTextField('adminGroup', {
                                    label: 'Admin Group Name',
                                    value: 'QT Portal Admin'
                                }),
                                PropertyPaneTextField('hrGroup', {
                                    label: 'HR Group Name',
                                    value: 'HR' //'Human Resource (HR)'
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return SideMenuWebPart;
}(BaseClientSideWebPart));
export default SideMenuWebPart;
//# sourceMappingURL=SideMenuWebPart.js.map