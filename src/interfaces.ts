export interface NestedValues{
    [key:string] : string|number|string[]|number[]|NestedValues|Object[]
}

export type FlatDataRow = string|string[]
export type FlatData = [string,FlatDataRow][]
export type FormChild =  HTMLInputElement|RadioNodeList|HTMLSelectElement

export interface RadioNodeList extends NodeList {
    value: string;
}