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
    const {templateName, rowMessage, _id, name, email, receiverLetterText, changableFieldsList, ...changableFields} = req.body;
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

    const letter = new rowLetter(templateName, rowMessage, changableFieldsList, _id, receiverLetterText, changableFields);
    const letterTemplateStructured = letter.getletterTemplateStructure();
    
    const letterTemplate = new Letter(letterTemplateStructured);
    await letterTemplate.save();

    // adding letterTemplateId relationships to receivers collection
    _id.forEach(async (id) => {
      const receiver = await Receiver.findById(id);
      receiver.lettersTemplates.push(letterTemplate._id);
      receiver.save();
    });

    res.redirect('/letters')
  }catch(error){
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.getLetterById = async (req, res) => {
  try {
    const letter = await Letter.findById(req.params.id).populate({
      path: 'personalizedLetters.receiver',
      select: 'name email'
    }).lean();
    if(letter === null){
      res.status(404).json({
        status: 'fail',
        message: 'Letter template with that ID not found'
      });
      return;
    }
    res.render(ejsPath + '/letterById', { template:  letter });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Wrong ID input, letter can not be found'
    });
  }
};

exports.sendLetter = async (req, res) => {
  res.send('send letter!');
};

exports.getEditPageForLetterById = async (req, res) => {
  const letterId = req.params.id;
  try {
    const receivers = await Receiver.find();
    const letter = await Letter.findById(letterId).populate({
      path:'personalizedLetters.receiver',
      select: 'name email'
    }).lean();
    if(letter === null){
      res.status(404).json({
        status: 'fail',
        message: 'Letter template with that ID not found'
      });
      return;
    }
    // console.log(util.inspect(letter, {showHidden: false, depth: null, colors: true}));
    res.render(ejsPath + '/editLetter', { template: letter, receivers });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Wrong ID input, letter can not be found'
    });
  }
};

exports.editLetterById = async (req, res) => {
  try {
    const templateId = req.params.id;
    const letterTemplateOld = await Letter.findById(templateId);
    const {templateName, rowMessage, _id, name, email, receiverLetterText, changableFieldsList, ...changableFields} = req.body;
    const idsLength = _id.length;
    const namesLength = name.length;
    const emailLength = email.length;
    const receiverLetterTextLength = receiverLetterText.length;

    if(!templateName || !rowMessage || !_id || !name || !email){
      res.status(400).json({
        status: 'fail',
        message: 'You have to specified all necessary fields (templateName, message, _id, email)'
      });
      return;
    }
    if(!(idsLength === namesLength && namesLength === emailLength && emailLength === receiverLetterTextLength)){
      res.status(400).json({
        status: 'fail',
        message: 'Unexpected inputs'
      });
      return;
    }

    const letter = new rowLetter(templateName, rowMessage, changableFieldsList, _id, receiverLetterText, changableFields);
    const letterTemplateStructured = letter.getletterTemplateStructure();
    const updatedLetter = await Letter.findByIdAndUpdate(templateId, letterTemplateStructured, {new: true});

    // adding letterTemplateId relationships to receivers collection
    _id.forEach(async (id) => {
      const receiver = await Receiver.findById(id);
      if(!receiver.lettersTemplates.includes(updatedLetter._id)){
        receiver.lettersTemplates.push(updatedLetter._id);
        receiver.save();
      }
    });

    // delete letter template relation from receivers who was unselected
    const oldReceiversIdsArray = letterTemplateOld.personalizedLetters.map((receiverInfo) => receiverInfo.receiver.toString());
    const receiversIdsToUpdate = oldReceiversIdsArray.filter((el) => !_id.includes(el));
    const receiversToUpdate = await Receiver.find({ '_id': { $in: receiversIdsToUpdate } });
    receiversToUpdate.forEach(async (receiver) => {
      const index = receiver.lettersTemplates.indexOf(updatedLetter._id);
      receiver.lettersTemplates.splice(index, 1);
      receiver.save();
    });

    res.redirect('/letters');
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.deleteLetterById = async (req, res) => {
  const letterId = req.params.id;
  try {
    const deletedLetter = await Letter.findByIdAndDelete(letterId);

    // delete letter template relation from receivers who was unselected
    const receiverIds = deletedLetter.personalizedLetters.map((receiverInfo) => receiverInfo.receiver.toString());
    const receiversToUpdate = await Receiver.find({ '_id': { $in: receiverIds } });
    receiversToUpdate.forEach(async (receiver) => {
      const index = receiver.lettersTemplates.indexOf(deletedLetter._id);
      receiver.lettersTemplates.splice(index, 1);
      receiver.save();
    });

    res.redirect('/letters');
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Wrong ID input, letter can not be found and deleted'
    });
  }
}