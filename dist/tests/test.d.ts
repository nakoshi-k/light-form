/// <reference types="chai" />
interface Window {
    chai: {
        assert: {
            equal: (...args: any) => void;
        };
        should: () => void;
    };
    LightForm: {
        toObject: (...arg: any) => {
            [key: string]: {};
        };
    };
}
declare type ShouldArguments = string | number | string[] | number[] | {
    [key: string]: ShouldArguments;
};
interface Object {
    should: {
        [key: string]: (...args: (ShouldArguments | Chai.Assertion)[]) => void;
    };
}
declare const LightForm: {
    toObject: (...arg: any) => {
        [key: string]: {};
    };
};
//# sourceMappingURL=test.d.ts.map