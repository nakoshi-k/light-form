export interface NestedValues {
    [key: string]: string | number | string[] | number[] | NestedValues | Object[];
}
export declare type FlatDataRow = string | string[];
export declare type FlatData = [string, FlatDataRow][];
export declare type FormChild = HTMLInputElement | RadioNodeList | HTMLSelectElement;
export interface RadioNodeList extends NodeList {
    value: string;
}
//# sourceMappingURL=interfaces.d.ts.map