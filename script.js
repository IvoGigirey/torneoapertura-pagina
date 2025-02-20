fetch("plantilla_equipo.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Verifica el contenido cargado
    if (data && data.equipos) {
      data.equipos.forEach((equipo) => {
        console.log(`Equipo: ${equipo.equipo}`);
        if (equipo.jugadores) {
          mostrarPlantilla(equipo.jugadores);
        } else {
          console.error(`El equipo ${equipo.equipo} no tiene jugadores.`);
        }
      });
    } else {
      console.error("El archivo JSON no tiene la estructura esperada.");
    }
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
  });

function mostrarPlantilla(jugadores) {
  jugadores.forEach((jugador) => {
    console.log(`Nombre: ${jugador.nombre}, Posición: ${jugador.posicion}`);
    // Aquí puedes agregar la lógica para mostrar los datos en tu página
  });
}

function verPlantilla(equipo) {
  window.location.href = `jugadores.html?equipo=${equipo}`;
}

const params = new URLSearchParams(window.location.search);
const equipoSeleccionado = params.get("equipo");
document.getElementById(
  "titulo-equipo"
).innerText = `Plantilla de ${equipoSeleccionado}`;

fetch("plantilla_equipo.json")
  .then((response) => response.json())
  .then((data) => {
    if (data && data.equipos) {
      mostrarPlantilla(data.equipos, equipoSeleccionado);
    } else {
      console.error("El archivo JSON no tiene la estructura esperada.");
    }
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
  });

function mostrarPlantilla(equipos, equipoFiltrado) {
  const contenedor = document.getElementById("jugadores-container");
  contenedor.innerHTML = "";

  const equipoEncontrado = equipos.find((e) =>
    e.equipo.includes(equipoFiltrado)
  );

  if (equipoEncontrado) {
    const tabla = document.createElement("table");
    tabla.innerHTML = `
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Posición</th>
                            <th>Dorsal</th>
                            <th>Nacionalidad</th>
                            <th>Valor de Mercado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${equipoEncontrado.jugadores
                          .map(
                            (jugador) => `
                            <tr>
                                <td>${jugador.nombre}</td>
                                <td>${jugador.posicion}</td>
                                <td>${jugador.dorsal}</td>
                                <td>${jugador.nacionalidad}</td>
                                <td>${jugador.valorMercado}</td>
                            </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                `;
    contenedor.appendChild(tabla);
  } else {
    contenedor.innerHTML = "<p>No se encontró la plantilla de este equipo.</p>";
  }
}
