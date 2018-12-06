"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pagination = /** @class */ (function () {
    function Pagination() {
    }
    Pagination.prototype.buildPagination = function (totalItems, currentPage, startPage, endPage, startIndex, endIndex, lastPage) {
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            lastPage: lastPage,
        };
    };
    Pagination.prototype.getPage = function (totalNumber, currentPage, entryPerPage, range) {
        if (currentPage === undefined || currentPage === null) {
            currentPage = 1;
        }
        if (entryPerPage === undefined || entryPerPage === null) {
            entryPerPage = 10;
        }
        if (range === undefined || range === null) {
            range = 7;
        }
        var startIndex;
        var endIndex;
        var required = Math.floor(totalNumber / entryPerPage);
        startIndex = (currentPage - 1) * entryPerPage;
        endIndex = currentPage * entryPerPage - 1;
        if (startIndex < 0) {
            startIndex = 0;
        }
        if (endIndex > totalNumber - 1) {
            endIndex = totalNumber - 1;
        }
        if (range >= required) {
            return this.buildPagination(totalNumber, currentPage, 1, required, startIndex, endIndex, required);
        }
        var startPage;
        var endPage;
        startPage = currentPage - Math.floor(range / 2);
        endPage = currentPage + Math.floor(range / 2);
        var diff;
        if (startPage < 1 && endPage > required) {
            startPage = 1;
            endPage = required;
        }
        else if (startPage < 1) {
            diff = 1 - startPage;
            startPage = 1;
            endPage = endPage + diff;
        }
        else if (endPage > required) {
            diff = endPage - required;
            startPage = (startPage - diff) < 1 ? 1 : (startPage - diff);
            endPage = required;
        }
        return this.buildPagination(totalNumber, currentPage, startPage, endPage, startIndex, endIndex, required);
    };
    return Pagination;
}());
exports.pagination = new Pagination();
// let a = pagination.getPage(200, 2, 10, 10);
// console.log("aaa", a);
//# sourceMappingURL=pagination.js.map