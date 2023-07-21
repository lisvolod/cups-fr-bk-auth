async function createOrder() {
    console.log('Order form submited');
    const recipientName = document.forms['orderForm'].elements.recipientName.value;
    const deliveryAddress = document.forms['orderForm'].elements.deliveryAddress.value; 
    const user = getUser();

    const requestPayload = {
        userId: user._id,
        cart: user.cart,
        name: recipientName,
        address: deliveryAddress
    }
    // console.log(recipientName, deliveryAddress);
   
    try {
        await fetch(`${backURL}/order/create`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',   
            },
            body: JSON.stringify(requestPayload)
        });
        orderModal.close();
        document.forms['orderForm'].reset();
    } catch (error) {
        console.error(error);
    }
}


document.forms['orderForm'].addEventListener('submit', (event) => {
    event.preventDefault();
    createOrder();
})