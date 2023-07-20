async function addToCart(product) {
    const user = getUser();
    console.log(user);
    // !!!! Disable here +/- btn
    const existsProductIndex = user.cart.findIndex(item => item.product._id === product._id)
    
    if (existsProductIndex < 0) {
        user.cart.push({product, count: 1})
    } else {
        user.cart[existsProductIndex].count += 1
    }
    setUser(user);
    await navbarRender(user);
    renderCalcCount();
    updateCartInDB(getUser());
    // !!!! Enable here +/- btn
    
}

// Рендер числа товарів на піктограмі корзини в navbar
async function renderCalcCount() {
    const user = getUser();
    if (!user) return;
    let calcCoutProducts = 0;
    
    if (user && !user.isAdmin) {
        if (user.cart.length > 0) {
            user.cart.forEach(item => {
                calcCoutProducts += item.count;
            });
            
            document.getElementById('cartIconCount').innerText = calcCoutProducts;
            document.getElementById('cartIconCount').style.display = 'block';
            
        } else {
            document.getElementById('cartIconCount').style.display = 'none';
        }
    }
}

function cartRender() {
    return new Promise((resolve, reject) => {
        try {
            // Створення контейнера для рендеру контенту корзини
            const dataContainer= document.querySelector('.data-container');
            dataContainer.innerHTML = ``;
            const cartContainer = document.createElement('div');
            cartContainer.classList.add('cart-container')
            dataContainer.appendChild(cartContainer);
            
            const user = getUser();
            if (user.cart.length) {
                // Рендер карточок товарів в корзині
                user.cart.forEach( (item, index) => cartCardRender(item, index));

                // Виведення загальної ціни корзини
                const totalCartPrice = document.createElement('div');
                totalCartPrice.classList.add('cart-order-price')
                const orderPrice = user.cart.reduce((accumulator, item) => {
                    return accumulator + item.count * item.product.price;
                }, 0);
                totalCartPrice.innerHTML = `<div class="cart-order-price-label"> Order price:</div>
                                            <div class="cart-order-price-text"> ${orderPrice} &#x20b4</div>`
                cartContainer.appendChild(totalCartPrice);

                // Кнопка оформлення замовлення
                const orderButton = document.createElement('div');
                orderButton.classList.add('cart-order-button-container');
                orderButton.innerHTML = `<button class="btn btn-secondary">Complete the order</button>`;
                cartContainer.appendChild(orderButton);
            } else {
                const emptyCartMsg = document.createElement('div');
                emptyCartMsg.classList.add('cart-empty-message');
                emptyCartMsg.innerHTML = `<button class="btn btn-secondary" onclick='getAndShowAllProducts()'>Cart is empty. Go shopping ...</button>`;
                cartContainer.appendChild(emptyCartMsg);
            }
            resolve()
        } catch (error) {
            console.error(error);
            reject();
        }
    })
    
}

const updateCartInDB = async (user) => {
    return new Promise((resolve, reject) => {
        try {
            fetch(`${backURL}/user/cart`, {
                method: 'PATCH',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',   
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())                      // Парсимо [object Response] 
            .then(user => {                                         // Парсимо [object Promise]
                console.log(user);
                resolve();
            })                                         
        } catch (error) {
            console.error(error);
            reject(error);
        }
    })
}; 