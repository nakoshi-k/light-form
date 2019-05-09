"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fomr_element_decision_1 = require("./fomr-element-decision");
exports.bracketed = (parent, key) => (parent === "") ? key : `${parent}[${key}]`;
exports.doted = (parent, key) => (parent === "") ? key : `${parent}.${key}`;
exports.toFlat = (values, wrap = exports.bracketed, parent = "", flat = []) => {
    return Object.keys(values).reduce((flat, key) => {
        const value = values[key] || "";
        if (Array.isArray(value)) {
            if (value[0] !== void 0 && typeof value[0] !== "object") {
                flat.push([wrap(parent, key), value.map(v => `${v}`)]);
                return flat;
            }
        }
        if (typeof value === "object") {
            return exports.toFlat(values[key], wrap, wrap(parent, key), flat);
        }
        flat.push([wrap(parent, key), `${values[key]}`]);
        return flat;
    }, flat);
};
const setValueRadioNode = (radioNodeList, value) => {
    if (!Array.isArray(value)) {
        radioNodeList.value = value;
        return;
    }
    value.forEach((v, index) => {
        if (radioNodeList.item(index).type === "file") {
            return;
        }
        radioNodeList.item(index).value = v;
    });
};
const setValueSelect = (select, value) => {
    if (!select.multiple) {
        select.value = value;
    }
    ;
    [].slice.call(select.querySelectorAll("option")).forEach((option) => {
        option.selected = (value.indexOf(option.value) > -1) ? true : false;
    });
};
const bindForm = (form, flatData) => {
    flatData.forEach(row => {
        const key = row[0];
        const value = row[1];
        const child = form[key] || form[key + "[]"];
        if (child === void 0)
            return;
        if (fomr_element_decision_1.isRadioNodeList(child)) {
            setValueRadioNode(child, value);
            return;
        }
        if (fomr_element_decision_1.isSelect(child)) {
            setValueSelect(child, value);
            return;
        }
        if (fomr_element_decision_1.isCheckbox(child)) {
            if (value === child.value) {
                child.checked = true;
                return;
            }
            child.checked = false;
            return;
        }
        if (fomr_element_decision_1.isFile(child)) {
            return;
        }
        child.value = `${value}`;
    });
    return form;
};
exports.default = (form, data, wrap) => {
    return bindForm(form, exports.toFlat(data, wrap));
};
