const mongoose = require('mongoose');

const personalizedChangableFieldsSchema = new mongoose.Schema({
  fieldName: {
    type: String,
    required: true,
  },
  fieldValue: {
    type: String
  }
},{
  _id: false
});

const personalizedLettersSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Receiver',
  },
  letterText: {
    type: String,
    required: true
  },
  changableFields: [ personalizedChangableFieldsSchema ]
},{
  _id: false
});

const letterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Letter template name is required'],
    trim: true
  },
  letterTextRow: {
    type: String,
    required: true
  },
  personalizedLetters: [personalizedLettersSchema]
});

const Letter = mongoose.model('Letter', letterSchema);

module.exports = Letter;