var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net/js/jquery.dataTables.min.js";
export function clearDataTable(tableId) {
    if ($.fn.dataTable.isDataTable('#' + tableId)) {
        var table = $('#' + tableId).DataTable();
        table
            .clear()
            .draw();
    }
}
export function destroyDataTable(tableId) {
    if ($.fn.dataTable.isDataTable('#' + tableId)) {
        var table = $('#' + tableId).DataTable();
        table.destroy();
    }
}
export function orderingSingleColumn(tableId) {
    if ($.fn.dataTable.isDataTable('#' + tableId)) {
        var table = $('#' + tableId).DataTable();
        // Sort by column 1 and then re-draw
        table
            .order([0, 'asc'])
            .draw();
    }
}
export function orderingMultipleColumn(tableId) {
    if ($.fn.dataTable.isDataTable('#' + tableId)) {
        var table = $('#' + tableId).DataTable();
        // Sort by columns 1 and 2 and redraw
        table
            .order([1, 'asc'], [2, 'asc'])
            .draw();
    }
}
export function applyDataTableNoPagingFilter(tableId) {
    return __awaiter(this, void 0, void 0, function () {
        var oTable;
        return __generator(this, function (_a) {
            try {
                oTable = void 0;
                oTable = $('#' + tableId).DataTable({
                    "bDestroy": true,
                    "responsive": true,
                    "autoWidth": true,
                    "bInfo": false,
                    "bLengthChange": false,
                    "bFilter": false,
                    "bPaginate": false,
                    "language": {
                        paginate: {
                            "next": '<i class="fa fa-angle-right" aria-hidden="true"></i>',
                            "previous": '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                            "first": '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
                            "last": '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
                        }
                    },
                });
            }
            catch (error) {
                return [2 /*return*/, error];
            }
            return [2 /*return*/];
        });
    });
}
/**
   * @param {string} tableId
   * @param {any[]} columns
   * @param {any[]} rows
   * @returns
   * @memberof spservices
   */
export function applyDataTableGroupBy(tableId, groupColumn, effortColumn, colspan1, colspan2) {
    return __awaiter(this, void 0, void 0, function () {
        var oTable;
        return __generator(this, function (_a) {
            try {
                oTable = void 0;
                oTable = $('#' + tableId).DataTable({
                    "bDestroy": true,
                    "bInfo": false,
                    "oLanguage": {
                        "sLengthMenu": "_MENU_ Per page",
                    },
                    "columnDefs": [
                        { "visible": false, "targets": groupColumn }
                    ],
                    "order": [[groupColumn, 'asc']],
                    "drawCallback": function (settings) {
                        var api = this.api();
                        var rows = api.rows({ page: 'current' }).nodes();
                        var last = null;
                        var sum = 0;
                        api.column(groupColumn, { page: 'current' }).data().each(function (group, i) {
                            if (last !== group) {
                                api.rows().data().each(function (item) {
                                    if (item[groupColumn] == group) {
                                        sum = sum + (+item[effortColumn]);
                                    }
                                });
                                $(rows).eq(i).before('<tr class="group"><td colspan="' + colspan1 + '" style="background-color: #e7e7e7;"><b>' + group + '</b></td><td colspan="' + colspan2 + '" style="background-color: #e7e7e7;"><b>' + sum.toFixed(2) + '</b></td></tr>');
                                last = group;
                                sum = 0;
                            }
                        });
                    }
                });
            }
            catch (error) {
                return [2 /*return*/, error];
            }
            return [2 /*return*/];
        });
    });
}
export function applyDataTable(tableId, rows, columns, searchElemId, pageLenSelectElem, searchBtnElemId) {
    if (rows === void 0) { rows = []; }
    if (columns === void 0) { columns = []; }
    if (searchElemId === void 0) { searchElemId = ""; }
    if (pageLenSelectElem === void 0) { pageLenSelectElem = ""; }
    if (searchBtnElemId === void 0) { searchBtnElemId = ""; }
    return __awaiter(this, void 0, void 0, function () {
        var oTable_1;
        return __generator(this, function (_a) {
            try {
                if (columns.length > 0) {
                    debugger;
                    oTable_1 = $('#' + tableId).DataTable({
                        "bDestroy": true,
                        "responsive": true,
                        "autoWidth": true,
                        "bInfo": false,
                        "bLengthChange": false,
                        "bFilter": false,
                        "oLanguage": {
                            "sLengthMenu": "_MENU_ Per page",
                        },
                        "order": [],
                        //"scrollX": true,
                        "language": {
                            paginate: {
                                "next": '<span>NEXT <i class="fa fa-arrow-right"></i></span>',
                                "previous": '<span><i class="fa fa-arrow-left"></i> PREV</span>',
                                "first": '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
                                "last": '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
                            }
                        },
                        //searching: searchElemId == "" ? true : false,
                        data: rows,
                        columns: columns
                    });
                }
                else if (rows.length > 0) {
                    oTable_1 = $('#' + tableId).DataTable({
                        "bDestroy": true,
                        "responsive": true,
                        "autoWidth": true,
                        "bInfo": false,
                        "bLengthChange": false,
                        "bFilter": false,
                        "oLanguage": {
                            "sLengthMenu": "_MENU_ Per page",
                        },
                        "order": [],
                        //"scrollX": true,
                        "language": {
                            paginate: {
                                "next": '<span>NEXT <i class="fa fa-arrow-right"></i></span>',
                                "previous": '<span><i class="fa fa-arrow-left"></i> PREV</span>',
                                "first": '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
                                "last": '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
                            }
                        },
                        //searching: searchElemId == "" ? true : false,
                        data: rows
                    });
                }
                else {
                    oTable_1 = $('#' + tableId).DataTable({
                        "bDestroy": true,
                        "responsive": true,
                        "autoWidth": true,
                        "bInfo": false,
                        "order": [],
                        "oLanguage": {
                            "sLengthMenu": "_MENU_ Per page",
                        },
                        //"scrollX": true,
                        //"bLengthChange": false,
                        //"bFilter": false,
                        "language": {
                            paginate: {
                                "next": '<span>NEXT <i class="fa fa-arrow-right"></i></span>',
                                "previous": '<span><i class="fa fa-arrow-left"></i> PREV</span>',
                                "first": '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
                                "last": '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
                            }
                        },
                    });
                }
                if (searchElemId != "") {
                    $("#" + tableId + "_wrapper .dataTables_filter").hide();
                    //pay attention to capital D, which is mandatory to retrieve "api" datatables' object, as @Lionel said
                    if (searchBtnElemId == "") {
                        $('#' + searchElemId).keyup(function (event) {
                            if (event.which == 13) {
                                event.preventDefault();
                            }
                            else {
                                oTable_1.search($(this).val()).draw();
                            }
                        });
                    }
                    else {
                        $('#' + searchBtnElemId).on('click', function () {
                            var val = $('#' + searchElemId).val();
                            oTable_1.search(val).draw();
                        });
                    }
                }
                if (pageLenSelectElem != "") {
                    $("#" + tableId + "_wrapper .dataTables_length").hide();
                    $('#' + pageLenSelectElem).on('change', function () {
                        var len = $(this).val();
                        oTable_1.page.len(len).draw();
                    });
                }
            }
            catch (error) {
                return [2 /*return*/, error];
            }
            return [2 /*return*/];
        });
    });
}
//# sourceMappingURL=datatable.js.map