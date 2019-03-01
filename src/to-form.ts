import { isRadioNodeList, isSelect, isCheckbox, isFile } from "./fomr-element-decision";
import { NestedValues ,FlatData,FlatDataRow,FormChild} from "./interfaces";

export const bracketed = (parent : string,key : string|number) => 
    (parent === "") ? key : `${parent}[${key}]`

export const doted = (parent : string,key : string|number) => 
    (parent === "") ? key : `${parent}.${key}`


export const toFlat : ( values : NestedValues ,
                        wrap? : Function, 
                        parent? :string , 
                        flat? : FlatData) => FlatData = ( values  , wrap = bracketed , parent = "" , flat  = []) => {
        return Object.keys(values).reduce( (flat,key) => {
            const value = values[key] || "";
            if(Array.isArray(value)){
                if( value[0] !== void 0 && typeof value[0] !== "object"){
                    flat.push([ wrap(parent,key) , <string[]>value.map(v => `${v}`) ])
                    return flat
                }
            }
            if(typeof value === "object"){
                return toFlat(<NestedValues>values[key], wrap , wrap(parent,key) ,flat)
            }
            flat.push([ wrap(parent,key) , <string>`${values[key]}` ])
            return flat;
        } , flat)
}

const setValueRadioNode = (radioNodeList:RadioNodeList,value:FlatDataRow) => {
    if(!Array.isArray(value)){
        radioNodeList.value = <string>value
        return
    }
    (<string[]|number[]>value).forEach((v :number|string,index:number) => {
        if((<HTMLInputElement>radioNodeList.item(index)).type === "file"){
            return
        }
        (<HTMLInputElement>radioNodeList.item(index)).value = <string>v
    })
}

const setValueSelect = ( select : HTMLSelectElement,value : FlatDataRow) => {
    if(!select.multiple){
        select.value = <string>value
    }
    ;[].slice.call(select.querySelectorAll("option")).forEach((option :HTMLOptionElement) => {
        option.selected = ((<string[]>value).indexOf(option.value) > -1) ? true : false 
    })
}


const bindForm = (form:HTMLFormElement, flatData : FlatData) => {

    flatData.forEach(row => {
        const key = row[0]
        const value = row[1]
        const child :FormChild  = form[key] || form[key+"[]"]
        if(child === void 0) return

        if(isRadioNodeList(child)){
            setValueRadioNode(<RadioNodeList>child,value)
            return
        }
        
        if(isSelect(child)){
            setValueSelect(<HTMLSelectElement>child,value)
            return
        }

        if(isCheckbox(child)){
            if( value === child.value ){
                (<HTMLInputElement>child).checked = true
                return
            }
            (<HTMLInputElement>child).checked = false
            return
        }

        if(isFile(child)){
            return
        }
        (<HTMLInputElement>child).value = `${value}`
    })
    return form;
}

export default ( form :HTMLFormElement ,data : NestedValues , wrap?:Function) => {
    return bindForm(form,toFlat(data,wrap))
}
