const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const server = require("http").Server(app);
const webSocketServer = require("websocket").server;
const WebSocketServer = require("websocket/lib/WebSocketServer");

app.set("puerto", 3000);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

wsServer.on("request", (request) => {
  const connection = request.accept(null, request.origin);
  connection.on("message", (message) => {
    console.log("Mensaje Recibido: " + message.utf8Data);
    connection.sendUTF("Recibido: " + message.utf8Data);
  });

  connection.on("close", (reasonCode, description) => {
    console.log("El cliente se desconecto");
  });
});

server.listen(app.get("puerto"), () => {
  console.log("servidor iniciado en el puerto " + app.get("puerto"));
});
