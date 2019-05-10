"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_constructor_name_1 = __importDefault(require("./get-constructor-name"));
exports.isRadioNodeList = (formChild) => get_constructor_name_1.default(formChild) === "RadioNodeList";
exports.isCheckbox = (child) => (get_constructor_name_1.default(child) === "HTMLInputElement" && child.type === "checkbox");
exports.isSelect = (child) => get_constructor_name_1.default(child) === "HTMLSelectElement";
exports.isFile = (child) => (get_constructor_name_1.default(child) === "HTMLInputElement" && child.type === "file");
