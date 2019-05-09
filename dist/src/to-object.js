"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_fields_1 = __importDefault(require("./get-fields"));
const fomr_element_decision_1 = require("./fomr-element-decision");
const getSelectValue = (select) => {
    if (!select.multiple) {
        return select.value;
    }
    const selected = select.querySelectorAll("option:checked");
    return [].slice.call(selected).map((opt) => opt.value);
};
const getRadioNodeListValue = (radioNodeList) => {
    if (radioNodeList.length === 0)
        return "";
    const firstElement = radioNodeList[0];
    if (firstElement.type === "checkbox") {
        const c = [].slice.call(radioNodeList)
            .filter((e) => e.checked)
            .map((e) => e.value);
        return c;
    }
    if (["checkbox", "radio"].indexOf(firstElement.type) === -1) {
        return [].slice.call(radioNodeList).map((e) => e.value);
    }
    return radioNodeList.value;
};
const getFileValue = (child) => {
    if (!child.multiple) {
        return child.dataset.file || "";
    }
    return Object.keys(child.dataset)
        .filter(key => /^file[0-9]*$/.test(key))
        .map(key => child.dataset[key]);
};
const getValue = (field, child) => {
    if (fomr_element_decision_1.isRadioNodeList(child))
        return getRadioNodeListValue(child);
    if (fomr_element_decision_1.isSelect(child))
        return getSelectValue(child);
    if (fomr_element_decision_1.isFile(child)) {
        return getFileValue(child);
    }
    if (fomr_element_decision_1.isCheckbox(child)) {
        if (child.checked) {
            return child.value;
        }
        return "";
    }
    return child.value;
};
const toHierarchyData = (fields, values, split) => {
    const hierarchyFields = fields.map(field => field.split(split).filter(floor => floor !== ""));
    const data = values.reduce((data, value, index) => {
        let swap = data;
        let h = hierarchyFields[index];
        h.forEach((floor, index, fieldsHierarchy) => {
            if (!fieldsHierarchy[index + 1]) {
                swap[floor.replace("[]", "")] = value;
                return;
            }
            if (!swap[floor]) {
                swap[floor] = {};
                if (!isNaN(parseInt(fieldsHierarchy[index + 1]))) {
                    swap[floor] = [];
                }
            }
            swap = swap[floor];
        });
        return data;
    }, {});
    return data;
};
exports.default = (form, split = /[\[\]]+/) => {
    const fields = get_fields_1.default(form);
    const values = fields.map(field => getValue(field, form[field]));
    return toHierarchyData(fields, values, split);
};
