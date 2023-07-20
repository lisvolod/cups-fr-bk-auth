async function addToCart(product) {
    const user = getUser();
    
    // !!!! Disable here +/- btn
    const existsProductIndex = user.cart.findIndex(item => item.product._id === product._id)
    
    if (existsProductIndex < 0) {
        user.cart.push({product, count: 1})
    } else {
        user.cart[existsProductIndex].count += 1
    }
    setUser(user);
    await navbarRender(user);
    calcCount();
    
    // !!!! Enable here +/- btn
    
}

async function calcCount() {
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
    const dataContainer= document.querySelector('.data-container');
    dataContainer.innerHTML = ``;
    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cart-container')
    dataContainer.appendChild(cartContainer);
    
    const user = getUser();
    user.cart.forEach( (item, index) => cartCardRender(item, index));

    const totalCartPrice = document.createElement('div');
    totalCartPrice.classList.add('cart-order-price')
    const orderPrice = user.cart.reduce((accumulator, item) => {
        return accumulator + item.count * item.product.price;
      }, 0);
    totalCartPrice.innerHTML = `<div class="cart-order-price-label"> Order price:</div>
                                <div class="cart-order-price-text"> ${orderPrice} &#x20b4</div>`
    cartContainer.appendChild(totalCartPrice);

    const orderButton = document.createElement('div');
    orderButton.classList.add('order-button-container');
    orderButton.innerHTML = `<button class="btn btn-secondary">Complete the order</button>`;
    cartContainer.appendChild(orderButton);
}
