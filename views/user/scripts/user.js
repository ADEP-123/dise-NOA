import { deplegarModulos } from './modules/modulos.js';
import { desplegarConfiguracion } from './modules/configuracion.js';
import { desplegarAyuda } from './modules/ayuda.js';

document.getElementById('desplegarModulos').addEventListener('click', deplegarModulos);
document.getElementById('desplegarConfig').addEventListener('click', desplegarConfiguracion);
document.getElementById('desplegarAyuda').addEventListener('click', desplegarAyuda);

document.getElementById('acercaDeNosotros').addEventListener('click', (e) => {
    window.location.href = '../../index.html';
});

const userInfo = document.querySelector('.userInfo');
const dropdownMenu = document.getElementById('dropdownMenu');

userInfo.addEventListener('click', function () {
    dropdownMenu.classList.toggle('show');
});

// Opción para ocultar el menú al hacer clic fuera del userInfo
document.addEventListener('click', function (event) {
    if (!userInfo.contains(event.target)) {
        dropdownMenu.classList.remove('show');
    }
});
