const mesEl = document.getElementById("mes");
const anioEl = document.getElementById("anio");
const diasEl = document.getElementById("dias");
const nombreUsuarioInput = document.getElementById("nombreUsuario");
const saludoEl = document.getElementById("saludo");
const modoToggle = document.getElementById("modoToggle");
const modoTexto = document.getElementById("modoTexto");

let fecha = new Date();



// Cargar nombre del usuario al iniciar
function cargarNombreUsuario() {
    const nombreGuardado = localStorage.getItem("nombreUsuario");
    if (nombreGuardado) {
        nombreUsuarioInput.value = nombreGuardado;
        mostrarSaludo(nombreGuardado);
    }
}

// Mostrar saludo personalizado
function mostrarSaludo(nombre) {
    if (nombre.trim() !== "") {
        const emojis = ["😊", "👋", "🎉", "✨"];
        const emojiAleatorio = emojis[Math.floor(Math.random() * emojis.length)];
        saludoEl.textContent = `${emojiAleatorio} ¡Hola, ${nombre}!`;
    } else {
        saludoEl.textContent = "";
    }
}

// Guardar nombre cuando se escribe
nombreUsuarioInput.addEventListener("input", (e) => {
    const nombre = e.target.value;
    localStorage.setItem("nombreUsuario", nombre);
    mostrarSaludo(nombre);
});


// Cargar modo guardado al iniciar
function cargarModo() {
    const modoGuardado = localStorage.getItem("modoInfantil");
    if (modoGuardado === "true") {
        modoToggle.checked = true;
        document.body.classList.add("modo-infantil");
        modoTexto.textContent = "👔 Modo Adulto";
    } else {
        modoToggle.checked = false;
        modoTexto.textContent = "🎨 Modo Infantil";
    }
}

// Cambiar modo cuando se hace clic en el toggle
modoToggle.addEventListener("change", () => {
    const esModoInfantil = modoToggle.checked;
    
    if (esModoInfantil) {
        document.body.classList.add("modo-infantil");
        modoTexto.textContent = "🇦🇷 Modo Argentino";
    } else {
        document.body.classList.remove("modo-infantil");
        modoTexto.textContent = "🎨 Modo Infantil";
    }
    
    // Guardar preferencia en localStorage
    localStorage.setItem("modoInfantil", esModoInfantil);
});

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

            let sugerencia = document.createElement("span");
            sugerencia.classList.add("sugerencia");
            sugerencia.textContent = feriados[clave];

            div.appendChild(sugerencia);
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

// Inicializar
renderCalendario();
cargarNombreUsuario();
cargarModo();