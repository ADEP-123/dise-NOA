const delProduct = (listaProductos, id) => {
    const newProducts = listaProductos;

    newProducts.splice(id, 1);

    return newProducts;
}
export default delProduct