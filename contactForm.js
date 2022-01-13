let scrollBody = document.querySelector(".scroll");
let noScrollBody = document.querySelector(".no-scroll");

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    noScrollBody.style.overflow="hidden";
}

function closeModal() {
    e
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    scrollBody.style.overflow="auto";
}

//let formSend = document.querySelector(".form_send");

//formSend.addEventListener("click", closeModal());
