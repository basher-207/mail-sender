const Letter = require('../models/LetterModel.js');
const ejsPath = 'pages/letters'

exports.getLetters = async (req, res) => {
  // get all letters templates with receiver information and transform it to plain JS object
  const letterTemplates = await Letter.find().populate({
    path: 'interjectionsPersonalized.receiver',
    select: 'name email'
  }).lean();

  res.render(ejsPath, { letterTemplates });
};

exports.getAddLetter = (req, res) => {
  res.render(ejsPath + '/addLetter');
}