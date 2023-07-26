async function renderFilterCategoriesOptions(categories) {
    return new Promise((resolve, reject) => {
        try {
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
            // const categoryArr = getCategories();
            categories.forEach(category => {
                        const categoryOption = document.createElement('option');
                        categoryOption.value = category._id;
                        categoryOption.innerText = `${category.name}`;
                        filterCategory.appendChild(categoryOption);
                    });
            resolve();
        } catch (error) {
            console.error(error);
            reject(error);
        }
    })
 
    
    
    
    
    // getAllCategoriesFromDB()
    // .then ( data => {
    //     data.forEach(category => {
    //         const categoryOption = document.createElement('option');
    //         categoryOption.value = category._id;
    //         categoryOption.innerText = `${category.name}`;
    //         filterCategory.appendChild(categoryOption);
    //     });
    // })
    // .catch(err => console.log(err))
}

// При будь-якій фільтрації - стаємо на 1-шу сторінку
const filtration = async () => {
    await setPage(1);
    await getAndShowAllProducts();
}

const filterCategory = document.getElementById('filter-category');
filterCategory.addEventListener('change', filtration);

// Сортування
const sort = document.getElementById('filter-sort');
sort.addEventListener('change', filtration);

// Пошук
const search = document.getElementById('filter-search');
search.addEventListener('input', filtration);