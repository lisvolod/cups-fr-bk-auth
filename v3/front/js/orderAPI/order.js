// Підтвердження замовлення в корзині
async function createOrder() {
    try {
        const recipientName = document.forms['orderForm'].elements.recipientName.value;
        const deliveryAddress = document.forms['orderForm'].elements.deliveryAddress.value; 
        const user = getUser();
    
        const requestPayload = {
            userId: user._id,
            cart: user.cart,
            name: recipientName,
            address: deliveryAddress
        }
        await fetch(`${backURL}/order/create`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',   
            },
            body: JSON.stringify(requestPayload)
        })
        .then( response => response.json())
        .then( data => {
                // Закриваємо вікно
                orderModal.close();
                // Очищуємо поля форми
                document.forms['orderForm'].reset();
                // Очищуємо корзину
                const user = getUser();
                user.cart = [];
                setUser(user);
                // Перемальовуємо значок корзини в navbar
                renderCalcCount();
                // Оновлюємо інформацію в БД
                updateCartInDB(user);
                // Повідомлення про успіх
                console.log(data.msg);
                popUp(data.msg)})
        .then ( renderOrders() )
        .catch( err => {
            console.error('Order createin error: ', err);
        });

    } catch (error) {
        console.error(error);
    }
}

document.forms['orderForm'].addEventListener('submit', (event) => {
    event.preventDefault();
    createOrder();
})

async function renderOrders() {
    //Закриваємо випадаюче меню в адаптиві 
    dropDownClose();
    try {
    const user = getUser();
    
        await fetch(`${backURL}/order/${user._id}`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        .then( response => response.json())
        .then( orders => {
            const dataContainer = document.querySelector(".data-container");
            dataContainer.innerHTML = "";                   // Очищуємо контейнер продуктів
            const orderContainer = document.createElement('div');
            orderContainer.classList.add(`order-container`);
            dataContainer.appendChild(orderContainer);

            // Перевіряємо, чи є замовлення
            if (orders.length) {
                orders.forEach(order => {
                    // Якщо є - рендиримо карточки ордерів
                    orderCardRender(order);
                });
            }
            else {
                dataContainer.innerHTML = `<div class="empy-errors">
                    <div class="empy-errors-item">No orders found yet. </div>
                    <div class="empy-errors-item">Visit the store and buy some products.</div>
                    <button class="btn btn-secondary" onclick='getAndShowAllProducts()'>Go shopping ...</button>
                </div>`
            }
        })
        .catch( err => {
            console.error('Order render error: ', err);
        });
    } catch (error) {
        console.error(error);
    }

}