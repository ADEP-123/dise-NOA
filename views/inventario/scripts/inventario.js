import createInventary from "./createInventary.js";
import createProduct from "./createProduct.js";
import delProduct from "./delProduct.js";
import existinventory from "./existinventory.js";
import llenarSelect from "./llenarSelect.js";
import llenarSelectsInvent from "./llenarSelectsInvent.js";
import modInventory from "./modInventroy.js";
import modProduct from "./modProduct.js";
import newRowFunction from "./newRow.js";
import renderAllInfo from "./renderAllInfo.js";
import renderSearch from "./renderSearch.js";
import traerInfo from "./traerInfo.js";

const catalButton = document.querySelector(".catalButton");
const mainPanel = document.querySelector(".mainPanel");
const catalMainDiv = document.querySelector(".catalMainDiv");
const modProdSelect = document.querySelector("#modProdSelect");
let lastInventary1 = JSON.parse(localStorage.getItem("inv1"))

catalButton.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    mainPanel.style.display = "none";
    catalMainDiv.style.display = "flex";
})

// catalogo
const catalogo = document.querySelector("#catal")
const closeCatalogButt = document.querySelector("#closeWindow")
closeCatalogButt.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    mainPanel.style.display = "flex";
    catalMainDiv.style.display = "none";
})

//Renderizado de tabla
//localStorage.removeItem('products');
let lastProducts = localStorage.getItem("products")
if (lastProducts) {
    lastProducts = JSON.parse(lastProducts);
    renderAllInfo(lastProducts, null, "catalogo")
    llenarSelect(lastProducts)
    traerInfo(lastProducts, Number(modProdSelect.value));
} else {
    lastProducts = []
    newRowFunction(
        0,
        "ej",
        "ej",
        "https://cdn-icons-png.flaticon.com/512/1554/1554591.png",
        null,
        "catalogo"
    )
}

// Apertura y cierre del menu de creacion o modificacion
const openModMenuCat = document.querySelectorAll(".modorNewObjectButt");
const catalInfo = document.querySelector(".catalInfo");
let ispOpenCat = false;
openModMenuCat.forEach((element, index) => {
    element.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        const menu = element.parentNode;
        const modObjectSide = menu.querySelector(".modOrNewObject");
        if (ispOpenCat == false) {
            menu.style.width = "20%"
            catalInfo.style.width = "80%"
            element.style.width = "10%"
            element.innerHTML = "→"
            modObjectSide.style.display = "flex"
            ispOpenCat = true
        } else {
            menu.style.width = "2%"
            catalInfo.style.width = "98%"
            element.style.width = "100%"
            element.innerHTML = "←"
            modObjectSide.style.display = "none"
            ispOpenCat = false
        }
    })
});


//Creacion de nuevo elemento
const createZone = document.querySelector("#createZone")
const creatButton = createZone.querySelector("button");
creatButton.addEventListener("click", e => {
    e.preventDefault()
    e.stopPropagation()
    const inputsCreate = createZone.querySelectorAll("input")
    let anyfalse = false;
    inputsCreate.forEach(element => {
        element.value == null ? anyfalse = true : null;
        element.value == "" ? anyfalse = true : null;
    });
    if (anyfalse == false) {
        if (lastProducts.length == 0) {
            const defTr = catalogo.querySelectorAll("tr")[1];
            catalogo.removeChild(defTr)
        }
        newRowFunction(
            lastProducts.length,
            inputsCreate[0].value,
            inputsCreate[1].value,
            inputsCreate[2].value,
            null,
            "catalogo"
        )
        lastProducts = createProduct(lastProducts, inputsCreate)
        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(lastProducts));
        llenarSelect(lastProducts);
    } else {
        console.error("no puede haber campos vacios");
    }

})

//Modificar elemento
modProdSelect.addEventListener("change", e => {
    e.preventDefault();
    e.stopPropagation();
    traerInfo(lastProducts, Number(modProdSelect.value));
})

const saveMod = document.querySelector("#saveMod");
saveMod.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    lastProducts = modProduct(lastProducts, Number(modProdSelect.value));
    localStorage.removeItem('products');
    localStorage.setItem('products', JSON.stringify(lastProducts));
    renderAllInfo(lastProducts, null, "catalogo");
    llenarSelect(lastProducts);
})

//Eliminar elemento
const deltButt = document.querySelector("#deltButt");
deltButt.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    let haveInvent = false;
    lastInventary1.forEach(element => {
        console.log(modProdSelect.value);
        console.log(element.idCatal);
        if (modProdSelect.value == element.idCatal) {
            if (Number(element.cantidad) != 0) {
                haveInvent = true
            }
        }
    });
    if (haveInvent == false) {
        lastProducts = delProduct(lastProducts, Number(modProdSelect.value));
        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(lastProducts));
        renderAllInfo(lastProducts, null, "catalogo");
        llenarSelect(lastProducts);
    } else {
        alert("El elemento que intenta eliminar tiene inventario existente")
    }

})

//Buscar elemento
const selectProduct = document.querySelector("#searcProdSelect");
const searchButton = document.querySelector("#searchButt");
searchButton.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    const productId = Number(selectProduct.value)
    renderSearch(lastProducts[productId], "catalogo")
})

const backButt = document.querySelector("#backButt");
backButt.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    renderAllInfo(lastProducts, null, "catalogo");
})

//inventario
//localStorage.removeItem("inv1")

if (lastInventary1) {
    renderAllInfo(lastProducts, lastInventary1, "inventario")
} else {
    lastInventary1 = []
    newRowFunction(
        0,
        "-",
        "-",
        "https://cdn-icons-png.flaticon.com/512/1554/1554591.png",
        0,
        "inventario"
    )
}
llenarSelectsInvent(lastProducts, lastInventary1)

const invent1Butt = document.querySelector("#invent1Butt")
const inventMainDiv = document.querySelector("#invent1MainDiv")
const inventario = document.querySelector("#invent")
invent1Butt.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    mainPanel.style.display = "none";
    inventMainDiv.style.display = "flex";
})

const closeInventButt = document.querySelector("#closeInvent")
closeInventButt.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    mainPanel.style.display = "flex";
    inventMainDiv.style.display = "none";
})
//Agregar a inventario
const addProductZone = document.querySelector("#addProduct")
const adProductButon = addProductZone.querySelector("button");
const adProdSelect = document.querySelector("#adProdSelect")
adProductButon.addEventListener("click", e => {
    e.preventDefault()
    e.stopPropagation()
    const inputsAdd = addProductZone.querySelectorAll("input")
    let anyfalse = false;
    inputsAdd.forEach(element => {
        element.value == null ? anyfalse = true : null;
        element.value == "" ? anyfalse = true : null;
    });
    if (anyfalse == false) {
        if (lastInventary1.length == 0) {
            const defTr = inventario.querySelectorAll("tr")[1];
            inventario.removeChild(defTr)
        }
        const producto = lastProducts[Number(adProdSelect.value)]
        producto.cantidad = inputsAdd[0].value
        let exist = existinventory(producto.id, lastInventary1);
        if (exist == false) {
            newRowFunction(
                lastInventary1.length,
                producto.titulo,
                producto.desc,
                producto.imag,
                producto.cantidad,
                "inventario"
            )
            lastInventary1 = createInventary(lastInventary1, producto)
        } else {
            lastInventary1 = modInventory(lastInventary1, producto.id, "addExist")
            renderAllInfo(lastProducts, lastInventary1, "inventario")
        }
        localStorage.removeItem('inv1');
        localStorage.setItem('inv1', JSON.stringify(lastInventary1));
        llenarSelectsInvent(lastProducts, lastInventary1);
    } else {
        console.error("no puede haber campos vacios");
    }
})

//Modificar inventario