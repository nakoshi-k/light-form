"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getConstructorName = instance => (instance.constructor) ? instance.constructor.name : Object.prototype.toString.call(instance).split(/\[\] /)[1];
exports.default = getConstructorName;
