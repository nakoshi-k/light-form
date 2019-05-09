"use strict";
window.chai.should();
const LightForm = window["LightForm"];
describe('toObject', () => {
    const form = document.getElementById("form");
    const formData = LightForm.toObject(form);
    it('input text', () => {
        formData.name.should.equal("kei");
        formData.age.should.equal("42");
        formData.sex.should.equal("man");
        formData.private.should.equal("");
    });
    it('input checkbox', () => {
    });
});
