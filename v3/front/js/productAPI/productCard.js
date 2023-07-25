function productCardRender(product) {
    // Виймаємо з product об'єкт category
    const { category } = product;
    
    const prdStr = JSON.stringify(product);
    // console.log(prdStr);
    // Функціонал для формування карточки продукту
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    // Карточка продукту буде мати різний вигляд в залежності від стану авторизації
    // Верхня частина буде однаковою, футер - буде відрізнятися
    const commonProductCardPart = `<div class="product-data">
                                        <div><img src="${product.image}" class="product-img"></div>
                                        <div class="product-category"><div class="product-category-text">${category.name}</div></div>
                                        <div class="product-name">${product.name}</div>
                                        <div class="product-text">Volume: <span class="product-volume">${product.volume}</span> ml</div> 
                                        <div class="product-text">Material: <span class="product-material">${product.material}</span></div>
                                            
                                    </div>`;
    const adminProductCardFooter = `  <div class="product-footer">
                                        <div> <span class="product-price">${product.price} &#x20b4 </span> </div>                                    
                                        <div class="product-manage-btns">
                                            <div class="fas fa-edit product-btn" onclick='editProduct(${prdStr})'> </div>
                                            <div class="fa-solid fa-trash-can product-btn" onclick='removeProduct(${prdStr})'></div>
                                        </div> 
                                    </div>`;
    const userProductCardFooter = `
                                    <div class="product-footer">
                                        <div> <span class="product-price">${product.price} &#x20b4 </span> </div>                                    
                                        <div class="product-manage-btns">
                                            <div class="fa fa-shopping-cart product-cart-btn" onclick='addToCart(${prdStr})'> </div>
                                        </div> 
                                    </div>`;
    const unAuthProductCardFooter = `
                                    <div class="product-footer">
                                        <div> <span class="product-price">${product.price} &#x20b4 </span> </div>                                    
                                        <div class="product-manage-btns">
                                            <div class="fa fa-shopping-cart product-cart-btn" onclick="popUp('Please log in', 'danger')"> </div>
                                        </div> 
                                    </div>`;
    // Перевіряємо стан авторизації
    const user = getUser();
    
    // В залежності від стану авторизації формуємо карточку
    switch (true) {
        // Перевіряємо чи авторизований користувач
        case user === null:
            // Картка продукуту для  неваторизованого користувача
            productCard.innerHTML = `${commonProductCardPart} ${unAuthProductCardFooter}`;
            break;
        // Перевіряємо, чи авторизований користувач є покупцем 
        case user && !user.isAdmin :
            // Меню авторизованого покупця
            productCard.innerHTML = `${commonProductCardPart} ${userProductCardFooter}`;
            break;
        // Перевіряємо, чи авторизований користувач є адміністраторои
        case  user.isAdmin:
            // Меню адміністратора
            productCard.innerHTML = `${commonProductCardPart} ${adminProductCardFooter}`;
            break;   
    }
    
    // Розміщаємо карточку продукту
    const dataContainer = document.querySelector(".data-container");
    dataContainer.appendChild(productCard);

}
