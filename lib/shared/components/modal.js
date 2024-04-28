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
var BSModal = /** @class */ (function (_super) {
    __extends(BSModal, _super);
    function BSModal(props) {
        return _super.call(this, props) || this;
    }
    BSModal.prototype.componentDidUpdate = function () {
        this.handleModelShow();
    };
    BSModal.prototype.componentDidMount = function () {
        var __this = this;
        $("#customModal").on("hidden.bs.modal", function () {
            __this.props.onCloseModal();
        });
        this.handleModelShow();
    };
    BSModal.prototype.handleModelShow = function () {
        if (this.props.display)
            $("#customModal").modal('show');
        else
            $("#customModal").modal('hide');
    };
    BSModal.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "modal fade", id: "customModal", tabIndex: -1, role: "dialog", "data-backdrop": (this.props.backdrop == undefined || !this.props.backdrop) ? true : "static", "aria-labelledby": "exampleModalLabel", "aria-hidden": "true" },
                React.createElement("div", { className: "modal-dialog", role: "document" },
                    React.createElement("div", { className: "modal-content" },
                        React.createElement("div", { className: "modal-header" },
                            React.createElement("h5", { className: "modal-title", id: "exampleModalLabel" }, this.props.title),
                            React.createElement("button", { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                                React.createElement("span", { "aria-hidden": "true" }, "\u00D7"))),
                        React.createElement("div", { className: "modal-body" },
                            React.createElement("div", { dangerouslySetInnerHTML: { __html: this.props.html } })),
                        React.createElement("div", { className: "modal-footer" },
                            React.createElement("button", { type: "button", id: "bs-cancel", className: "btn btn-secondary", "data-dismiss": "modal", onClick: this.props.onCancelBtnClick }, "Close"),
                            (this.props.hideSaveBtn) ? null :
                                React.createElement("button", { type: "button", id: "bs-save", className: "btn btn-primary", onClick: this.props.onSaveBtnClick }, (this.props.footerSaveBtnName == undefined) ? "Save Changes" : this.props.footerSaveBtnName)))))));
    };
    return BSModal;
}(React.Component));
export default BSModal;
//# sourceMappingURL=modal.js.map