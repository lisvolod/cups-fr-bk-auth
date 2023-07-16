const categoryCardRender = (category) => {
    const categoryContainer = document.querySelector(".category-container");
    
    
    // Формуємо карточку для кожної категорії з кнопками Edit та Delete
           
    const categoryCard = document.createElement("div");
    categoryCard.classList.add("category-card");
    categoryCard.innerHTML =   `<div class="category-name">${category.name}</div>                                    
                                <div class="category-manage-btns">
                                        <div class="fas fa-edit category-btn" onclick="editCategory('${category._id}', '${category.name}')"> </div>
                                        <div class="fa-solid fa-trash-can category-btn" onclick="removeCategory('${category._id}')"></div>
                                </div>`;
    // Розміщаємо карточку категорії
   
    categoryContainer.appendChild(categoryCard);
}