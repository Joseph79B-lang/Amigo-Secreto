let amigos = [];
const listaAmigos = document.getElementById("listaAmigos");
const resultado = document.getElementById("resultado");
const alerta = document.getElementById("alerta"); // Suponiendo que existe en el HTML
const btnLimpiar = document.getElementById("limpiarLista"); // Botón de limpieza

// Función para agregar amigos
function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (!nombre) {
        mostrarAlerta("Por favor, inserte un nombre.", "error");
        return;
    }

    if (amigos.includes(nombre)) {
        mostrarAlerta("Ese nombre ya está en la lista.", "error");
        return;
    }

    amigos.push(nombre);
    actualizarLista();
    input.value = "";
    input.focus();
    mostrarAlerta("Nombre agregado correctamente.", "success");
}

// Función para actualizar la lista en el HTML
function actualizarLista() {
    listaAmigos.innerHTML = "";

    amigos.forEach((nombre, index) => {
        const li = document.createElement("li");
        li.classList.add("nombre-item");

        const spanNombre = document.createElement("span");
        spanNombre.textContent = nombre;

        const botonEliminar = document.createElement("button");
        botonEliminar.innerHTML = "🗑️";
        botonEliminar.classList.add("btn-eliminar");
        botonEliminar.dataset.index = index;
        botonEliminar.addEventListener("click", eliminarAmigo);

        li.append(spanNombre, botonEliminar);
        listaAmigos.appendChild(li);
    });

    // Habilita o deshabilita el botón de limpiar según si hay amigos en la lista
    btnLimpiar.disabled = amigos.length === 0;
}

// Función para eliminar un amigo
function eliminarAmigo(event) {
    const index = event.target.dataset.index;
    const eliminado = amigos.splice(index, 1)[0]; // Obtener el nombre eliminado
    actualizarLista();
    mostrarAlerta(`"${eliminado}" ha sido eliminado.`, "info");
}

// Función para sortear un amigo al azar
function sortearAmigo() {
    if (amigos.length === 0) {
        mostrarAlerta("No hay nombres en la lista para sortear.", "error");
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSecreto = amigos[indiceAleatorio];

    resultado.innerHTML = `🎉 ¡El amigo secreto es: <strong>${amigoSecreto}</strong>!`;
    mostrarAlerta(`🎉 ¡Sorteo realizado! El amigo secreto es "${amigoSecreto}".`, "success");
}

// Función para limpiar la lista
function limpiarLista() {
    amigos = []; // Vaciar el array
    actualizarLista();
    resultado.innerHTML = ""; // Limpiar el resultado
    mostrarAlerta("Lista de amigos vaciada.", "info");
}

// Función para mostrar alertas
function mostrarAlerta(mensaje, tipo) {
    alerta.textContent = mensaje;
    alerta.className = `alerta ${tipo}`;
    alerta.style.display = "block";

    setTimeout(() => {
        alerta.style.display = "none";
    }, 3000);
}

// Evento para el botón de limpiar
btnLimpiar.addEventListener("click", limpiarLista);

// Desactivar el botón de limpiar al inicio
btnLimpiar.disabled = true;
