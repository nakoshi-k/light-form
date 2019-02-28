interface Window{
    chai : {assert : {
        equal : (...args:any) => void
    }}
    LightForm : {
        toObject : (...arg : any) => {[key :string]:{}}
    }
}


const {assert} = window["chai"]
const LightForm = window["LightForm"]
describe('toObject', () => {
    const form = document.getElementById("form");
    const formData = LightForm.toObject(form);
    it('input text', () => {
        assert.equal( formData.name , "kei" )
    });

    it('input checkbox', () => {

    });

    
});