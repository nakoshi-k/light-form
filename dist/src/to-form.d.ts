import { NestedValues, FlatData } from "./interfaces";
export declare const bracketed: (parent: string, key: string | number) => string | number;
export declare const doted: (parent: string, key: string | number) => string | number;
export declare const toFlat: (values: NestedValues, wrap?: Function, parent?: string, flat?: FlatData) => FlatData;
declare const _default: (form: HTMLFormElement, data: NestedValues, wrap?: Function | undefined) => HTMLFormElement;
export default _default;
//# sourceMappingURL=to-form.d.ts.map