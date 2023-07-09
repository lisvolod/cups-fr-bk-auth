async function userLogout() {
    return fetch(`${backURL}/user/logout`, {
        method: 'GET',
        credentials: 'include'                 // Don't forget to specify this if you need cookies
    })
        .then(response => response.json())
        .then(data => {
            removeUser()
            .then( () => {
                navbarRender(getUser());
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