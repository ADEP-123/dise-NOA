const createInventary = (lastInventary, producto) => {
    let newInventary = lastInventary;

    const newProduct = {
        idInvent: lastInventary.length,
        idCatal: producto.id,
        cantidad: producto.cantidad
    }
    newInventary.push(newProduct);
    return newInventary
}
export default createInventary