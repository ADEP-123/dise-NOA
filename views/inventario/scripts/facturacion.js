const newFactButton = document.querySelector("#newFactDivButt")
const newFacturaMainDiv = document.querySelector(".newFacturaMainDiv");
const mainPanel = document.querySelector(".mainPanel");
const invenOrSelect = document.querySelector("#inventOr");
const newFacturaForm = newFacturaMainDiv.querySelector("#newFacturaForm");
const closeFactButton = newFacturaMainDiv.querySelector("#closeWindow")
const selectItemForm = newFacturaMainDiv.querySelector("#selectItemForm");
const selectItems = selectItemForm.querySelector("#item")
const selectCantItem = selectItemForm.querySelector("#cantidad")
let lastInventary1 = JSON.parse(localStorage.getItem("inv1"))
let invent1Tittle = JSON.parse(localStorage.getItem("inv1Tittle"))
let lastCatalog = JSON.parse(localStorage.getItem("products"))
const itemsFactTable = newFacturaMainDiv.querySelector("#itemsFactTab")
let factura = { items: [] };
let lastListFacturas = localStorage.getItem("listFact") ? JSON.parse(localStorage.getItem("listFact")) : [];



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
        newItemsOptions +=/*html*/`<option value="${element.idCatal}">${lastCatalog[element.idCatal].titulo}</option>`
    });
    selectItems.innerHTML = newItemsOptions
    cargarCantOptions()
    console.log(lastListFacturas);
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
            factura[key] = value
        }
    })
    console.log(formObject, factura);
})

//Evento para cargar las opciones de cantidad del item segun lo que hay en el inventario
selectItems.addEventListener("change", (e) => {
    e.preventDefault();
    e.stopPropagation();
    cargarCantOptions()
})

function cargarCantOptions() {
    let nuevaCantOptions = ""
    let cant = 0;
    for (let i = 0; i < lastInventary1.length; i++) {
        if (lastInventary1[i].idCatal == Number(selectItems.value)) {
            cant = Number(lastInventary1[i].cantidad)
        }
    }

    for (let i = 0; i < cant; i++) {
        nuevaCantOptions +=/*html*/`<option value="${i + 1}">${i + 1}</option>`
    }
    selectCantItem.innerHTML = nuevaCantOptions
}

//Evento para agregar mas items a la factura:
selectItemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(selectItemForm);
    const formObject = {};
    let emptyValue = false
    formData.forEach((value, key) => {
        if (value == "") {
            alert("el precio unitario es obligatorio")
            emptyValue = true
        }
        formObject[key] = value
    })
    if (emptyValue) {
        return;
    }
    let isOkcant = false
    factura.items.forEach(element => {
        if (element.idItem == formObject.item) {
            const newCantidad = element.cantidad + Number(formObject.cantidad);
            for (let i = 0; i < lastInventary1.length; i++) {
                if (lastInventary1[i].idCatal == Number(formObject.item)) {
                    if (lastInventary1[i].cantidad < newCantidad) {
                        alert("Imposible insertar la cantidad la nueva cantidad superaria a la disponible en el inventario")
                        isOkcant = true
                    }
                }
            }
        }
    });
    if (isOkcant == true) {
        return
    }

    formObject.titulo = lastCatalog[Number(formObject.item)].titulo;
    formObject.imagen = lastCatalog[Number(formObject.item)].imag;
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML =/*html*/`
    <td>${formObject.item}</td>
    <td>${formObject.titulo}</td>
    <td><img src="${formObject.imagen}"></td>
    <td>${formObject.cantidad}</td>
    <td>$${formObject.precUnit}</td>
    <td><button class="deleteItem" id="delBut${formObject.item}">x</button></td>
    `;
    itemsFactTable.insertAdjacentElement("beforeend", nuevaFila)

    //Setear los valores del item en la factura
    agregarItemAFactura(formObject.item, formObject.titulo, Number(formObject.cantidad), formObject.precUnit)
})

function agregarItemAFactura(idItem, titulo, cantidad, precUnit) {
    let exist = false
    factura.items.forEach(element => {
        if (element.idItem == idItem) {
            element.cantidad += Number(cantidad)
            exist = true
        }
    });
    if (!exist) {
        const item = { idItem, titulo, cantidad, precUnit }
        factura.items.push(item)
    }
}
