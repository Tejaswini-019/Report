import * as $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net/js/jquery.dataTables.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-buttons/js/dataTables.buttons.min.js";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
// (window as any).pdfMake = require("pdfmake");
// (window as any).pdfFonts = require("pdfmake/build/vfs_fonts");
// (window as any).pdfMake.vfs = (window as any).pdfFonts.pdfMake.vfs;
window.JSZip = require('jszip');
require("../js/FileSaver.js");
export function downloadWithGroupBy(tableId, groupColumn, effortColumn, colspan1, colspan2, data, columns, fileName, exportFormat, title, topMessage, searchElemId, searchBtnElemId) {
    if (title === void 0) { title = ""; }
    if (topMessage === void 0) { topMessage = ""; }
    if (searchElemId === void 0) { searchElemId = ""; }
    if (searchBtnElemId === void 0) { searchBtnElemId = ""; }
    try {
        var table_1;
        table_1 = $('#' + tableId).DataTable({
            dom: 'Bfrtip',
            bDestroy: true,
            searching: true,
            paging: false,
            ordering: true,
            info: false,
            // "columnDefs"  : [
            //   { "visible": false, "targets": groupColumn }
            // ],      
            order: [[0, 'asc'], [groupColumn, 'asc']],
            // "drawCallback": function ( settings ) {
            //   var api   = this.api();
            //   var rows  = api.rows( {page:'current'} ).nodes();
            //   var last  = null;     
            //   var sum   = 0; 
            //   api.column(groupColumn, {page:'current'} ).data().each( function ( group, i ) {
            //     if ( last !== group ) {
            //       api.rows().data().each( function(item){
            //         if (item[groupColumn] == group){
            //           sum = sum + (+item[effortColumn]);
            //         }
            //       });
            //       $(rows).eq( i ).before(
            //         '<tr class="group"><td colspan="'+colspan1+'" style="background-color: #e7e7e7;"><b>'+group+'</b></td><td colspan="'+colspan2+'" style="background-color: #e7e7e7;"><b>'+ sum.toFixed(2) +'</b></td></tr>'
            //       );
            //       last = group;
            //       sum  = 0;
            //     }
            //   });
            // },
            buttons: [
                {
                    extend: 'excel',
                    footer: true,
                    filename: fileName,
                    title: title,
                    messageTop: topMessage,
                },
                {
                    extend: 'pdf',
                    footer: true,
                    title: title,
                    messageTop: topMessage
                },
                {
                    extend: 'copy',
                    footer: true,
                    title: title,
                    messageTop: topMessage
                },
                {
                    extend: 'print',
                    footer: true,
                    title: title,
                    messageTop: topMessage
                },
                {
                    extend: 'csv',
                    footer: true,
                    title: title,
                    messageTop: topMessage
                }
            ]
        });
        if (searchElemId != "") {
            $("#" + tableId + "_wrapper .dataTables_filter").hide();
            //pay attention to capital D, which is mandatory to retrieve "api" datatables' object, as @Lionel said
            if (searchBtnElemId == "") {
                $('#' + searchElemId).keyup(function (event) {
                    if (event.which == 13) {
                        event.preventDefault();
                    }
                    else {
                        table_1.search($(this).val()).draw();
                    }
                });
            }
            else {
                var val = $('#' + searchElemId).val();
                table_1.search(val).draw();
            }
        }
        $("#" + tableId + "_wrapper").hide();
        var config = {
            filename: fileName,
            title: title,
            message: topMessage,
            download: 'download',
            pageSize: 'A4',
            orientation: 'landscape',
            header: columns.map(function (c) { return c.title; }),
            fields: columns.map(function (d) { return d.data; })
        };
        switch (exportFormat) {
            case "excel":
                $('#' + tableId).DataTable().button('.buttons-excel').trigger();
                break;
            case "word":
                $.fn.DataTable.Export.word(table_1, config);
                break;
            case "pdf":
                //($ as any).fn.DataTable.Export.pdf(table, config);
                $('#' + tableId).DataTable().button('.buttons-pdf').trigger();
                break;
        }
    }
    catch (ex) {
        console.error("Error while exporting data:- " + ex.message);
    }
}
export function download(tableId, data, columns, fileName, exportFormat, title, topMessage, searchElemId, searchBtnElemId) {
    if (title === void 0) { title = ""; }
    if (topMessage === void 0) { topMessage = ""; }
    if (searchElemId === void 0) { searchElemId = ""; }
    if (searchBtnElemId === void 0) { searchBtnElemId = ""; }
    try {
        var table_2;
        table_2 = $('#' + tableId).DataTable({
            dom: 'Bfrtip',
            bDestroy: true,
            searching: true,
            //data : data,
            paging: false,
            ordering: true,
            info: false,
            order: [[0, 'asc']],
            //scrollX: true,
            //columns: columns,
            buttons: [
                {
                    extend: 'excel',
                    footer: true,
                    filename: fileName,
                    title: title,
                    messageTop: topMessage
                },
                {
                    extend: 'pdf',
                    footer: true,
                    title: title,
                    messageTop: topMessage
                },
                {
                    extend: 'copy',
                    footer: true,
                    title: title,
                    messageTop: topMessage
                },
                {
                    extend: 'print',
                    footer: true,
                    title: title,
                    messageTop: topMessage
                },
                {
                    extend: 'csv',
                    footer: true,
                    title: title,
                    messageTop: topMessage
                }
            ]
        });
        if (searchElemId != "") {
            $("#" + tableId + "_wrapper .dataTables_filter").hide();
            //pay attention to capital D, which is mandatory to retrieve "api" datatables' object, as @Lionel said
            if (searchBtnElemId == "") {
                $('#' + searchElemId).keyup(function (event) {
                    if (event.which == 13) {
                        event.preventDefault();
                    }
                    else {
                        table_2.search($(this).val()).draw();
                    }
                });
            }
            else {
                // $('#' + searchBtnElemId).on('click', function () {
                //   var val = $('#' + searchElemId).val();
                //   table.search(val).draw();
                // });
                var val = $('#' + searchElemId).val();
                table_2.search(val).draw();
            }
        }
        $("#" + tableId + "_wrapper").hide();
        var config = {
            filename: fileName,
            title: title,
            message: topMessage,
            download: 'download',
            pageSize: 'A4',
            orientation: 'landscape',
            header: columns.map(function (c) { return c.title; }),
            fields: columns.map(function (d) { return d.data; })
        };
        switch (exportFormat) {
            case "excel":
                $('#' + tableId).DataTable().button('.buttons-excel').trigger();
                break;
            case "word":
                $.fn.DataTable.Export.word(table_2, config);
                break;
            case "pdf":
                //($ as any).fn.DataTable.Export.pdf(table, config);
                $('#' + tableId).DataTable().button('.buttons-pdf').trigger();
                break;
        }
        //(<any>$).fn.DataTable.Export.word(dt, config);
        //(<any>$).fn.DataTable.Export.excel(dt, config);
        //(<any>$).fn.DataTable.Export.csv(dt, config);
        //(<any>$).fn.DataTable.Export.pdf(dt, config);
    }
    catch (ex) {
        console.error("Error while exporting data:- " + ex.message);
    }
}
//# sourceMappingURL=datatable-export.js.map