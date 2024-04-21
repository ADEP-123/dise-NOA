const catalButton = document.querySelector(".catalButton");

catalButton.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();

})

// catalogo
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