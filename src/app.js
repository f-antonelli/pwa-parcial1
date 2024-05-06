import { API_URL } from "./config/envs.js";

document.getElementById("capture-button").addEventListener("click", () => {
  window.location.href = "./src/pages/camara.html";
});

(async function cargarPosts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const reelContainer = document.getElementById("reel");
    const existingCard = reelContainer.querySelector(".card");

    if (data.length < 1) {
      reelContainer.textContent = "No hay imágenes";
    } else {
      if (existingCard) {
        const firstCard = crearCard(data[0]);
        reelContainer.replaceChild(firstCard, existingCard);
      } else {
        const firstCard = crearCard(data[0]);
        reelContainer.appendChild(firstCard);
      }

      data.slice(1).forEach((post) => {
        const card = crearCard(post);
        reelContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Error al cargar los posts:", error);
  }
})();

function crearCard(post) {
  const cardBase = document.querySelector(".card");
  const card = cardBase.cloneNode(true);

  const image = card.querySelector(".card-image");
  image.src = post.image;
  image.alt = post.title;

  const title = card.querySelector(".card-title");
  title.textContent = post.title;

  const date = card.querySelector(".card-date");
  date.textContent = post.fecha;

  return card;
}
