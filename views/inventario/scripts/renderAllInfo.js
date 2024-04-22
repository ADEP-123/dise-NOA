import newRowFunction from "./newRow.js";

const renderAllInfo = (productsList, inventaryList, type) => {
    if (type == "catalogo") {
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
                    element.imag,
                    null,
                    "catalogo"
                )
            }
        });
    } else if (type == "inventario") {
        const inventario = document.querySelector("#invent")
        inventario.innerHTML =/*html*/`<tr>
        <th>ID</th>
        <th>Tiutlo</th>
        <th>Descripcion</th>
        <th>Imagen</th>
        <th>Cantidad</th>
        </tr>`
        inventaryList.forEach((element, index) => {
            newRowFunction(
                element.idInvent,
                productsList[element.idCatal].titulo,
                productsList[element.idCatal].desc,
                productsList[element.idCatal].imag,
                element.cantidad,
                "inventario"
            )
        });

    }

}
export default renderAllInfo