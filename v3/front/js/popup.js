function popUp(message, status) {
    const popup = document.getElementById("popup");
    if (status === 'danger') {
        popup.style.backgroundColor = '#fa9a9a';
    } 
    if (status === 'success') {
        popup.style.backgroundColor = '#b5ffcf';
    }
    
    const popupMessage = document.getElementById("popup-message");
    
    popupMessage.textContent = message;
    popup.style.display = "block";
    
    setTimeout(function() {
      closePopup();
    }, 1500); // Встановіть тривалість вікна тут (у мілісекундах)
  }
  
  function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
  }

function popUpWithCloseBtn(message, status) {
    const popup = document.getElementById("popup-close");
    if (status === 'danger') {
        popup.style.backgroundColor = '#fa9a9a';
    } 
    if (status === 'success') {
        popup.style.backgroundColor = '#b5ffcf';
    }
    const popupMessage = document.getElementById("popup-close-message");
    popupMessage.innerHTML = message;
    popup.style.display = "block";
}
  
function closePopupByBtn() {
    const popup = document.getElementById("popup-close");
    popup.style.display = "none";
  }