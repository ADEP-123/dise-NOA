const modInventory = (listInventory, id, type) => {
    if (type == "addExist") {
        const newCantidad = Number(document.querySelector("#cant").value);
        listInventory.forEach(element => {
            if (element.idCatal == id) {
                element.cantidad = Number(element.cantidad) + newCantidad
            }
        });

    } else if (type == "modExist") {
        const modObjectDiv = document.querySelector("#modObjectInvent");
    }
    return listInventory;
}
export default modInventory