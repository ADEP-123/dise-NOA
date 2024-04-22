const modInventory = (listInventory, id, type) => {
    if (type == "addExist") {
        const newCantidad = Number(document.querySelector("#cant").value);
        listInventory.forEach(element => {
            if (element.idCatal == id) {
                element.cantidad = Number(element.cantidad) + newCantidad
            }
        });

    } else if (type == "modExist") {
        const cantModInput = document.querySelector("#cantMod")
        listInventory.forEach(element => {
            if (element.idInvent == id) {
                element.cantidad = cantModInput.value
            }
        });
    }
    return listInventory;
}
export default modInventory