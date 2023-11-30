const mongoose = require('mongoose');

const personalizedInterjectionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  changedText: {
    type: String
  }
},{
  _id: false
});

const interjectionsPersonalizedSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Receiver',
  },
  interjections: [ personalizedInterjectionsSchema ]
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
  interjectionsList: [{ type: String }],
  interjectionsPersonalized: [ interjectionsPersonalizedSchema ]
});



// const letterSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Letter template name is required'],
//     trim: true
//   },
//   letterTextRow: {
//     type: String,
//     required: true
//   },
//   interjectionsList: [{ type: String }],
//   interjectionsPersonalized: [{
//     receiver: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Receiver',
//     },
//     interjections: [{
//       name: {
//         type: String,
//         required: true,
//       },
//       changedText: {
//         type: String
//       }
//     }]
//   }]
// });

const Letter = mongoose.model('Letter', letterSchema);

module.exports = Letter;