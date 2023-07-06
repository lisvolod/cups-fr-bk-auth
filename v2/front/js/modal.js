//Визначаємо клас, на основі якого будемо генерувати модальні вікна
class CustomModal {
    constructor(title, content, footer) {
        this.title = title;
        this.content = content;
        this.footer = footer;        
    }

    modalContaiter = document.querySelector(".modal-container");
    modalOverlay = document.createElement("div");
    
    create() {
        this.modalOverlay = document.createElement("div");
        this.modalOverlay.classList.add("modal-overlay");
        this.modalOverlay.classList.add("modal-close");
        this.modalOverlay.dataset.close = "true";
        this.modalOverlay.setAttribute("id", "modalOverlay");
        this.modalOverlay.innerHTML = `
        <div class="modal-window">
        
            <div class="modal-header">
                <span class="modal-title" id="modalTitle">${this.title}</span>
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
productModal.create();

//Функції для зміни режиму вікна Створення/Редагування
function convertModalToEdit() {
    document.getElementById('modalTitle').innerText = "Edit pdoduct";
    document.getElementById('submitProductBtn').value = "Confirm" 
}

function convertModalToCreate() {
    document.getElementById('modalTitle').innerText = "Create pdoduct";
    document.getElementById('submitProductBtn').value = "Create" 
}

//
// ********* Модальне вікно для подтвердження видалення продукту ************
//
const confirmModalTitle = `Removal confirmation`;
const confirmModalContent = `Are you sure you want to remove this product?`;
const confirmModalFooter =`<div class="confirmation-footer">
                                <input type="submit" class="btn btn-danger" id="removeProductBtn" value="Remove">
                                <input type="reset" class="btn btn-success" id="cancelProductBtn" data-close="true" value="Cancel">
                            </div>`;
const confirmModal = new CustomModal(confirmModalTitle, confirmModalContent, confirmModalFooter);
confirmModal.create();

//
// ********* Модальне вікно для авторизації ************
//
const loginModalTitle = `LogIn`;
const loginModalContent = `<form name="loginForm" enctype="multipart/form-data" method="post">
                                <table class="form-table">
                                    <tr>
                                        <td class="form-label"><label for="userLoginEmail">Email:</label> </td>
                                        <td class="form-input"><input type="text" name="userLoginEmail" id="userLoginEmail" class="form-control" ></td>
                                    </tr>
                                    <tr>
                                        <td class="form-label"><label for="userLoginPassword">Password:</label> </td>
                                        <td class="form-input"><input type="password" name="userLoginPassword" id="userLoginPassword" class="form-control"></td>
                                    </tr>
                                    
                                </table>
                                <div class="modal-form-footer">
                                    <input type="submit" class="btn btn-success" id="submitLoginBtn" value="LogIn">
                                </div>
                            </form>`  ;

const loginModalFooter =`<div class="login-footer">
                            <div>Not a member? </div>
                            <div> <a href="#">SignUp</a>
                        </div>`;
const loginModal = new CustomModal(loginModalTitle, loginModalContent, loginModalFooter);
loginModal.create();

//
// ********* Модальне вікно для реєстрації ************
//
const registrationModalTitle = `Registration`;
const registrationModalContent = `<form name="registrationForm" enctype="multipart/form-data" method="post">
                                <table class="form-table">
                                    <tr>
                                        <td class="form-label"><label for="userRegEmail">Email:</label> </td>
                                        <td class="form-input"><input type="text" name="userRegEmail" id="userRegEmail" class="form-control" ></td>
                                    </tr>
                                    <tr>
                                        <td class="form-label"><label for="userRegPassword">Password:</label> </td>
                                        <td class="form-input"><input type="password" name="userRegPassword" id="userRegPassword" class="form-control"></td>
                                    </tr>
                                    <tr>
                                        <td class="form-label"><label for="userRegConfirmPassword">Password confirm:</label> </td>
                                        <td class="form-input"><input type="password" name="userRegConfirmPassword" id="userRegConfirmPassword" class="form-control"></td>
                                    </tr>
                                    
                                </table>
                                <div class="modal-form-footer">
                                    <input type="submit" class="btn btn-success" id="submitRegistrationtBtn" value="Submit">
                                </div>
                            </form>`  ;

const registrationModalFooter =``;
const registrationModal = new CustomModal(registrationModalTitle, registrationModalContent, registrationModalFooter);
registrationModal.create();



// ********* Функціонал для закривання модальних вікон ********
const modalWindowsCollection = document.getElementsByClassName("modal-overlay");

const clearHiddenProductFormAttrib = () => {
    document.forms["productForm"].reset()
    document.getElementById("productId").removeAttribute("value");
    document.getElementById("oldCloudinaryPublicId").removeAttribute("value");
}

const closeListener = event => {
    if (event.target.dataset.close && productModal) {
        productModal.close();
        clearHiddenProductFormAttrib()
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
}

Array.from(modalWindowsCollection).forEach(modal => {
    modal.addEventListener("click", closeListener)
});



/// OLD code
// function buildModal(params) {
//     const modalContaiter = document.querySelector(".modal-container");
//     const modalOverlay = document.createElement("div");
//     modalOverlay.classList.add("modal-overlay");
//     modalOverlay.classList.add("modal-close");
//     modalOverlay.dataset.close = "true";
//     modalOverlay.setAttribute("id", "modalOverlay");
//     modalOverlay.innerHTML = `
//     <div class="modal-window">
    
//         <div class="modal-header">
//             <span class="modal-title">Product Options</span>
//             <span class="modal-close-btn" data-close="true">&times;</span>
//         </div>
    
//         <div class="modal-content">
//             <form name="productForm" enctype="multipart/form-data" method="post">
//                 <input type="hidden" name="productId" id="productId">
//                 <input type="hidden" name="oldCloudinaryPublicId" id="oldCloudinaryPublicId">
//                 <input type="hidden" name="oldImagePath" id="oldImagePath">
//                 <table class="form-table">
//                     <tr>
//                         <td class="form-label"><label for="productName">Name:</label> </td>
//                         <td class="form-input"><input type="text" name="productName" id="productName" class="form-control" ></td>
//                     </tr>
//                     <tr>
//                         <td class="form-label"><label for="productVolume">Volume:</label> </td>
//                         <td class="form-input"><input type="number" name="productVolume" id="productVolume" class="form-control" min="20" max="2000"></td>
//                     </tr>
//                     <tr>
//                         <td class="form-label"><label for="productMaterial">Material:</label> </td>
//                         <td class="form-input">
//                             <select name="productMaterial" id="productMaterial" class="form-select" >
//                                 <option>Glass</option>
//                                 <option>Porcelian</option>
//                                 <option>Silicon</option>
//                                 <option>Plastic</option>
//                                 <option>Paper</option>
//                             </select>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td colspan="2" class="form-image-container">
//                             <img class="form-image" id="formImage" >
//                         </td>
//                     </tr>
//                     <tr>
//                         <td class="form-label"><label for="productImage">Image:</label> </td>
//                         <td class="form-input"><input type="file" name="productImage" id="productImage" class="form-control" onchange="document.getElementById('formImage').src = window.URL.createObjectURL(this.files[0])"></td>
//                     </tr>
//                 </table>
//                 <div class="modal-footer">
//                     <input type="submit" class="btn btn-success" id="submitBtn" value="Confirm">
//                     <input type="reset" class="btn btn-danger" id="cancelBtn" data-close="true" value="Cancel">
//                 </div>
//             </form>
//         </div>
//     </div>`
// modalContaiter.appendChild(modalOverlay);
// }

// function modalOpen() {
//     modalOverlay.classList.remove("modal-close");
//     modalOverlay.classList.add("modal-open");
// }

// function modalClose() {
//     modalOverlay.classList.remove("modal-open");
//     modalOverlay.classList.add("modal-close");
//     document.getElementById('formImage').removeAttribute("src");
//     //Закриваємо випадаюче меню в адаптиві при закриванні модального вікна
//     document.getElementById("n_bar").classList.toggle('show');
   
// }

// const modalOverlay = document.querySelector(".modal-overlay");



// const listener = event => {
//     if (event.target.dataset.close) {
//         modalClose()
//     }
// }

// buildModal();

// modalOverlay.addEventListener("click", listener);