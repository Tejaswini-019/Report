import * as React from 'react';
export interface IModal {
    title: string;
    isOpen: boolean;
    body: string;
    backdrop?: boolean;
    hideSaveBtn?: boolean;
}
interface IBSModalProps {
    title: string;
    html: string;
    backdrop?: boolean;
    display: boolean;
    hideSaveBtn?: boolean;
    onSaveBtnClick?: () => void;
    onCancelBtnClick?: () => void;
    onCloseModal?: () => void;
    footerSaveBtnName?: string;
}
export default class BSModal extends React.Component<IBSModalProps, {}> {
    constructor(props: any);
    componentDidUpdate(): void;
    componentDidMount(): void;
    private handleModelShow;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=modal.d.ts.map