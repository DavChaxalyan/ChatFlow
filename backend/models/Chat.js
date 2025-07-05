const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isGroup: { type: Boolean, default: false },
  chatName: { type: String },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // only for groups
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
