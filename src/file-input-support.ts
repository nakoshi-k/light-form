
const getFile : (blob:Blob) => Promise<string|ArrayBuffer|null> = (blob:Blob) => new Promise( (resolve,reject) => {
    const reader = new FileReader();
    reader.readAsDataURL( blob );
    reader.onload = () => {
        resolve(reader.result)
    };
    reader.onerror = () => {
        reject()
    }
})

const fileSupport : (nodeList:NodeList) => void = ( elements = document.querySelectorAll(`input[type="file"]`) ) => 
[].slice.call(elements)
.forEach( (element:HTMLInputElement) => {
    const fileRead =  () => {
        if(element.files === null) return
        if(element.files.length === 0) return
        if(!element.multiple){
            getFile(element.files[0])
            .then(file => {
                element.dataset.file = `${file}`
            })
            return
        }
        const multiple = [].slice.call(element.files).map(blob => getFile(blob));
        Promise.all(multiple).then(files => {
            files.forEach( (file,index) => {
                element.dataset[`file${index}`] = `${file}`
            })
        })

    }
    fileRead();
    element.addEventListener("change" , fileRead)
} )

export default fileSupport