///
/// ********* Модальне вікно для створення замовлення
///

const orderModalTitle = `Create order`;
const orderModalContent = `<form name="orderForm" method="post">
    <div class="mb-3 order-recipient-name">
        <label for="recipientName" class="form-label">Recipient name</label>
        <input type="text" class="form-control" id="recipientName" name="recipientName" placeholder="-- enter the recipient's full name --" required>
    </div>
    <div class="mb-3 order-delivery-address">
        <label for="deliveryAddress" class="form-label">Delivery address</label>
        <textarea class="form-control" id="deliveryAddress" name="deliveryAddress" rows="3" required></textarea>
    </div>
    <div class="modal-form-footer">
        <input type="submit" class="btn btn-success" id="orderSubmitBtn" value="Confirm">
    </div>
</form>`  ;
const orderModalFooter =``;
const orderModal = new CustomModal(orderModalTitle, orderModalContent, orderModalFooter);
orderModal.create('ordr');