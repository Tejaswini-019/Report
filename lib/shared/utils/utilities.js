var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import * as moment from 'moment';
/** utility function to check null or undefined */
export var isNullOrUndefined = function (value) { return value === null || value === undefined; };
/** utility function to check null or empty */
export var isNullOrEmpty = function (value) { return value === null || value === ""; };
/** utility function to check null or empty or undefined*/
export var isNullOrUndefinedOrEmpty = function (value) { return isNullOrUndefined(value) || isNullOrEmpty(value); };
/** utility function to check obj having property */
export var getProperty = function (obj, prop) { return (!isNullOrEmpty(obj) && !isNullOrUndefined(obj)) ? obj.hasOwnProperty(prop) ? obj[prop] : "" : ""; };
export function toLocaleLongDateString(date) {
    return moment(date).format('LL');
}
export function toLocaleShortDateString(date) {
    return moment(date).format('ll');
}
export function pad(value, length, valueToAppend) {
    if (value.length < length) {
        var append = "";
        for (var index = 0; index < length; index++) {
            append += valueToAppend;
        }
        var s = append + value;
        var final = s.substr(s.length - length);
        return final;
    }
    else {
        return value;
    }
}
export function isObjectsEqual(o1, o2) {
    return (!isNullOrUndefined(o1) && !isNullOrUndefined(o1)) && typeof o1 === 'object' && Object.keys(o1).length > 0
        ? Object.keys(o1).length === Object.keys(o2).length
            && Object.keys(o1).every(function (p) { return isObjectsEqual(o1[p], o2[p]); })
        : o1 === o2;
}
export function isArrayObjectsEqual(a1, a2) {
    return a1.length === a2.length && a1.every(function (o, idx) { return isObjectsEqual(o, a2[idx]); });
}
export function getDate(format, action, unit, amount) {
    var m = moment();
    (action == "subtract") ? m.subtract(amount, unit) : m.add(amount, unit);
    return m.format(format);
}
export function findIndex(items, key, value) {
    var index = -1;
    items.some(function (el, i) {
        if (el[key] == value) {
            index = i;
            return true;
        }
    });
    return index;
}
export function getObjectFromArray(arr, key, value) {
    var object = {};
    arr.some(function (obj) {
        if (obj[key] == value) {
            object = __assign({}, obj);
            return true;
        }
    });
    return object;
}
export function isTwoArraySame(arr1, arr2) {
    if (arr1.length == arr2.length) {
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] == arr2[i]) {
                // do nothing
            }
            else {
                return false;
            }
        }
        // here you checked all array, you know that each element is
        // same, because if it wouldn't, it would return false already
        // so you can return true now
        return true;
    }
    else {
        return false;
    }
}
export function error(res, webpartName, showAlert) {
    if (showAlert === void 0) { showAlert = false; }
    if (!res.ok) {
        console.log(res);
        if (showAlert)
            alert(webpartName + ": " + res.error.message.value);
    }
}
/**
 * Adds a value to a date
 *
 * @param date The date to which we will add units, done in local time
 * @param interval The name of the interval to add, one of: ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second']
 * @param units The amount to add to date of the given interval
 *
 * http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
 */
export function dateAdd(date, interval, units) {
    var ret = new Date(date.toString()); // don't change original date
    switch (interval.toLowerCase()) {
        case "year":
            ret.setFullYear(ret.getFullYear() + units);
            break;
        case "quarter":
            ret.setMonth(ret.getMonth() + 3 * units);
            break;
        case "month":
            ret.setMonth(ret.getMonth() + units);
            break;
        case "week":
            ret.setDate(ret.getDate() + 7 * units);
            break;
        case "day":
            ret.setDate(ret.getDate() + units);
            break;
        case "hour":
            ret.setTime(ret.getTime() + units * 3600000);
            break;
        case "minute":
            ret.setTime(ret.getTime() + units * 60000);
            break;
        case "second":
            ret.setTime(ret.getTime() + units * 1000);
            break;
        default:
            ret = undefined;
            break;
    }
    return ret;
}
/**
 * Get the local file as an array buffer.
 *@param fileElementId String that specifies the element ID.
*/
export function getFileBuffer(fileElementId) {
    var fileInput = $('#' + fileElementId);
    var deferred = $.Deferred();
    var reader = new FileReader();
    reader.onloadend = function (e) {
        deferred.resolve(e.target.result);
    };
    reader.onerror = function (e) {
        deferred.reject(e.target.error);
    };
    reader.readAsArrayBuffer(fileInput[0].files[0]);
    return deferred.promise();
}
/**
 * @param {string} latitude
 * @param {string} longitude
 * @returns
 * @memberof spservices
 */
export function getGeoLocationName(latitude, longitude) {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, results, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    apiUrl = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + latitude + "&lon=" + longitude + "&zoom=18&addressdetails=1";
                    return [4 /*yield*/, $.ajax({
                            url: apiUrl,
                            type: 'GET',
                            dataType: 'json',
                            headers: {
                                'content-type': 'application/json;charset=utf-8',
                                'accept': 'application/json;odata=nometadata',
                            }
                        })];
                case 1:
                    results = _a.sent();
                    if (results) {
                        return [2 /*return*/, results];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, Promise.reject(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Get the generated column from sp fields result for datatable.
 *@param fieldResult Sharepoint fields result.
*/
export function generateDataTableColumn(fieldResult) {
    var columns = [];
    columns = fieldResult.map(function (field) {
        var obj = {
            title: field.Title,
            data: field.InternalName
        };
        return obj;
    });
    return columns;
}
export function validateFields(fields, highlightInvalidBorder) {
    if (highlightInvalidBorder === void 0) { highlightInvalidBorder = false; }
    var validFields = [];
    var inValidFields = [];
    var result = undefined;
    fields.forEach(function (field) {
        document.getElementById(field.Id).classList.remove("border-danger");
        if (field.Type == "text") {
            var textElem = document.getElementById(field.Id);
            isNullOrEmpty(textElem.value) || isNullOrUndefined(textElem.value) ? inValidFields.push(field) : validFields.push(field);
        }
        else if (field.Type == "file") {
            var fileElem = document.getElementById(field.Id);
            fileElem.files.length == 0 ? inValidFields.push(field) : validFields.push(field);
        }
        else if (field.Type == "url") {
            var urlElem = document.getElementById(field.Id);
            !validURL(urlElem.value) ? inValidFields.push(field) : validFields.push(field);
        }
        else if (field.Type == "select") {
            var selElem = document.getElementById(field.Id);
            (selElem.value == "0" || selElem.value == "-1") ? inValidFields.push(field) : validFields.push(field);
        }
    });
    result = {
        IsValid: inValidFields.length > 0 ? false : true,
        ValidFields: validFields,
        InValidFields: inValidFields
    };
    if (highlightInvalidBorder) {
        inValidFields.forEach(function (field) {
            document.getElementById(field.Id).classList.add("border-danger");
        });
    }
    return result;
}
export function validURL(url) {
    var expression = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
    var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
    //var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return expression.test(url) && urlregex.test(url) ? true : false;
}
export function initiateSlickPagination(sliderElemID, sliderContent) {
    // Selectors from HTML file
    var sliderID = $(sliderElemID);
    sliderContent = sliderContent;
    // slick carousel plugin initialize with options
    sliderID.find(sliderContent).not('.slick-initialized').slick();
    // call navigate to next slide function
    this.navigate_to_next_slide(sliderID, sliderContent);
    // call navigate to prev slide function
    this.navigate_to_prev_slide(sliderID, sliderContent);
    // call get total no of slides function
    this.get_total_no_of_slides(sliderID, sliderContent);
    // call after slider change function
    this.after_slider_change(sliderID, sliderContent);
}
export function navigate_to_next_slide(sliderID, sliderContent) {
    // click function
    sliderID.find('.slick-pag-next').on('click', function () {
        // go to next slide
        sliderID.find(sliderContent).slick('slickNext');
        // get the current slide
        var getCurrentSlide = sliderID.find(sliderContent).slick('slickCurrentSlide');
        // append the current slide
        sliderID.find('.slick-currentSlide').text(getCurrentSlide + 1);
    });
}
export function navigate_to_prev_slide(sliderID, sliderContent) {
    // click function
    sliderID.find('.slick-pag-prev').on('click', function () {
        // go to prev slide
        sliderID.find(sliderContent).slick('slickPrev');
        // get the current slide
        var getCurrentSlide = sliderID.find(sliderContent).slick('slickCurrentSlide');
        // append the current slide
        sliderID.find('.slick-currentSlide').text(getCurrentSlide + 1);
    });
}
export function get_total_no_of_slides(sliderID, sliderContent) {
    // get slick object
    var getSlideCount = sliderID.find(sliderContent).slick('getSlick');
    // append total number of slides
    sliderID.find('.slick-slideCount').text(getSlideCount.slideCount);
}
export function after_slider_change(sliderID, sliderContent) {
    // On after slide change
    sliderID.find(sliderContent).on('afterChange', function (event, slick, currentSlide, nextSlide) {
        // append the current slide
        sliderID.find('.slick-currentSlide').text(currentSlide + 1);
    });
}
var prevBtnInnerHtml = "";
export function btnLoader(btn, bindLoader, otherBtnsToDisable) {
    if (otherBtnsToDisable === void 0) { otherBtnsToDisable = []; }
    var btnElem = document.querySelector(btn);
    var btnInnerHtml = '<span class="spinner-border spinner-border-sm" style="float: left; margin: 4px 5px 0 0;" role="status" aria-hidden="true"></span>Loading...';
    if (bindLoader) {
        prevBtnInnerHtml = btnElem.innerHTML;
        btnElem.innerHTML = btnInnerHtml;
        btnElem.disabled = true;
        if (otherBtnsToDisable.length > 0)
            document.querySelectorAll(otherBtnsToDisable.join(",")).forEach(function (btn) { return btn.disabled = true; });
    }
    else {
        btnElem.innerHTML = prevBtnInnerHtml;
        btnElem.disabled = false;
        if (otherBtnsToDisable.length > 0)
            document.querySelectorAll(otherBtnsToDisable.join(",")).forEach(function (btn) { return btn.disabled = false; });
    }
}
export function getSPIcon(extension, title, isFolder) {
    if (title === void 0) { title = ""; }
    if (isFolder === void 0) { isFolder = false; }
    var imgHtml = "";
    var icon = "";
    extension = isFolder ? "folder" : extension;
    switch (extension) {
        case "folder":
            imgHtml = '<img border="0" alt="folder" title="' + title + '" src="/_layouts/15/images/folder.gif">';
            icon = "/_layouts/15/images/folder.gif";
            break;
        case "png":
            imgHtml = '<img border="0" alt="folder" title="' + title + '" src="/_layouts/15/images/icpng.gif">';
            icon = "/_layouts/15/images/icpng.gif";
            break;
        case "jpg":
        case "jpeg":
            imgHtml = '<img border="0" alt="folder" title="' + title + '" src="/_layouts/15/images/icjpg.gif">';
            icon = "/_layouts/15/images/icjpg.gif";
            break;
        case "txt":
            imgHtml = '<img border="0" alt="txt" title="' + title + '" src="/_layouts/15/images/ictxt.gif">';
            icon = "/_layouts/15/images/ictxt.gif";
            break;
        case "pdf":
            imgHtml = '<img border="0" alt="Excel workbook" title="' + title + '" src="/_layouts/15/images/icpdf.png">';
            icon = "/_layouts/15/images/icpdf.png";
            break;
        case "xls":
            imgHtml = '<img border="0" alt="Excel workbook" title="' + title + '" src="/_layouts/15/images/icxls.png">';
            icon = "/_layouts/15/images/icxls.png";
            break;
        case "xlsx":
            imgHtml = '<img border="0" alt="Excel workbook" title="' + title + '" src="/_layouts/15/images/icxlsx.png">';
            icon = "/_layouts/15/images/icxlsx.png";
            break;
        case "doc":
            imgHtml = '<img border="0" alt="doc file" title="' + title + '" src="/_layouts/15/images/icdoc.png">';
            icon = "/_layouts/15/images/icdoc.png";
            break;
        case "docx":
            imgHtml = '<img border="0" alt="doc file" title="' + title + '" src="/_layouts/15/images/icdocx.png">';
            icon = "/_layouts/15/images/icdocx.png";
            break;
        case "ppt":
            imgHtml = '<img border="0" alt="ppt file" title="' + title + '" src="/_layouts/15/images/icppt.png">';
            icon = "/_layouts/15/images/icppt.png";
            break;
        case "pptx":
            imgHtml = '<img border="0" alt="ppt file" title="' + title + '" src="/_layouts/15/images/icpptx.png">';
            icon = "/_layouts/15/images/icpptx.png";
            break;
        default:
            imgHtml = '<img border="0" alt="default" title="' + title + '" src="/_layouts/15/images/icgen.gif">';
            icon = "/_layouts/15/images/icgen.gif";
    }
    return { html: imgHtml, icon: icon };
}
export function downloadBlob(blob, filename) {
    // Create an object URL for the blob object
    var url = URL.createObjectURL(blob);
    // Create a new anchor element
    var a = document.createElement('a');
    // Set the href and download attributes for the anchor element
    // You can optionally set other attributes like `title`, etc
    // Especially, if the anchor element will be attached to the DOM
    a.href = url;
    a.download = filename || 'download';
    // Click handler that releases the object URL after the element has been clicked
    // This is required for one-off downloads of the blob content
    var clickHandler = function () {
        setTimeout(function () {
            URL.revokeObjectURL(url);
            removeEventListener('click', clickHandler);
        }, 150);
    };
    // Add the click event listener on the anchor element
    // Comment out this line if you don't want a one-off download of the blob content
    a.addEventListener('click', clickHandler, false);
    // Programmatically trigger a click on the anchor element
    // Useful if you want the download to happen automatically
    // Without attaching the anchor element to the DOM
    // Comment out this line if you don't want an automatic download of the blob content
    a.click();
    // Return the anchor element
    // Useful if you want a reference to the element
    // in order to attach it to the DOM or use it in some other way
    return a;
}
export function validateWebpartProps(props) {
    var isValidProps = true;
    Object.keys(props).forEach(function (propName) {
        if (props[propName] == undefined)
            isValidProps = false;
    });
    if (!isValidProps)
        alert("Web part properties are not properly configured to load form data. Edit the form and configure.");
    return isValidProps;
}
//# sourceMappingURL=utilities.js.map