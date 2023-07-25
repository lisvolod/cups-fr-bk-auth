async function navbarRender(user) {
    return new Promise( (res, rej) => {
        // Вибираємо контейнер навігаційного меню
        const navBar = document.querySelector('.navbar-container');
        // Очищуємо контейнер
        navBar.innerHTML = '';
        
        switch (true) {
            // Перевіряємо чи в функцію передавалися параметри
            case user === null:
                // Меню неваторизованого користувача
                navBar.innerHTML = `<nav class="navbar navbar-light navbar-expand-md navbar-bg-body">
                                    <div class="container">
                                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#n_bar" aria-controls="n_bar" aria-expanded="true" aria-label="Toggle navigation">
                                            <span class="navbar-toggler-icon"></span>
                                        </button>
                                        <div class="collapse navbar-collapse" id="n_bar">
                                            <ul class="navbar-nav">
                                                <li class="nav-item"><a class="nav-link" href="#" onclick="getAndShowAllProducts()">PRODUCTS</a></li>
                                                <li class="nav-item dropdown">
                                                    <div class="nav-link dropdown-toggle fa-solid fa-user" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"></div>
                                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <li><a class="dropdown-item" href="#" onclick="loginModal.open()">LogIn</a></li>
                                                        <li><a class="dropdown-item" href="#" onclick="registrationModal.open()">SignUp</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>`;
                break;
            // Перевіряємо, чи у функцію передався об'єкт користувача і аналізуємо його роль
            case user && !user.isAdmin :
                // Меню аторизованого покупця
                navBar.innerHTML =`<nav class="navbar navbar-light navbar-expand-md navbar-bg-body">
                                        <div class="container">
                                            <div class="fa fa-shopping-cart navbar-cart-icon" id="cart" onclick='cartRender()'>
                                                <div class="navbar-cart-icon-count" id="cartIconCount"></div>
                                            </div>
                                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#n_bar" aria-controls="n_bar" aria-expanded="true" aria-label="Toggle navigation">
                                                <span class="navbar-toggler-icon"></span>
                                            </button>
                                            <div class="collapse navbar-collapse" id="n_bar">
                                                <ul class="navbar-nav">
                                                    <li class="nav-item"><a class="nav-link" href="#" onclick="getAndShowAllProducts()">PRODUCTS</a></li>
                                                    <li class="nav-item"><a class="nav-link" href="#" onclick="renderOrders()">ORDERS</a></li>
                                                    <li class="nav-item dropdown">
                                                        <div class="nav-link dropdown-toggle fa-solid fa-user" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <span class="user-name">${user.name}</span>
                                                        </div>
                                                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            <li><a class="dropdown-item" href="#" onclick="userLogout()">LogOut</a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </nav>`;
                break;
            // Перевіряємо, чи об'єкт користувача має роль адміністратора
            case  user.isAdmin:
                // Меню адміністратора
                navBar.innerHTML = `<nav class="navbar navbar-light navbar-expand-md navbar-bg-body">
                                        <div class="container">
                                            <button id="burgerBtn" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#n_bar" aria-controls="n_bar" aria-expanded="true" aria-label="Toggle navigation">
                                                <span class="navbar-toggler-icon"></span>
                                            </button>
                                            <div class="collapse navbar-collapse" id="n_bar">
                                                <ul class="navbar-nav">
                                                    <li class="nav-item"><a class="nav-link" href="#" onclick="categoryRender()">CATEGORIES</a></li>     
                                                    <li class="nav-item"><a class="nav-link" href="#" onclick="getAndShowAllProducts()">PRODUCTS</a></li>
                                                    <li class="nav-item"><a class="nav-link" href="#" onclick="renderOrders()">ORDERS</a></li>
                                                    <li class="nav-item dropdown">
                                                        <div class="nav-link dropdown-toggle fa-solid fa-user" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <span class="user-name">${user.name}</span>
                                                        </div>
                                                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            <li><a class="dropdown-item" href="#" onclick="userLogout()">LogOut</a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </nav>`;
                break;   
        }
        res();
    })
    .then (renderCalcCount())
    .catch( err => {
        console.log(err);
        rej(err);
    })
}


