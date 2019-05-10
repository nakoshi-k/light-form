"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const to_form_1 = __importStar(require("./to-form"));
const to_object_1 = __importDefault(require("./to-object"));
const file_input_support_1 = __importDefault(require("./file-input-support"));
exports.default = {
    toForm: to_form_1.default,
    toObject: to_object_1.default,
    bracketed: to_form_1.bracketed,
    doted: to_form_1.doted,
    fileInputSupport: file_input_support_1.default
};
