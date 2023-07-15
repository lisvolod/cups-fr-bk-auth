function popUp(message) {
    var popup = document.getElementById("popup");
    var popupMessage = document.getElementById("popup-message");
    
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