const llenarSelectsInvent = (productsCat, productsInvent) => {
    const adProdSelect = document.querySelector("#adProdSelect");
    const modProdSelectInvent = document.querySelector("#modProdSelectInvent");
    adProdSelect.innerHTML = "";
    modProdSelectInvent.innerHTML = "";

    productsCat.forEach(element => {
        if (element.titulo) {
            const newOption = document.createElement("option");
            newOption.value = element.id;
            newOption.innerHTML = `${element.id}-${element.titulo}`

            adProdSelect.insertAdjacentElement("beforeend", newOption);
        }

    });

    productsInvent.forEach((element, index) => {
        if (element.titulo) {
            const newOption = document.createElement("option");
            newOption.value = element.idInvent;
            newOption.innerHTML = `${element.idInvent}-${productsCat[index].titulo}`

            modProdSelectInvent.insertAdjacentElement("beforeend", newOption);
        }

    });

}
export default llenarSelectsInvent