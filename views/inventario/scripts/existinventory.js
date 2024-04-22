const existinventory = (idProducto, listInventry) => {
    let result = false
    listInventry.forEach(element => {
        if (element.idCatal == idProducto) {
            result = true;
        }
    });
    return result
}
export default existinventory