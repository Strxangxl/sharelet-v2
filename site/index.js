var socket = io();

const textArea = document.querySelector("#editor");
textArea.style.width = "100%";
textArea.style.height = "auto";
socket.on("text-change-server", (data) => {
  textArea.value = data;
  resizeTextArea();
});

window.addEventListener("load", () => {
  hljs.highlightElement(textArea);
});

textArea.addEventListener("input", () => {
  resizeTextArea();
});

textArea.addEventListener("keyup", (e) => {
  socket.emit("text-change-from-client", e.target.value);
});

const resizeTextArea = () => {
  if (window.innerWidth <= 600) {
    textArea.style.width = "100%";
  } else {
    textArea.style.width = "60%";
  }
  textArea.style.height = "auto";
  textArea.style.height = textArea.scrollHeight + "px";
};

window.addEventListener("load", resizeTextArea);
window.addEventListener("resize", resizeTextArea);
