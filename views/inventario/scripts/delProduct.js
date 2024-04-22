const delProduct = (listaProductos, id) => {
    const newProducts = listaProductos;

    newProducts[id] = {}

    return newProducts;
}
export default delProduct