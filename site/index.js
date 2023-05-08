var socket = io();

socket.on("text-change-server", (data) => {
  document.querySelector("#editor").value = data
});

document.querySelector("#editor").addEventListener("keyup", (e) => {
  socket.emit("text-change-from-client", e.target.value);
});
