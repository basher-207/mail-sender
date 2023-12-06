const util = require('util'); //for logging large obj

const rowLetter = require('../utils/rowLetterConverter.js'); //converts letter structure for addLetter endpoint
const Receiver = require('../models/ReceiverModel.js');
const Letter = require('../models/LetterModel.js');
const ejsPath = 'pages/letters'

exports.getLetters = async (req, res) => {
  try {
    // get all letters templates with receiver information and transform it to plain JS object
    const letterTemplates = await Letter.find().populate({
      path: 'personalizedLetters.receiver',
      select: 'name email'
    }).lean();

    console.log(util.inspect(letterTemplates, {showHidden: false, depth: null, colors: true}));

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
  try{
    const {templateName, rowMessage, _id, name, email, receiverLetterText, ...changableFields} = req.body;
    if(!templateName || !rowMessage || !_id || !name || !email){
      res.status(400).json({
        status: 'fail',
        message: 'You have to specified all necessary fields (templateName, message, _id, email)'
      });
      return;
    }
    const idsLength = _id.length;
    const namesLength = name.length;
    const emailLength = email.length;
    const receiverLetterTextLength = receiverLetterText.length;
    if(!(idsLength === namesLength && namesLength === emailLength && emailLength === receiverLetterTextLength)){
      res.status(400).json({
        status: 'fail',
        message: 'Unexpected inputs'
      });
      return;
    }

    const letter = new rowLetter(templateName, rowMessage, _id, receiverLetterText, changableFields);
    const letterTemplateStructured = letter.getletterTemplateStructure();
    
    const letterTemplate = new Letter(letterTemplateStructured);
    await letterTemplate.save();

    res.redirect('/letters')
  }catch(error){
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};