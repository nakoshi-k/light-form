"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFields = (form) => [].slice.call(form.elements)
    .filter((e) => e.hasAttribute("name"))
    .map((e) => e.getAttribute("name") || "")
    .filter((s, index, ar) => index === ar.indexOf(s));
