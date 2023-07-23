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
         </div>`
        // Розміщаємо модалку
        this.modalContaiter.appendChild(this.modalOverlay);

        // Навішуємо обробник для закривання
        this.modalOverlay.addEventListener('click', event => {
            if (event.target.dataset.close) {
                this.close();
            }
        }) 
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
        dropDownClose();
    }
}

// Закривання випадаючого меню в адаптиві при закриванні модального вікна
function dropDownClose() {
    document.getElementById("n_bar").classList.remove('show');
}

