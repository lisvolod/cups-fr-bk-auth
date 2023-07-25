function popUp(message, status) {
    var popup = document.getElementById("popup");
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
    var popup = document.getElementById("popup");
    popup.style.display = "none";
  }