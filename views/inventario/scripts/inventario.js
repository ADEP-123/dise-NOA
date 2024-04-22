import createProduct from "./createProduct.js";
import delProduct from "./delProduct.js";
import llenarSelect from "./llenarSelect.js";
import modProduct from "./modProduct.js";
import newRowFunction from "./newRow.js";
import renderAllInfo from "./renderAllInfo.js";
import renderSearch from "./renderSearch.js";
import traerInfo from "./traerInfo.js";

const catalButton = document.querySelector(".catalButton");
const mainPanel = document.querySelector(".mainPanel");
const catalMainDiv = document.querySelector(".catalMainDiv");
const modProdSelect = document.querySelector("#modProdSelect");

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
    renderAllInfo(lastProducts)
    llenarSelect(lastProducts)
    traerInfo(lastProducts, Number(modProdSelect.value));
} else {
    lastProducts = []
    newRowFunction(
        0,
        "ej",
        "ej",
        "https://cdn-icons-png.flaticon.com/512/1554/1554591.png"
    )
}

// Apertura y cierre del menu de creacion o modificacion
const openModMenuCat = document.querySelector(".modorNewObjectButt");
const catalInfo = document.querySelector(".catalInfo");
let ispOpenCat = false;
openModMenuCat.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    const menu = openModMenuCat.parentNode;
    const modObjectSide = document.querySelector(".modOrNewObject");
    if (ispOpenCat == false) {
        menu.style.width = "20%"
        catalInfo.style.width = "80%"
        openModMenuCat.style.width = "10%"
        openModMenuCat.innerHTML = "→"
        modObjectSide.style.display = "flex"
        ispOpenCat = true
    } else {
        menu.style.width = "2%"
        catalInfo.style.width = "98%"
        openModMenuCat.style.width = "100%"
        openModMenuCat.innerHTML = "←"
        modObjectSide.style.display = "none"
        ispOpenCat = false
    }
})

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
            inputsCreate[2].value
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
    renderAllInfo(lastProducts);
    llenarSelect(lastProducts);
})

//Eliminar elemento
const deltButt = document.querySelector("#deltButt");
deltButt.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    lastProducts = delProduct(lastProducts, Number(modProdSelect.value));
    localStorage.removeItem('products');
    localStorage.setItem('products', JSON.stringify(lastProducts));
    renderAllInfo(lastProducts);
    llenarSelect(lastProducts);
})

//Buscar elemento
const selectProduct = document.querySelector("#searcProdSelect");
const searchButton = document.querySelector("#searchButt");
searchButton.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    const productId = Number(selectProduct.value)
    renderSearch(lastProducts[productId])
})

const backButt = document.querySelector("#backButt");
backButt.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    renderAllInfo(lastProducts);
})

