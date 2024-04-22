const llenarSelect = (products) => {
    const selectProduct = document.querySelector("#searcProdSelect");
    const selectModProduct = document.querySelector("#modProdSelect");
    selectProduct.innerHTML = "";
    selectModProduct.innerHTML = "";

    products.forEach(element => {
        const newOption = document.createElement("option");
        const newOption2 = document.createElement("option");
        newOption.value = element.id;
        newOption.innerHTML = `${element.id}-${element.titulo}`
        newOption2.value = element.id;
        newOption2.innerHTML = `${element.id}-${element.titulo}`

        selectModProduct.insertAdjacentElement("beforeend", newOption);
        selectProduct.insertAdjacentElement("beforeend", newOption2);
    });
}
export default llenarSelect