//Визначаємо клас, на основі якого будемо генерувати модальні вікна
class CustomModal {
    constructor(title, content, footer) {
        this.title = title;
        this.content = content;
        this.footer = footer;        
    }

    modalContaiter = document.querySelector(".modal-container");
    modalOverlay = document.createElement("div");
    
    create(name) {
        this.modalOverlay = document.createElement("div");
        this.modalOverlay.classList.add("modal-overlay");
        this.modalOverlay.classList.add("modal-close");
        this.modalOverlay.dataset.close = "true";
        this.modalOverlay.setAttribute("id", "modalOverlay");
        this.modalOverlay.innerHTML = `
        <div class="modal-window">
        
            <div class="modal-header">
                <span class="modal-title" id="${name}">${this.title}</span>
                <span class="modal-close-btn" data-close="true">&times;</span>
            </div>
        
            <div class="modal-content">
            ${this.content}
            </div>
            <div class="modal-footer">
            ${this.footer}
            </div>
         </div>
        `
        this.modalContaiter.appendChild(this.modalOverlay);
    }

    open() {
        this.modalOverlay.classList.remove("modal-close");
        this.modalOverlay.classList.add("modal-open");
    }

    close() {
        this.modalOverlay.classList.remove("modal-open");
        this.modalOverlay.classList.add("modal-close");
        document.getElementById('formImage').removeAttribute("src");
        //Закриваємо випадаюче меню в адаптиві при закриванні модального вікна
        document.getElementById("n_bar").classList.remove('show');
       
    }

}

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
    productModal.open();
}

//
// ********* Модальне вікно для підтвердження видалення продукту ************
//
const confirmModalTitle = `Removal confirmation`;
const confirmModalContent = `Are you sure you want to remove this product?`;
const confirmModalFooter =`<div class="confirmation-footer">
                                <input type="submit" class="btn btn-danger" id="removeProductBtn" value="Remove">
                                <input type="reset" class="btn btn-success" id="cancelProductBtn" data-close="true" value="Cancel">
                            </div>`;
const confirmModal = new CustomModal(confirmModalTitle, confirmModalContent, confirmModalFooter);
confirmModal.create("cfm");

//
// ********* Модальне вікно для авторизації ************
//
const loginModalTitle = `LogIn`;
const loginModalContent = `<form name="loginForm" method="post">
                                <table class="form-table">
                                    <tr>
                                        <td class="form-label"><label for="userLoginEmail">Email:</label> </td>
                                        <td class="form-input"><input type="text" name="userLoginEmail" id="userLoginEmail" class="form-control" required></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td class="form-email-eror" id="loginEmailError"></td>
                                    </tr>
                                    <tr>
                                        <td class="form-label"><label for="userLoginPassword">Password:</label> </td>
                                        <td class="form-input"><input type="password" name="userLoginPassword" id="userLoginPassword" class="form-control" required></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td class="form-email-eror" id="loginPasswordError"></td>
                                    </tr>
                                    
                                </table>
                                <div class="modal-form-footer">
                                    <input type="submit" class="btn btn-success" id="submitLoginBtn" value="LogIn">
                                </div>
                            </form>`  ;

const loginModalFooter =`<div class="login-footer">
                            <div>Not a member? </div>
                            <div class="switch-link" onclick="switchToRegistration()"> SignUp </div>
                        </div>`;
const loginModal = new CustomModal(loginModalTitle, loginModalContent, loginModalFooter);
loginModal.create('lgn');

//
// ********* Модальне вікно для реєстрації ************
//
const registrationModalTitle = `Registration`;
const registrationModalContent = `<form name="registerForm" method="post">
                                <table class="form-table">
                                    <tr>
                                        <td class="form-label"><label for="userRegName">Name:</label> </td>
                                        <td class="form-input"><input type="text" name="userRegName" id="userRegName" class="form-control" required></td>
                                    </tr>    
                                    <tr>
                                        <td></td>
                                        <td class="form-email-eror"></td>
                                    </tr>
                                    <tr class="form-padding">
                                        <td class="form-label"><label for="userRegEmail">Email:</label> </td>
                                        <td class="form-input"><input type="email" name="userRegEmail" id="userRegEmail" class="form-control" required></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td class="form-email-eror" id="registerEmailError"></td>
                                    </tr>
                                    <tr>
                                        <td class="form-label"><label for="userRegPassword">Password:</label> </td>
                                        <td class="form-input"><input type="password" name="userRegPassword" id="userRegPassword" class="form-control" minlength="6" required></td>
                                    </tr>
                                    <tr>
                                        <td class="form-label"><label for="userRegConfirmPassword">Password confirm:</label> </td>
                                        <td class="form-input"><input type="password" name="userRegConfirmPassword" id="userRegConfirmPassword" class="form-control" minlength="6" required></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td class="form-email-eror" id="registerPasswordError"></td>
                                    </tr>
                                    
                                </table>
                                <div class="modal-form-footer">
                                    <input type="submit" class="btn btn-success" id="submitRegistrationtBtn" value="Submit">
                                </div>
                            </form>`  ;

const registrationModalFooter =`<div class="login-footer">
                                    <div>Already member? </div>
                                    <div class="switch-link" onclick="switchToLogin()"> LogIn </div>
                                </div>`;
const registrationModal = new CustomModal(registrationModalTitle, registrationModalContent, registrationModalFooter);
registrationModal.create('rgstr');


//
// ********* Модальне вікно для створення та редагування продукту ************
// 

const createAndEditCatgoryModalContent = () => {
    return `<form name="categoryForm">
                <table class="form-table">
                    <tr>
                        <td class="form-label"><label for="categoryName">Category name:</label> </td>
                        <td class="form-input"><input type="text" name="categoryName" id="categoryName" class="form-control" required></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="form-email-eror" id="categoryNameError"></td>
                    </tr>
                </table>
                <div class="modal-form-footer">
                    <input type="submit" class="btn btn-success" id="submitCategoryBtn" value="Create">
                </div>
                
            </form>`    
}

const categoryModalTitle = `Create category`;
const categoryModalContent = createAndEditCatgoryModalContent();
const categoryModalFooter =``;
const categoryModal = new CustomModal(categoryModalTitle, categoryModalContent, categoryModalFooter);
categoryModal.create('ctg');

//Функції для зміни режиму вікна Створення/Редагування категорій
function convertCategoryModalToEdit() {
    document.getElementById('ctg').innerText = "Edit category";
    document.getElementById('submitCategoryBtn').value = "Confirm" 
}

function convertCategoryModalToCreate() {
    document.getElementById('ctg').innerText = "Create category";
    document.getElementById('submitCategoryBtn').value = "Create" 
}

function openCategoryModalWithCreate() {
    convertCategoryModalToCreate();
    categoryModal.open();
}

///
/// ********* Функціонал для закривання модальних вікон та очищення форм ********
///
const modalWindowsCollection = document.getElementsByClassName("modal-overlay");

const clearHiddenProductFormAttrib = () => {
    document.forms["productForm"].reset()
    document.getElementById("productId").removeAttribute("value");
    document.getElementById("oldCloudinaryPublicId").removeAttribute("value");
}

const switchToRegistration = () => {
    loginModal.close();
    registrationModal.open();
}

const switchToLogin = () => {
    registrationModal.close();
    loginModal.open();
}

const closeListener = event => {
    if (event.target.dataset.close && productModal) {
        productModal.close();
        clearHiddenProductFormAttrib();
    }
    if (event.target.dataset.close && confirmModal) {
        confirmModal.close()
    }
    if (event.target.dataset.close && loginModal) {
        loginModal.close()
    }
    if (event.target.dataset.close && registrationModal) {
        registrationModal.close()
    }
    if (event.target.dataset.close && categoryModal) {
        categoryModal.close()
    }
}

Array.from(modalWindowsCollection).forEach(modal => {
    modal.addEventListener("click", closeListener)
});
