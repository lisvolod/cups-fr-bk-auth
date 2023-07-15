async function userLogout() {
    return fetch(`${backURL}/user/logout`, {
        method: 'GET',
        mode: 'cors', 
        credentials: 'include'                 // Don't forget to specify this if you need cookies
    })
        .then(response => response.json())
        .then(data => {
            clearStorage()
            .then( () => {
                navbarRender(getUser());
                btnRender();
                getAndShowAllProducts();
            })
            .catch(err => console.log(err));
            console.log(data);
        // Обробка отриманих даних
        })
        .catch(error => {
            console.log(error);
        
        });
}