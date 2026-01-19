const chatbotBtn = document.getElementById("chatbotBtn");
const chatbotWindow = document.getElementById("chatbotWindow");
const cerrarChat = document.getElementById("cerrarChat");
const enviarMensaje = document.getElementById("enviarMensaje");
const mensajeUsuario = document.getElementById("mensajeUsuario");
const chatbotMensajes = document.getElementById("chatbotMensajes");


chatbotBtn?.addEventListener("click", () => {
  chatbotWindow.style.display = "flex";
});


cerrarChat?.addEventListener("click", () => {
  chatbotWindow.style.display = "none";
});


enviarMensaje?.addEventListener("click", () => {
  const texto = mensajeUsuario.value.trim();
  if (texto === "") return;

  const mensajeUserDiv = document.createElement("div");
  mensajeUserDiv.classList.add("mensaje", "usuario");
  mensajeUserDiv.textContent = texto;
  chatbotMensajes.appendChild(mensajeUserDiv);

  mensajeUsuario.value = "";

  setTimeout(() => {
    const mensajeBot = document.createElement("div");
    mensajeBot.classList.add("mensaje", "sistema");
    mensajeBot.textContent =
      "LazoBot: Gracias por tu mensaje. Si necesitas agendar una sesión, puedes hacerlo desde el botón Agendar sesión.";
    chatbotMensajes.appendChild(mensajeBot);
    chatbotMensajes.scrollTop = chatbotMensajes.scrollHeight;
  }, 600);
});

document.getElementById("btn-agendar")?.addEventListener("click", () => {
  window.location.href =
    "https://calendly.com/ps-stephanielazo/sesion-psicologa";
});

document.getElementById("btn-agendar-quien")?.addEventListener("click", () => {
  window.location.href =
    "https://calendly.com/ps-stephanielazo/sesion-psicologa";
});
