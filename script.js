document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;

    if (scrollTop > 100) {
      navbar.classList.add("sticky");
      if (scrollTop > lastScrollTop) {
        navbar.classList.remove("hidden");
      } else {
        navbar.classList.add("hidden");
      }
    } else {
      navbar.classList.remove("sticky");
      navbar.classList.remove("hidden");
    }

    lastScrollTop = scrollTop;
  });
});

function verPlantilla(equipo) {
  window.location.href = `jugadores.html?equipo=${equipo}`;
}

if (window.location.pathname.includes("/jugadores.html")) {
  const params = new URLSearchParams(window.location.search);
  const equipoSeleccionado = params.get("equipo");

  if (equipoSeleccionado) {
    document.getElementById(
      "titulo-equipo"
    ).innerText = `Plantilla de ${equipoSeleccionado}`;
  }

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
      contenedor.innerHTML =
        "<p>No se encontró la plantilla de este equipo.</p>";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    console.log("Scrolling...");
  });
});

/* PROBAR REACT.JS */ 
// Crear el componente Noticias sin usar JSX
function Noticias() {
  return React.createElement("div", { className: "contenedor-widget-news" },
      React.createElement("h1", null, "NOTICIAS"),
      React.createElement("div", { className: "contenedor-custom-news" },
          React.createElement("h2", null, "¡El Sorteo Definió los Destinos del Torneo Apertura 2025!"),
          React.createElement("p", null,
              "📅 Martes 18 de febrero de 2025 - La expectativa estaba en su punto máximo, la tensión se podía sentir en el aire y los corazones latían con fuerza. ",
              "Finalmente, el tan esperado sorteo de equipos para el Torneo Apertura 2025 de PES6 se llevó a cabo, dejando a todos los participantes con ansias de que ruede el balón. ",
              "Con la suerte echada y el destino de cada estratega en manos del azar, estos fueron los resultados del sorteo: ", React.createElement("br"),
              "⚫⚪ ", React.createElement("strong", null, "Deportivo Riestra"), " será comandado por Ivo Gigirey, quien buscará imponer su estilo de juego y llevar al equipo a lo más alto.", React.createElement("br"),
              "🔵🔴 ", React.createElement("strong", null, "Club Atlético Tigre"), " tendrá en el banco a Juan Manuel Mencia, un técnico conocido por su enfoque ofensivo y su pasión por el juego.", React.createElement("br"),
              "🔴⚪ ", React.createElement("strong", null, "Club Atlético Independiente"), ", un histórico del fútbol, estará dirigido por Stefano Meloni, quien promete darle al equipo una identidad de juego agresiva y letal.", React.createElement("br"),
              "🔵⚪ ", React.createElement("strong", null, "Club Atlético Belgrano"), ", con la dirección de Santino Meloni, intentará demostrar por qué es un candidato fuerte al título desde el inicio del torneo.", React.createElement("br"),
              "⚡ Con los equipos definidos, solo queda esperar el pitazo inicial y disfrutar de lo que promete ser un torneo cargado de emociones, goles y momentos épicos. ¡Que comience la batalla en la cancha virtual! 🎮🔥"
          )
      )
  );
}

// Renderizar el componente en el div con id "root"
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(Noticias));

