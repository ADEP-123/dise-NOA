import newRowFunction from "./newRow.js";

const renderSearch = (product) => {
    const catalogo = document.querySelector("#catal")
    catalogo.innerHTML =/*html*/`<tr>
    <th>ID</th>
    <th>Tiutlo</th>
    <th>Descripcion</th>
    <th>Imagen</th>
    <th>Proveedor</th>
</tr>`;

    newRowFunction(
        product.id,
        product.titulo,
        product.desc,
        product.imag
    )
}
export default renderSearch