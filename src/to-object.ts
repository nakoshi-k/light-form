import getFields from "./get-fields";
import getConstructorName from "./get-constructor-name";
import { isFile, isSelect, isRadioNodeList, isCheckbox } from "./fomr-element-decision";
import { NestedValues } from "./interfaces";

const getSelectValue = (select:HTMLSelectElement) => {
    if(!select.multiple){
        return select.value
    }
    const selected = select.querySelectorAll("option:checked")
    return [].slice.call(selected).map((opt : HTMLOptionElement) => opt.value)
}


const getRadioNodeListValue = (radioNodeList :RadioNodeList) => {
    if(radioNodeList.length === 0 ) return ""
    const firstElement = <HTMLInputElement>radioNodeList[0]
    
    if(firstElement.type === "checkbox"){
        const c = [].slice.call(radioNodeList)
            .filter((e : HTMLInputElement) => e.checked )
            .map((e:HTMLInputElement) => e.value)
        return c
    }

    if(["checkbox","radio"].indexOf(firstElement.type) === -1){
        return [].slice.call(radioNodeList).map((e:HTMLInputElement) => e.value)
    }
    return radioNodeList.value
}

const getFileValue = (child:HTMLInputElement) => {
    if(!child.multiple){
        return child.dataset.file || ""
    }
    return  Object.keys(child.dataset)
    .filter(key => /^file[0-9]*$/.test(key) )
    .map(key => <string>child.dataset[key])
}

const getValue : (field :string , child :HTMLInputElement|HTMLSelectElement|RadioNodeList) => string | string[] = (field,child) => {
    if( isRadioNodeList(child))
        return getRadioNodeListValue(<RadioNodeList>child)
    
    if(isSelect(child))
        return getSelectValue(<HTMLSelectElement>child)
    
    if(isFile(child)){
        return getFileValue(<HTMLInputElement>child)        
    }
    if(isCheckbox(child)){
        if((<HTMLInputElement>child).checked){
            return child.value
        }
        return ""
    }
    return child.value
}

const toHierarchyData = (fields : string[],values : (string|string[])[],split : string|RegExp) => {
    const hierarchyFields = fields.map(field => field.split(split).filter(floor => floor !== ""))
    const data = values.reduce( (data,value,index) => {
        let swap : any = data
        let h = hierarchyFields[index]
        h.forEach((floor,index,fieldsHierarchy) => {
            if(!fieldsHierarchy[index + 1]){
                swap[floor.replace("[]","")] = value
                return
            }
            if(!swap[floor]){
                swap[floor] = {};
                if(!isNaN(parseInt(fieldsHierarchy[index + 1]))){
                    swap[floor] = [];
                }
            }
            swap = swap[floor];
        })
        return data
    },{})
    return data;
}

export default (form :HTMLFormElement , split : string|RegExp = /[\[\]]+/ ) => {
    const fields = getFields(form);
    const values = fields.map( field => getValue( field , form[field]))
    return <NestedValues>toHierarchyData(fields,values,split)
}