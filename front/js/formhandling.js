function collectFormData() {
    const productForm = document.forms["productForm"];
    let formData = new FormData(productForm);
    productForm.reset();
    return formData;
}

async function sendData() {
    await fetch ('http://localhost:3000/product', {
            method: 'POST',
            body: collectFormData()
        })
}

submitProductBtn.addEventListener ('click', (e) => {
    e.preventDefault();
    productModal.close();
    convertModalToCreate();

    sendData().then( () => {getAndShowAllProducts()} );    
})