const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    receiverId: String,
    senderId: String,
    messageTitle: String,
    messageContent: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Message', messageSchema);
