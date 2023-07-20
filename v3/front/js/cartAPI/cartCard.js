// Функція рендерингу карточки айтемів корзини
function cartCardRender(item, index) {
    const itemStr = JSON.stringify(item);
    const cartContainer = document.querySelector('.cart-container');
    const cartCard = document.createElement('div');
    cartCard.classList.add('cart-card');
    cartCard.innerHTML = `  <div class="cart-remove-btn" onclick='removeCartItem(${itemStr}, ${index})'>&times</div>
                            
                            <div class="cart-img-container">
                                <div class="cart-product-category">
                                    <div class="cart-product-category-text">${item.product.category.name}</div>
                                </div>
                                <div> <img src='${item.product.image}' class="cart-product-img"> </div>
                            </div>

                            <div class="cart-product-info">
                                <div class="cart-product-name">${item.product.name}</div>
                                <div class="cart-product-material">${item.product.material}</div>
                                <div class="cart-product-volume">${item.product.volume} ml</div>
                                <div class="cart-product-price">${item.product.price} &#x20b4 / pc</div>
                            </div>
                            <div class="cart-manage-btns">
                                <button class="cart-manage-button" onclick='decreaseCartItemCount(${itemStr}, ${index})'>-</button>
                                <div class="cart-current-item-count">${item.count}</div>
                                <button class="cart-manage-button" onclick='increaseCartItemCount(${index})'>+</button>
                            </div>
                            <div class="cart-item-price">${item.count*item.product.price} &#x20b4
                            </div>`;
    cartContainer.appendChild(cartCard);
}

async function removeCartItem(item, index) {
    return new Promise(async (resolve, reject) => {
        try {
            const msg = document.getElementsByClassName('confirmation-message')[0];
            msg.innerHTML = `Are you sure you want to remove product <b>${item.product.name}</b> from the cart? </br>`
            confirmModal.open();
            await waitForRemoveButtonPress();
            confirmModal.close();
            const user = getUser();
            user.cart.splice(index, 1);
            setUser(user);
            await refreshCart();
            resolve();
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

async function increaseCartItemCount(index) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = getUser();
            user.cart[index].count += 1;
            setUser(user);
            await refreshCart();
            resolve();
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

async function decreaseCartItemCount(item, index) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = getUser();
            let count = user.cart[index].count;
            count -= 1;
            if (count === 0) {
                removeCartItem(item, index)
            } else {
                user.cart[index].count -= 1;
                setUser(user);
                await refreshCart();
            }
            resolve();
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

async function refreshCart() {
    await navbarRender(getUser());
    await cartRender();
    await updateCartInDB(getUser());
}