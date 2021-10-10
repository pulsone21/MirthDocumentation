class InfoBox {
    static Info(msg) {
        CreateInfoBox("infoBox", msg)
        console.log(msg)
    }

    static Error(msg) {
        CreateInfoBox("errorBox", msg)
        console.error(msg)
    }
}
/**
 * 
 * @param {string} modalClass 
 * @param {string} msg 
 */
function CreateInfoBox(modalClass, msg) {
    const infoModal = document.createElement("div")
    infoModal.classList.add(modalClass);
    infoModal.innerHTML = `<span class="articalText">${msg}</span>`
    $("body").append(infoModal);
}

