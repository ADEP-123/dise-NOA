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

//Lista facturas
const listFactMainDiv = document.querySelector(".listFactMainDiv");
const closeListFactButt = listFactMainDiv.querySelector("#closeWindow")
const openListFactButt = document.querySelector("#listaFacturasCard");
const listTarjFacDiv = document.querySelector(".listaFacturasDiv")



newFactButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    //Limpiar variable factura
    factura = { items: [] };
    //Actualizando constantes del localStorage
    lastInventary1 = JSON.parse(localStorage.getItem("inv1"))
    invent1Tittle = JSON.parse(localStorage.getItem("inv1Tittle"))
    lastCatalog = JSON.parse(localStorage.getItem("products"))
    lastListFacturas = localStorage.getItem("listFact") ? JSON.parse(localStorage.getItem("listFact")) : [];
    //escondiendo el panel principal mostrando el de nueva factura
    mainPanel.style.display = "none";
    newFacturaMainDiv.style.display = "flex";
    //Llenando el select de inventarios
    invenOrSelect.innerHTML =/*html*/`<option value="invent1">${invent1Tittle}</option>`
    //Llenando el select de productos
    let newItemsOptions = ""
    lastInventary1.forEach(element => {
        newItemsOptions +=/*html*/`<option value="${element.idCatal}">${lastCatalog[element.idCatal].titulo}</option>`
    });
    selectItems.innerHTML = newItemsOptions
    cargarCantOptions()
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
    if (factura.items.length == 0) {
        alert("La factura no tiene items")
        return
    }
    //Restar en el inventario
    for (let i = 0; i < factura.items.length; i++) {
        for (let j = 0; j < lastInventary1.length; j++) {
            if (lastInventary1[j].idCatal == factura.items[i].idItem) {
                lastInventary1[j].cantidad = Number(lastInventary1[j].cantidad) - Number(factura.items[i].cantidad)
            }
        }
    }
    localStorage.setItem('inv1', JSON.stringify(lastInventary1));
    factura.id = lastListFacturas.length
    lastListFacturas.push(factura)
    localStorage.setItem('listFact', JSON.stringify(lastListFacturas));
    alert("Factura realizada con exito")
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

    //setear evento de escucha al boton que agregamos
    const lastBotton = itemsFactTable.querySelectorAll(".deleteItem")[itemsFactTable.querySelectorAll(".deleteItem").length - 1]
    lastBotton.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        const idItem = Number(lastBotton.id.replace(/\D/g, ''));

        //Elimiar Item de la lista
        quitarItemFactura(idItem, lastBotton)


    })

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
    calcularTotal()
}

function quitarItemFactura(idItem, buttHTMl) {
    const trItem = buttHTMl.parentNode.parentNode
    const tdsItem = trItem.querySelectorAll("td")
    const cantidadAelim = Number(tdsItem[3].innerHTML);
    for (let i = 0; i < factura.items.length; i++) {
        const element = factura.items[i]
        if (element.idItem = idItem) {
            if (element.cantidad == cantidadAelim) {
                factura.items.splice(i, 1)
            } else {
                element.cantidad -= cantidadAelim
            }
        }
    }
    itemsFactTable.removeChild(trItem)
    calcularTotal()
}
function calcularTotal() {
    if (factura.length == 0) {
        return
    }
    let totFact = 0;
    factura.items.forEach(element => {
        totFact += Number(element.cantidad) * Number(element.precUnit)
    });
    factura.totFact = totFact
}

//abrir lista de facturas div
openListFactButt.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    mainPanel.style.display = "none";
    listFactMainDiv.style.display = "flex";
    lastListFacturas = localStorage.getItem("listFact") ? JSON.parse(localStorage.getItem("listFact")) : [];
    if (lastListFacturas.length == 0) {
        alert("No hay facturas registradas")
        return
    }
    for (let i = 0; i < lastListFacturas.length; i++) {
        const element = lastListFacturas[i]
        const card = document.createElement("div")
        card.classList.add("facturaCard");
        card.classList.add("shadowBorder");
        card.id = `fact${element.id}`;
        card.innerHTML =/*html*/`<h1>Factura ${element.id}</h1>
        <p><b>Fecha: </b>${element.fecha}
        <br><b>Nombre Cliente: </b>${element.nomClient}
        <br><b>Id Cliente: </b>${element.idClient}
        <br><b>Valor Facturado: </b>$ ${element.totFact}
        </p>
        <p><b>Items</b></p>
        <div class="itemsCardFact"></div>`
        listTarjFacDiv.insertAdjacentElement("beforeend", card);
        const cardHtml = listTarjFacDiv.querySelector(`#fact${element.id}`)
        const itemsCardHtml = cardHtml.querySelector(".itemsCardFact")
        let pitems = ""
        element.items.forEach(item => {
            pitems +=/*html*/`<p>${item.titulo}</p>`
        });
        itemsCardHtml.innerHTML = pitems;
    }
})

// cerar lista de facturas div
closeListFactButt.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    mainPanel.style.display = "flex";
    listFactMainDiv.style.display = "none";
})