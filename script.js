const mesEl = document.getElementById("mes");
const anioEl = document.getElementById("anio");
const diasEl = document.getElementById("dias");

let fecha = new Date();

const meses = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

// Feriados 
const feriados = {
    "1-1": "Año Nuevo",
    "3-24": "Día de la Memoria",
    "4-2": "Día del Veterano y de Malvinas",
    "5-1": "Día del Trabajador",
    "5-25": "Revolución de Mayo",
    "6-17": "Paso a la Inmortalidad de Güemes",
    "6-20": "Día de la Bandera",
    "7-9": "Día de la Independencia",
    "11-20": "Día de la Soberanía Nacional",
    "12-25": "Navidad"
};

function renderCalendario() {
    diasEl.innerHTML = "";

    let mes = fecha.getMonth();
    let anio = fecha.getFullYear();

    mesEl.textContent = meses[mes];
    anioEl.textContent = anio;

    let primerDia = new Date(anio, mes, 1).getDay();
    let ultimoDia = new Date(anio, mes + 1, 0).getDate();

    // Ajuste para que lunes sea primero
    primerDia = (primerDia === 0) ? 6 : primerDia - 1;

    for (let i = 0; i < primerDia; i++) {
        diasEl.innerHTML += `<div></div>`;
    }

    for (let dia = 1; dia <= ultimoDia; dia++) {
        let div = document.createElement("div");
        div.textContent = dia;

        let hoy = new Date();

        // Marcar hoy
        if (
            dia === hoy.getDate() &&
            mes === hoy.getMonth() &&
            anio === hoy.getFullYear()
        ) {
            div.classList.add("hoy");
        }

        // Feriados
        let clave = `${mes + 1}-${dia}`;
        if (feriados[clave]) {
            div.classList.add("feriado");

            let tooltip = document.createElement("span");
            tooltip.classList.add("tooltip");
            tooltip.textContent = feriados[clave];

            div.appendChild(tooltip);
        }

        diasEl.appendChild(div);
    }
}

// Botones
document.getElementById("prev").onclick = () => {
    fecha.setMonth(fecha.getMonth() - 1);
    renderCalendario();
};

document.getElementById("next").onclick = () => {
    fecha.setMonth(fecha.getMonth() + 1);
    renderCalendario();
};


renderCalendario();