const Ticket = require("./ticket");

class TicketList {
  constructor() {
    this.lastNumber = 0;
    this.pendings = [];
    this.assinged = [];
  }

  get nextNumber() {
    this.lastNumber++;
    return this.lastNumber;
  }

  get last13() {
    return this.assinged.slice(0, 13);
  }

  createTicket() {
    const newTicket = new Ticket(this.nextNumber);
    this.pendings.push(newTicket);
    return newTicket;
  }

  assignTicket(agent, desk) {
    if (this.pendings.length === 0) {
      return null;
    }
    const nextTicket = this.pendings.shift();

    nextTicket.agent = agent;
    nextTicket.desk = desk;

    this.assinged.unshift(nextTicket);

    return nextTicket;
  }
}

module.exports = TicketList;
