//
// ********* Модалки для роботи з категоріми продуктів
//
// ********* Модальне вікно для створення категорії продуктів ************
// 

const createCatgoryModalContent = () => {
    return `<form name="createCategoryForm">
                <table class="form-table">
                    <tr>
                        <td class="form-label"><label for="createCategoryName">Category name:</label> </td>
                        <td class="form-input"><input type="text" name="createCategoryName" id="createCategoryName" class="form-control touppercase" required></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="form-email-eror" id="createCategoryNameError"></td>
                    </tr>
                </table>
                <div class="modal-form-footer">
                    <input type="submit" class="btn btn-success" id="submitCreateCategoryBtn" value="Create">
                </div>
                
            </form>`    
}

const createCatgoryModalTitle = `Create category`;
const createCatgoryModalFooter =``;
const createCatgoryModal = new CustomModal(createCatgoryModalTitle, createCatgoryModalContent(), createCatgoryModalFooter);
createCatgoryModal.create('crCtg');

// ********* Модальне вікно для редагування категорії продуктів ************

const editCatgoryModalContent = () => {
    return `<form name="editCategoryForm">
                <input type="hidden" id="editCategoryId" name="editCategoryId">
                <table class="form-table">
                    <tr>
                        <td class="form-label"><label for="editCategoryName">Category name:</label> </td>
                        <td class="form-input"><input type="text" name="editCategoryName" id="editCategoryName" class="form-control touppercase" required></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="form-email-eror" id="editCategoryNameError"></td>
                    </tr>
                </table>
                <div class="modal-form-footer">
                    <input type="submit" class="btn btn-success" id="submitEditCategoryBtn" value="Confirm">
                </div>
                
            </form>`    
}

const editCatgoryModalTitle = `Edit category`;
const editCatgoryModalFooter =``;
const editCatgoryModal = new CustomModal(editCatgoryModalTitle, editCatgoryModalContent(), editCatgoryModalFooter);
editCatgoryModal.create('edCtg');
