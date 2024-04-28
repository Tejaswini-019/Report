/// <reference types="jquery" />
import { IHttpClientResponse } from '../models/IHttpClientResponse';
import { IValidationField } from '../models/IValidationField';
import { IValidationResult } from '../models/IValidationResult';
import { Date } from './types';
/** utility function to check null or undefined */
export declare const isNullOrUndefined: (value: any) => boolean;
/** utility function to check null or empty */
export declare const isNullOrEmpty: (value: any) => boolean;
/** utility function to check null or empty or undefined*/
export declare const isNullOrUndefinedOrEmpty: (value: any) => boolean;
/** utility function to check obj having property */
export declare const getProperty: (obj: any, prop: string) => any;
export declare function toLocaleLongDateString(date: Date): string;
export declare function toLocaleShortDateString(date: Date): string;
export declare function pad(value: string, length: number, valueToAppend: string): string;
export declare function isObjectsEqual(o1: any, o2: any): boolean;
export declare function isArrayObjectsEqual(a1: any[], a2: any[]): boolean;
export declare function getDate(format?: string, action?: Date.Action, unit?: Date.Unit, amount?: number): string;
export declare function findIndex(items: any[], key: string, value: string): number;
export declare function getObjectFromArray(arr: any[], key: string, value: string): any;
export declare function isTwoArraySame(arr1: string[] | number[], arr2: string[] | number[]): boolean;
export declare function error(res: IHttpClientResponse, webpartName: string, showAlert?: boolean): void;
/**
 * Adds a value to a date
 *
 * @param date The date to which we will add units, done in local time
 * @param interval The name of the interval to add, one of: ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second']
 * @param units The amount to add to date of the given interval
 *
 * http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
 */
export declare function dateAdd(date: any, interval: any, units: any): Date;
/**
 * Get the local file as an array buffer.
 *@param fileElementId String that specifies the element ID.
*/
export declare function getFileBuffer(fileElementId: string): JQueryPromise<unknown>;
/**
 * @param {string} latitude
 * @param {string} longitude
 * @returns
 * @memberof spservices
 */
export declare function getGeoLocationName(latitude: number, longitude: number): Promise<any>;
/**
 * Get the generated column from sp fields result for datatable.
 *@param fieldResult Sharepoint fields result.
*/
export declare function generateDataTableColumn(fieldResult: any[]): any[];
export declare function validateFields(fields: IValidationField[], highlightInvalidBorder?: boolean): IValidationResult;
export declare function validURL(url: string): boolean;
export declare function initiateSlickPagination(sliderElemID: string, sliderContent: string): void;
export declare function navigate_to_next_slide(sliderID: any, sliderContent: any): void;
export declare function navigate_to_prev_slide(sliderID: any, sliderContent: any): void;
export declare function get_total_no_of_slides(sliderID: any, sliderContent: any): void;
export declare function after_slider_change(sliderID: any, sliderContent: any): void;
export declare function btnLoader(btn: string, bindLoader: boolean, otherBtnsToDisable?: string[]): void;
export declare function getSPIcon(extension: string, title?: string, isFolder?: boolean): {
    html: string;
    icon: string;
};
export declare function downloadBlob(blob: Blob, filename: string): HTMLAnchorElement;
export declare function validateWebpartProps(props: any): boolean;
//# sourceMappingURL=utilities.d.ts.map