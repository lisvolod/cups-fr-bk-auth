function orderCardRender(order) {
    console.log(order);
    // Перетворюємо формат часу створення ордеру
    // у звичний для України вигляд
    const isoDate = order.createdAt;
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}-${hours}:${minutes}:${seconds}`;
    // Формуємо карточку
    const orderContainer = document.querySelector('.order-container');
    const orderCard = document.createElement('div');
    orderCard.classList.add('order-card');
    orderCard.innerHTML = `
    <div class="order-id">
        <div class="order-id-item"><b>Order ID:</b> ${order._id} </div>
        <div class="order-id-item"><b>from</b> ${formattedDate}</div>
    </div> 
    <div class="order-info">
        <div class="order-resep-info">
            <div class="order-resep-info-item order-name"><b>Recipient's name:</b> <br>${order.name} </div>
            <div class="order-resep-info-item order-address"><b>Delivery address:</b> <br> ${order.address}</div>
        </div>
        <div class="order-status"><b>Status:</b> ${order.status}</div>
    </div>
    <div class="accordion" id="accordion${order._id}">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accitem${order._id}" aria-expanded="false" aria-controls="accitem${order._id}">
                    Order details
                </button>
            </h2>
            <div id="accitem${order._id}" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion${order._id}">
            <div class="accordion-body" id="${order._id}-cart">
                
            </div>
        </div>
    </div>`;
    orderContainer.appendChild(orderCard);
    
    // Заповнюємо акордеон (деталі орера)
    // Вибираємо акордеон
    const orderDetails = document.getElementById(`${order._id}-cart`);
    orderDetails.innerHTML =``;
    // Створюємо контейнер для відмальовування деталей замовлення
    const cartContainer = document.createElement('div');
    cartContainer.classList.add(`order-cart-container`);
    cartContainer.classList.add(`order-${order._id}`);
    orderDetails.appendChild(cartContainer);
    
    // Рендер карточок товарів корзини замовлення
    order.cart.forEach( (item) => orderCartItemRender(item, order));

    // Виведення загальної ціни корзини
    const totalCartPrice = document.createElement('div');
    totalCartPrice.classList.add('cart-order-price')
    const orderPrice = order.cart.reduce((accumulator, item) => {
        return accumulator + item.count * item.product.price;
    }, 0);
    totalCartPrice.innerHTML = `<div class="cart-order-price-label"> Order price:</div>
                                <div class="cart-order-price-text"> ${orderPrice} &#x20b4</div>`
    cartContainer.appendChild(totalCartPrice);
  
}

function orderCartItemRender(item, order) {
    const cartContainer = document.querySelector(`.order-cart-container.order-${order._id}`);
    const cartItem = document.createElement('div');
    cartItem.classList.add('order-cart-card');
    cartItem.innerHTML = `  <div class="cart-img-container">
                                <div class="cart-product-category">
                                    <div class="cart-product-category-text">${item.product.category.name}</div>
                                </div>
                                <div> <img src='${item.product.image}' class="cart-product-img"> </div>
                            </div>

                            <div class="cart-product-info order-details">
                                <div class="cart-product-name">${item.product.name}</div>
                                <div class="cart-product-material">${item.product.material}</div>
                                <div class="cart-product-volume">${item.product.volume} ml</div>
                                <div class="cart-product-price">${item.product.price} &#x20b4 / pc</div>
                            </div>

                            <div class="cart-item-price">${item.count*item.product.price} &#x20b4
                            </div>`;
    cartContainer.appendChild(cartItem);
}