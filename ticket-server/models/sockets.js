const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;

    this.ticketList = new TicketList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      socket.on("request-ticket", (data, callback) => {
        const newTicket = this.ticketList.createTicket();
        callback(newTicket);
      });

      socket.on("next-ticket", (user, callback) => {
        const nextTicket = this.ticketList.assignTicket(user.agent, user.desk);
        callback(nextTicket);

        this.io.emit("ticket-assigned", this.ticketList.last13);
      });
    });
  }
}

module.exports = Sockets;
