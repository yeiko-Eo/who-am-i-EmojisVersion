let personajes = []; // Array to store characters
let personajeActual = null; // Current character
let puntosEquipo1 = 0;
let puntosEquipo2 = 0;

// Team objects
const equipo1 = {
    nombre: "Equipo 1",
    participantes: []
};

const equipo2 = {
    nombre: "Equipo 2",
    participantes: []
};

// Update team score
function restarPunto(equipo) {
    if (equipo === 1) {
        puntosEquipo1 = Math.max(0, puntosEquipo1 - 1);
        document.getElementById("score1").textContent = `Puntos: ${puntosEquipo1}`;
    } else {
        puntosEquipo2 = Math.max(0, puntosEquipo2 - 1);
        document.getElementById("score2").textContent = `Puntos: ${puntosEquipo2}`;
    }
}

// Update team name from input
function actualizarNombreEquipo(equipo) {
    const input = document.getElementById(`nombreEquipo${equipo}`);
    const titulo = document.querySelector(`#equipo${equipo} h2`);
    titulo.textContent = input.value || `Equipo ${equipo}`;
    if (equipo === 1) equipo1.nombre = input.value;
    else equipo2.nombre = input.value;
}

// Add participant to a team
function agregarParticipante(equipo) {
    const input = document.getElementById(`nuevoParticipante${equipo}`);
    const nombre = input.value.trim();
    if (nombre === "") return;

    const lista = document.getElementById(`listaEquipo${equipo}`);
    const li = document.createElement("li");
    li.textContent = nombre;

    // Button to remove participant
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.onclick = () => {
        lista.removeChild(li);
        if (equipo === 1) equipo1.participantes = equipo1.participantes.filter(p => p !== nombre);
        else equipo2.participantes = equipo2.participantes.filter(p => p !== nombre);
    };

    li.appendChild(btnEliminar);
    lista.appendChild(li);

    if (equipo === 1) equipo1.participantes.push(nombre);
    else equipo2.participantes.push(nombre);

    input.value = "";
}

// Add point to a team and update UI
function sumarPunto(equipo) {
    if (equipo === 1) {
        puntosEquipo1++;
        document.getElementById("score1").textContent = `Puntos: ${puntosEquipo1}`;
    } else {
        puntosEquipo2++;
        document.getElementById("score2").textContent = `Puntos: ${puntosEquipo2}`;
    }
}

// Show the answer for the current character
function mostrarRespuesta() {
    if (personajeActual) {
        document.getElementById("respuesta").textContent = `¡Soy ${personajeActual.respuesta}!`;
        document.getElementById("respuesta").style.display = "block";
    }
}

// Load a new random character and display hints
function cargarNuevoPersonaje() {
    document.getElementById("respuesta").style.display = "none";
    const indice = Math.floor(Math.random() * personajes.length);
    personajeActual = personajes[indice];
    const pistasHTML = personajeActual.pistas.map(p => `<p>${p}</p>`).join("");
    document.getElementById("pistas").innerHTML = pistasHTML;
}

// Load characters from JSON on start
fetch("personajes.json")
    .then(response => response.json())
    .then(data => {
        personajes = data;
        cargarNuevoPersonaje();
    })
    .catch(error => {
        console.error("Error loading characters:", error);
        document.getElementById("pistas").innerHTML = "<p>Error loading characters.</p>";
    });
