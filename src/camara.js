import { API_URL } from "./config/envs.js";

document.getElementById("confirmButton").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = async (e) => {
    const imageData = e.target.result;
    const base64Image = await convertirABase64(imageData);
    const title = document.getElementById("imageTitle").value;

    await publicarImagen(base64Image, title);

    fileInput.value = "";
    document.getElementById("imageTitle").value = "";
  };

  reader.readAsDataURL(file);
});

document.getElementById("cancelButton").addEventListener("click", () => {
  document.getElementById("fileInput").value = "";
  document.getElementById("imageTitle").value = "";
});

async function convertirABase64(imageData) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const image = new Image();

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      resolve(canvas.toDataURL("image/webp"));
    };

    image.src = imageData;
  });
}

async function publicarImagen(imageData, title) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imageData,
        title: title,
      }),
    });

    const data = await response.json();
    console.log("Imagen publicada:", data);
    window.location.href = "/index.html";
  } catch (error) {
    console.error("Error al publicar la imagen:", error);
  }
}
