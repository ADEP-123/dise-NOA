import newRowFunction from "./newRow.js";

const renderAllInfo = (productsList) => {
    const catalogo = document.querySelector("#catal")
    catalogo.innerHTML =/*html*/`<tr>
    <th>ID</th>
    <th>Tiutlo</th>
    <th>Descripcion</th>
    <th>Imagen</th>
    <th>Proveedor</th>
</tr>`;
    productsList.forEach(element => {
        if (element.titulo) {
            newRowFunction(
                element.id,
                element.titulo,
                element.desc,
                element.imag
            )
        }
    });
}
export default renderAllInfo