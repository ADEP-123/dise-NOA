export const deplegarModulos = (e) => {
    document.querySelector(".main__modulos").style.display = "block"
    document.querySelector(".main__settings").style.display = "none"
    document.querySelector(".main__help").style.display = "none"
}
//MANIPULACION DEL DOM
let modulos = document.querySelector(".modulSel")
modulos.addEventListener("click", event => {
    function eliminarClaseModulo() {
        document.querySelectorAll(".modulSel>*").forEach(element => {
            element.classList.remove("moduloSeleccionado")
        })
    }
    let moduloSeleccionado = event.target
    let value = Number(moduloSeleccionado.getAttribute("value"))
    if (value === 1) {
        document.querySelector(".inventDiv").style.display = "flex"
        document.querySelector(".billDiv").style.display = "none"
        document.querySelector(".module3Div").style.display = "none"
        eliminarClaseModulo()
        moduloSeleccionado.classList.add("moduloSeleccionado")
    }
    else if (value === 2) {
        document.querySelector(".inventDiv").style.display = "none"
        document.querySelector(".billDiv").style.display = "flex"
        document.querySelector(".module3Div").style.display = "none"
        eliminarClaseModulo()
        moduloSeleccionado.classList.add("moduloSeleccionado")

    } else if (value === 3) {
        document.querySelector(".inventDiv").style.display = "none"
        document.querySelector(".billDiv").style.display = "none"
        document.querySelector(".module3Div").style.display = "flex"
        eliminarClaseModulo()
        moduloSeleccionado.classList.add("moduloSeleccionado")
    }
})