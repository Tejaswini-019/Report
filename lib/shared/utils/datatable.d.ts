import 'bootstrap/dist/css/bootstrap.css';
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net/js/jquery.dataTables.min.js";
export declare function clearDataTable(tableId: string): void;
export declare function destroyDataTable(tableId: string): void;
export declare function orderingSingleColumn(tableId: string): void;
export declare function orderingMultipleColumn(tableId: string): void;
export declare function applyDataTableNoPagingFilter(tableId: string): Promise<any>;
/**
   * @param {string} tableId
   * @param {any[]} columns
   * @param {any[]} rows
   * @returns
   * @memberof spservices
   */
export declare function applyDataTableGroupBy(tableId: string, groupColumn: number, effortColumn: number, colspan1: number, colspan2: number): Promise<any>;
export declare function applyDataTable(tableId: string, rows?: any[], columns?: any[], searchElemId?: string, pageLenSelectElem?: string, searchBtnElemId?: string): Promise<any>;
//# sourceMappingURL=datatable.d.ts.map