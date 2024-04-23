import newRowFunction from "./newRow.js";

const renderSearch = (product, type) => {
    if (type == "catalogo") {
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
            product.imag,
            null,
            "catalogo"
        )
    } else if (type == "inventario") {

    }

}
export default renderSearch