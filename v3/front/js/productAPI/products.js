//
// ***** Видалення продукту
///

async function removeProduct(product) {
    const msg = document.getElementsByClassName('confirmation-message')[0];
    msg.innerHTML = `Are you sure you want to remove <b>${product.name}</b>`
    confirmModal.open();
    await waitForRemoveButtonPress();    // Зупинити виконання до натискання кнопки
        let deleteParams = JSON.stringify({_id:product._id, cloudinaryPublicId: product.cloudinaryPublicId})
        await fetch(`${backURL}/product/`, {
            method: "DELETE",
            mode: 'cors',
            credentials: 'include',                 // Don't forget to specify this if you need cookies
            headers: {
                'Content-Type': 'application/json'
            },
            body: deleteParams
        })
        .then( () => {
            removeButton.removeEventListener('click', () => {resolve();}); // Видалити обробник для економії пам'яті
            confirmModal.close();
            getAndShowAllProducts();
        })
    }
    

//
// ***** Показати всі продукти
///

// Функція рендерингу кнопки "Create New Product" для адміністратора
function btnRender() {
    const btnContainer = document.querySelector(".btn-container");
    btnContainer.innerHTML = ``;
    // Перевіряємо, чи короситувач є адміністатором
    const user = getUser();
    // Якщо адміністратор - малюємо кнопку "Створити продукт"
    
    if ( user && user.isAdmin) {
        btnContainer.innerHTML = `<button type="button" class="btn btn-secondary" id="createBtn" onclick="openProductModalWithCreate()">Create New Product</button>`;
    }
}

async function getAndShowAllProducts() {
    const page = getPage();
    const filterCategory = document.getElementById('filter-category').value;
    const sort = document.getElementById('filter-sort').value;
    const search = document.getElementById('filter-search').value.trim();
    /// Формуємо об'єкт з критеріяи для пошуку та фільтрації
    const queryParams = new URLSearchParams({
        page: `${page}`,
        category: `${filterCategory}`,
        sort: `${sort}`,
        search: `${search}`
      });

    await fetch(`${backURL}/product?${queryParams}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'                 // Don't forget to specify this if you need cookies
    })
    .then(response => response.json())                      // Парсимо [object Response] 
    .then( data => {                                         // Парсимо [object Promise]
            dropDownClose(); // Закриваємо випадаюче меню в адаптиві 
            btnRender();     // Кнопка Create New Product для адміна        
             // В об'єкті data приходять продукти та їх кількість { items: items, pageCount: pageCount }
            
             // Сетимо кількість сторінок
            setPageCount(data.pageCount);
            renderPagination();
            
            // Рендеримо карточки продуктів
            const dataContainer = document.querySelector(".data-container");
            dataContainer.innerHTML = "";                   // Очищуємо контейнер продуктів
            
            // Перевіряємо, чи є продукти
            if (data.items.length) {
                data.items.forEach(product => {
                    // console.log(product);
                    dropDownClose();
                    // Якщо є - рендиримо карточки продуктів
                    productCardRender(product);
                });
            }
            else {
                dataContainer.innerHTML = `<div class="empy-errors">
                    <div class="empy-errors-item">No products found yet. </div>
                    <div class="empy-errors-item">First - create some category,</div>
                    <div class="empy-errors-item">then you'll be able to create products.</div>
                </div>`
            }
           
    })
    .catch( err => console.log(err));
}

//
// ***** Редагування продукту (заповнення полів модалки)
//

function editProduct(product) {
    convertModalToEdit();
    renderProductCategoriesOptions();
    // Шукаємо, яка прийшла категорія, і вибираємо її
    const categoryListBox = document.querySelector('#producCategory');
    const options = Array.from(categoryListBox.options);
    const optionToSelect = options.find(item => item.text === product.category.name);
    optionToSelect.selected = true;

    document.getElementById('productId').value = product._id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productVolume').value = product.volume;
    document.getElementById('productMaterial').value = product.material;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('formImage').setAttribute("src", product.image) ;
    document.getElementById('oldCloudinaryPublicId').value = product.cloud;
    document.getElementById('oldImagePath').value = product.image;
    productModal.open();
}

//
// ***** Створення нового продукту 
//

// Функція для збирання значення полів форми продуктів
function collectProductFormData(formName) {
    const currentForm = document.forms[formName];
    let formData = new FormData(currentForm);
    document.forms[formName].reset();
    clearHiddenProductFormAttrib();
    return formData;
}

// Функція для відправки запиту на створення нового продукту
async function sendProductData() {
    try {
        await fetch (`${backURL}/product`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: collectProductFormData('productForm'),
        })
        .then(clearHiddenProductFormAttrib()); 
    } catch (error) {
        console.error(error);
    }
   
}

// Очищення форми productForm після відправки даних
const clearHiddenProductFormAttrib = () => {
    document.forms["productForm"].reset()
    document.getElementById("productId").removeAttribute("value");
    document.getElementById("oldCloudinaryPublicId").removeAttribute("value");
}



// Обробник відправки форми
document.forms["productForm"].addEventListener ('submit', (e) => {
    e.preventDefault();
    productModal.close();
    convertModalToCreate();
    sendProductData()
    .then( () => {getAndShowAllProducts()} )
    .catch (err => console.error(err)) ;    
})


