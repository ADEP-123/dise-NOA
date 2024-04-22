const traerInfo = (lastProducts, id) => {

    const modObjectDiv = document.querySelector("#modObject");
    const inputs = modObjectDiv.querySelectorAll("input")
    inputs[0].value = lastProducts[id].titulo;
    inputs[1].value = lastProducts[id].desc;
    inputs[2].value = lastProducts[id].imag;

}
export default traerInfo;