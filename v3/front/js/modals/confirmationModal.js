//
// ********* Модальне вікно для підтвердження видалення продукту ************
//
const confirmModalTitle = `Removal confirmation`;
const confirmModalContent = `<div class="confirmation-message"></div> `;
const confirmModalFooter =`<div class="confirmation-footer">
                                <input type="submit" class="btn btn-danger" id="removeProductBtn" value="Remove">
                                <input type="reset" class="btn btn-success" id="cancelProductBtn" data-close="true" value="Cancel">
                            </div>`;
const confirmModal = new CustomModal(confirmModalTitle, confirmModalContent, confirmModalFooter);
confirmModal.create("cfm");

// Кнопка Remove у модалці Removal confirmation
const removeButton = document.getElementById('removeProductBtn');

// Функція, яка повертає проміс, який буде вирішений (resolved) 
// при натисканні кнопки Remove у модалці Removal confirmation
function waitForRemoveButtonPress() {
        return new Promise((resolve, reject) => {
            removeButton.addEventListener('click', () => {
            resolve();                  // Вирішити проміс, коли кнопка буде натиснута
        });
    });
}