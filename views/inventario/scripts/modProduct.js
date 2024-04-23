const modProduct = (listaProductos, id) => {
    const modObjectDiv = document.querySelector(".modObject");
    const inputs = modObjectDiv.querySelectorAll("input")
    const newProducts = listaProductos;

    newProducts[id].titulo = inputs[0].value;
    newProducts[id].desc = inputs[1].value;
    newProducts[id].imag = inputs[2].value;

    return newProducts;
}
export default modProduct