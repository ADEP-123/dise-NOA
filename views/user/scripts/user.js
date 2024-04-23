import { deplegarModulos } from "./modules/modulos.js";
import { desplegarConfiguracion } from "./modules/configuracion.js";
import { desplegarAyuda } from "./modules/ayuda.js";

document.getElementById("desplegarModulos").addEventListener("click", deplegarModulos)
document.getElementById("desplegarConfig").addEventListener("click", desplegarConfiguracion)
document.getElementById("desplegarAyuda").addEventListener("click", desplegarAyuda)

