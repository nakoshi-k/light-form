import getConstructorName from "./get-constructor-name";
import { FormChild } from "./interfaces";

export const isRadioNodeList = (formChild:FormChild) => 
    getConstructorName(formChild) === "RadioNodeList"

export const isCheckbox = (child:FormChild) => 
    (getConstructorName(child) === "HTMLInputElement" && (<HTMLInputElement>child).type === "checkbox")

export const isSelect = (child:FormChild) => 
    getConstructorName(child) === "HTMLSelectElement"

export const isFile = (child :FormChild) => 
    (getConstructorName(child) === "HTMLInputElement" && (<HTMLInputElement>child).type === "file")
