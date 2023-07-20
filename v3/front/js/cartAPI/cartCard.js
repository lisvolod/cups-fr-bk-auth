function cartCardRender(item, index) {
    console.log(item);
    const cartContainer = document.querySelector('.cart-container');
    const cartCard = document.createElement('div');
    cartCard.classList.add('cart-card');
    cartCard.innerHTML = `  <div class="cart-remove-btn">&times</div>
                            
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
                                <button class="cart-manage-button">-</button>
                                <div class="cart-current-item-count">${item.count}</div>
                                <button class="cart-manage-button">+</button>
                            </div>
                            <div class="cart-item-price">${item.count*item.product.price} &#x20b4
                            </div>
                            
                        `;
    cartContainer.appendChild(cartCard);
    // console.log(item);
}