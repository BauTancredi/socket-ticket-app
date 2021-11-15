// Servidor de Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");

const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app);

    // Socket configs
    this.io = socketio(this.server, {
      /* configuraciones */
    });

    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // CORS
    this.app.use(cors());

    // Get the last tickets
    this.app.get("/last", (req, res) => {
      res.json({
        ok: true,
        last: this.sockets.ticketList.last13,
      });
    });
  }

  execute() {
    // Init Middlewares
    this.middlewares();

    // Init Server
    this.server.listen(this.port, () => {
      console.log("Server running in port:", this.port);
    });
  }
}

module.exports = Server;
