const mongoose = require('mongoose');

const ReceiverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Receiver name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Company email is required'],
    unique: [true, 'Company with this email address already exist']
  },
  lettersTemplates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Letter',
    }
  ]
});

const Receiver = mongoose.model('Receiver', ReceiverSchema);

module.exports = Receiver;