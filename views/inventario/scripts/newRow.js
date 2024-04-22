const newRowFunction = (id, tit, desc, img, cant, type) => {
    const newRow = document.createElement("tr")
    if (type == "catalogo") {
        const catalogo = document.querySelector("#catal")
        newRow.innerHTML =/*html*/`<td>${id}</td>
        <td>${tit}</td>
        <td>${desc}</td>
        <td><img src="${img}"></td>
        <td>-</td>`
        catalogo.insertAdjacentElement("beforeend", newRow);
    } else if (type == "inventario") {
        const inventario = document.querySelector("#invent")
        newRow.innerHTML =/*html*/`<td>${id}</td>
        <td>${tit}</td>
        <td>${desc}</td>
        <td><img src="${img}"></td>
        <td>${cant}</td>`
        inventario.insertAdjacentElement("beforeend", newRow);
    }

}
export default newRowFunction