interface Window{
    chai : {assert : {
        equal : (...args:any) => void,
    },
    should : () => void
    }
    LightForm : {
        toObject : (...arg : any) => {[key :string]:{}}
    }
}
type ShouldArguments = string|number|string[]|number[]|{[key:string]:ShouldArguments}
interface Object{
    should  : {
        [key:string] : (...args:(ShouldArguments|Chai.Assertion)[]) => void
    }
}

window.chai.should()
const LightForm = window["LightForm"]

describe('toObject', () => {
    const form = document.getElementById("form");
    const formData  = LightForm.toObject(form);

    it('input text', () => {
         formData.name.should.equal("kei")
         formData.age.should.equal("42")
         formData.sex.should.equal("man")
         formData.private.should.equal("")
    });

    it('input checkbox', () => {

    });

    
});