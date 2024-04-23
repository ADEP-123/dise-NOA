const createProduct = (lastProducts, inputsArray) => {
    let newProducts = lastProducts;

    const newProduct = {
        id: lastProducts.length,
        titulo: inputsArray[0].value,
        desc: inputsArray[1].value,
        imag: inputsArray[2].value
    }
    newProducts.push(newProduct);
    return newProducts
}
export default createProduct