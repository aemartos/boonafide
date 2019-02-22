const Ticket = require("../models/Ticket");

const createTickets = (donorId, receiverId, favorId) => {
  Ticket.collection.drop();
  return Ticket.create({donorId, receiverId, favorId, date: Date.now()});
};

module.exports = createTickets;
