const newRowFunction = (id, tit, desc, cant, img) => {
    const catalogo = document.querySelector("#catal")
    const newRow = document.createElement("tr")
    newRow.innerHTML =/*html*/`<td>${id}</td>
    <td>${tit}</td>
    <td>${desc}</td>
    <td>${cant}</td>
    <td><img src="${img}">
    </td>
    <td>-</td>`
    catalogo.insertAdjacentElement("beforeend", newRow);
}
export default newRowFunction