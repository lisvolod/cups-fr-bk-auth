//
// ********* Модальне вікно для створення та редагування продукту ************
// 

const createAndEditProductModalContent = () => {
    return `<form name="productForm" enctype="multipart/form-data" method="post">
                <input type="hidden" name="productId" id="productId">
                <input type="hidden" name="oldCloudinaryPublicId" id="oldCloudinaryPublicId">
                <input type="hidden" name="oldImagePath" id="oldImagePath">
                <table class="form-table">
                    <tr>
                        <td class="form-label"><label for="producCategory">Category:</label> </td>
                        <td class="form-input">
                            <select name="producCategory" id="producCategory" class="form-select" required>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="form-label"><label for="productName">Name:</label> </td>
                        <td class="form-input"><input type="text" name="productName" id="productName" class="form-control" required></td>
                    </tr>
                    <tr>
                        <td class="form-label"><label for="productVolume">Volume:</label> </td>
                        <td class="form-input"><input type="number" name="productVolume" id="productVolume" class="form-control" min="20" max="2000" required></td>
                    </tr>
                    <tr>
                        <td class="form-label"><label for="productMaterial">Material:</label> </td>
                        <td class="form-input">
                            <select name="productMaterial" id="productMaterial" class="form-select" required>
                                <option>Glass</option>
                                <option>Porcelian</option>
                                <option>Silicon</option>
                                <option>Plastic</option>
                                <option>Paper</option>
                                <option>Metal</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="form-image-container">
                            <img class="form-image" id="formImage" >
                        </td>
                    </tr>
                    <tr>
                        <td class="form-label"><label for="productImage">Image:</label> </td>
                        <td class="form-input"><input type="file" name="productImage" id="productImage" class="form-control" onchange="document.getElementById('formImage').src = window.URL.createObjectURL(this.files[0])" ></td>
                    </tr>
                    <tr>
                        <td class="form-label"><label for="productPrice">Price, &#x20b4:</label> </td>
                        <td class="form-input"><input type="number" name="productPrice" id="productPrice" class="form-control" required></td>
                    </tr>
                </table>
                <div class="modal-form-footer">
                    <input type="submit" class="btn btn-success" id="submitProductBtn" value="Create">
                    <input type="reset" class="btn btn-danger" id="cancelProductBtn" data-close="true" value="Cancel">
                </div>
            </form>`    
}

const productModalTitle = `Create product`;
const productModalContent = createAndEditProductModalContent()
const productModalFooter =``;
const productModal = new CustomModal(productModalTitle, productModalContent, productModalFooter);
productModal.create('prd');


//Функції для зміни режиму вікна Створення/Редагування

function convertModalToEdit() {
    document.getElementById('prd').innerText = "Edit product";
    document.getElementById('submitProductBtn').value = "Confirm" 
}

function convertModalToCreate() {
    document.getElementById('prd').innerText = "Create product";
    document.getElementById('submitProductBtn').value = "Create" 
}

function openProductModalWithCreate() {
    convertModalToCreate();
    renderProductCategoriesOptions();
    productModal.open();
}

// Випадаючий список для категорій товарів в модалці продуктів
// тобто дані блоки перемальовуються при створенні нової категорії

function renderProductCategoriesOptions() {
    
    // Вибираємо select модалкки продуктів i очищуємо його
    const producCategory = document.getElementById('producCategory');
    // console.log('producCategory', producCategory);
    producCategory.innerHTML = ``;
    // Додаємо в нього опцію по замовчуванню 
    // <option disabled selected value> -- select a category -- </option>
    const defaultProductCategoryOption = document.createElement('option');
    defaultProductCategoryOption.setAttribute("disabled", "");
    defaultProductCategoryOption.setAttribute("selected", "");
    defaultProductCategoryOption.setAttribute("value", "");
    defaultProductCategoryOption.innerText = ` -- select a category -- `;
    producCategory.appendChild(defaultProductCategoryOption);
    
    // Вибираємо категорії товарів з LS
    const categoryArr = getCategories();
    
    categoryArr.forEach(category => {
        const categoryOption = document.createElement('option');
        categoryOption.value = category._id;
        categoryOption.innerText = `${category.name}`;
        producCategory.appendChild(categoryOption);
    });
}