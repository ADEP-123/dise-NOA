const newFactButton = document.querySelector("#newFactDivButt")
const newFacturaMainDiv = document.querySelector(".newFacturaMainDiv");
const mainPanel = document.querySelector(".mainPanel");
const invenOrSelect = document.querySelector("#inventOr");
const newFacturaForm = newFacturaMainDiv.querySelector("#newFacturaForm");
const closeFactButton = newFacturaMainDiv.querySelector("#closeWindow")
const selectItemForm = newFacturaMainDiv.querySelector("#selectItemForm");
const selectItems = selectItemForm.querySelector("select")
let lastInventary1 = JSON.parse(localStorage.getItem("inv1"))
let invent1Tittle = JSON.parse(localStorage.getItem("inv1Tittle"))
let lastCatalog = JSON.parse(localStorage.getItem("products"))



newFactButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    //Actualizando constantes del localStorage
    lastInventary1 = JSON.parse(localStorage.getItem("inv1"))
    invent1Tittle = JSON.parse(localStorage.getItem("inv1Tittle"))
    lastCatalog = JSON.parse(localStorage.getItem("products"))
    //escondiendo el panel principal mostrando el de nueva factura
    mainPanel.style.display = "none";
    newFacturaMainDiv.style.display = "flex";
    //Llenando el select de inventarios
    invenOrSelect.innerHTML =/*html*/`<option value="invent1">${invent1Tittle}</option>`
    //Llenando el select de productos
    let newItemsOptions = ""
    console.log({ lastInventary1, lastCatalog });
    lastInventary1.forEach(element => {
        newItemsOptions +=/*html*/`<option value="${element.idInvent}">${lastCatalog[element.idCatal].titulo}</option>`
    });
    selectItems.innerHTML = newItemsOptions
})

//Evento para cerrar el panel de nueva factura
closeFactButton.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    mainPanel.style.display = "flex";
    newFacturaMainDiv.style.display = "none";
})

//Evento para enviar la factura
newFacturaForm.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(newFacturaForm);
    const formObject = {};
    let campVacio = false;
    formData.forEach((value, key) => {
        if (campVacio) {
            return
        }
        if (value == "") {
            alert(`El Campo ${key} es necesario`)
            campVacio = true;
            return
        } else {
            formObject[key] = value
        }
    })
    console.log(formObject);
})