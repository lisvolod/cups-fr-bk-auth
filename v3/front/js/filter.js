function renderFilterCategoriesOptions() {
    
    // Вибираємо відповідний select з блоку фільтрації i очищуємо його
   
    const filterCategory = document.getElementById('filter-category');
    filterCategory.innerHTML = ``;

    // Додаємо в них опцію по замовчуванню 
    // <option disabled selected value> -- select a category -- </option>
    const defaultProductCategoryOption = document.createElement('option');
    // defaultProductCategoryOption.setAttribute("disabled", "");
    defaultProductCategoryOption.setAttribute("selected", "");
    defaultProductCategoryOption.setAttribute("value", "all");
    defaultProductCategoryOption.innerText = ` -- select a category (All categories) -- `;
    filterCategory.appendChild(defaultProductCategoryOption);
    // Вибираємо категорії товарів з LS
    const categoryArr = getCategories();
    
    categoryArr.forEach(category => {
        const categoryOption = document.createElement('option');
        categoryOption.value = category._id;
        categoryOption.innerText = `${category.name}`;
        filterCategory.appendChild(categoryOption);
    });
}