const Receiver = require('../models/ReceiverModel.js');
const Letter = require('../models/LetterModel.js');
const ejsPath = 'pages/letters'

exports.getLetters = async (req, res) => {
  try {
    // get all letters templates with receiver information and transform it to plain JS object
    const letterTemplates = await Letter.find().populate({
      path: 'interjectionsPersonalized.receiver',
      select: 'name email'
    }).lean();

    res.render(ejsPath, { letterTemplates });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.getAddLetter = async (req, res) => {
  try {
    const receiversList = await Receiver.find().lean();

    res.render(ejsPath + '/addLetter', { receiversList });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.addLetter = async (req, res) => {
  const {templateName, rowMessage, _id, name, email, receiverLetterText, ...changableFields} = req.body;
  
  if(!templateName || !rowMessage || !_id || !name || !email){
    res.status(400).json({
      status: 'fail',
      message: 'You have to specified all nececary fields (templateName, message, _id, email)'
    });
    return;
  }


  console.log({
    templateName,
    rowMessage,
    _id,
    name,
    email,
    receiverLetterText,
    changableFields
  });
  
  res.send('added');
};