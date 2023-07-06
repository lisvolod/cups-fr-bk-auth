function collectFormData(formName) {
    const currentForm = document.forms[formName];
    let formData = new FormData(currentForm);
    document.forms[formName].reset();
    clearHiddenProductFormAttrib();
    return formData;
}


// function collectFormData() {
//     const productForm = document.forms["productForm"];
//     let formData = new FormData(productForm);
//     productForm.reset();
//     return formData;
// }

async function sendProductData() {
    try {
        await fetch (`${backURL}/product`, {
            method: 'POST',
            body: collectFormData('productForm')
        }) 
    } catch (error) {
        console.error(error);
    }
   
}


document.forms["productForm"].addEventListener ('submit', (e) => {
    e.preventDefault();
    productModal.close();
    convertModalToCreate();
    sendProductData().then( () => {getAndShowAllProducts()} );    
})

