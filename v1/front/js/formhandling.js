function collectFormData(formName) {
    const currentForm = document.forms[formName];
    let formData = new FormData(currentForm);
    document.forms[formName].reset();
    return formData;
}


// function collectFormData() {
//     const productForm = document.forms["productForm"];
//     let formData = new FormData(productForm);
//     productForm.reset();
//     return formData;
// }

async function sendProductData() {
    await fetch (`${backURL}/product`, {
            method: 'POST',
            body: collectFormData('productForm')
        })
}


document.forms["productForm"].addEventListener ('submit', (e) => {
    e.preventDefault();
    productModal.close();
    convertModalToCreate();
    sendProductData().then( () => {getAndShowAllProducts()} );    
})

