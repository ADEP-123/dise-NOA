import createProduct from "./createProduct.js";
import newRowFunction from "./newRow.js";

const catalButton = document.querySelector(".catalButton");

catalButton.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();

})

// catalogo
const catalogo = document.querySelector("#catal")

//Renderizado de tabla
//localStorage.removeItem('products');
let lastProducts = localStorage.getItem("products")
if (lastProducts) {
    lastProducts = JSON.parse(lastProducts);
    lastProducts.forEach(element => {
        newRowFunction(
            element.id,
            element.titulo,
            element.desc,
            element.imag
        )
    });

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
    } else {
        console.error("no puede haber campos vacios");
    }

})


