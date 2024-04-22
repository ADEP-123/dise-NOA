const llenarSelect = (products) => {
    const selectProduct = document.querySelector("#searcProdSelect");
    const selectModProduct = document.querySelector("#modProdSelect");

    products.forEach(element => {
        const newOption = document.createElement("option");
        newOption.value = element.id;
        newOption.innerHTML = `${element.titulo}`

        selectModProduct.insertAdjacentElement("beforeend", newOption);
        selectProduct.insertAdjacentElement("beforeend", newOption);
    });
}
export default llenarSelect