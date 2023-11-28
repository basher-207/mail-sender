const Receiver = require('../models/ReceiverModel.js');

// GET /receivers
// rendering receivers page
exports.getReceivers = async (req, res) => {
  try {
    const receiversList = await Receiver.find();
    res.render('pages/receivers', { receiversList });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

// POST /receivers 
// deleting selected receivers
exports.deleteReceivers = async (req, res) => {
  receiversIdsToDelete = req.body.receiverId;
  if(!receiversIdsToDelete){
    res.redirect('/receivers');
  }else{
    try {
      await Receiver.deleteMany({ _id: {$in: receiversIdsToDelete}});
      res.redirect('/receivers');
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error.message
      })
    }
  }
};

// GET /receivers/add
exports.getAddReceivers = (req, res) => {
  res.render('pages/receivers/addReceivers', { receiverAdded: false, receiverAlreadyExist: false });
};

// POST /receivers/add
// adding receivers to DB
exports.addNewReceiver = async (req, res) => {
  const { name, email } = req.body;
  if(!name || !email){
    res.redirect('/receivers/add');
    return;
  }
  try {
    // checking if user with that email already exist
    const receiver = await Receiver.find({ email });
    if(receiver.length !== 0){
      res.render('pages/receivers/addReceivers', { receiverAdded: false, receiverAlreadyExist: true });
      return
    }
    // adding new receiver
    await Receiver.create({ name, email });
    res.render('pages/receivers/addReceivers', { receiverAdded: true, receiverAlreadyExist: false });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
}

// GET /receivers/:id
// rendering edditing page
exports.getEditReceiver = async (req, res) => {
  const id = req.params.id;
  try {
    const receiver = await Receiver.findById(id).exec();
    res.render('pages/receivers/editReceiver', { receiver, receiverAlreadyExist: false });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

// POST /receivers/:id
// edit receiver and return to /receivers
exports.editReceiver = async (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;

  if(!name || !email){
    res.redirect(`/receivers/${id}`);
    return;
  }
  try {
    const receiver = await Receiver.findById(id);
    const receiverCheck = await Receiver.find({ email: email });
    // checking if user with that email already exist
    if(receiverCheck.length === 1 && id !== String(receiverCheck[0]._id)){
      res.render('pages/receivers/editReceiver', { receiver,  receiverAlreadyExist: true });
      return
    }
    // updating current receiver
    await receiver.updateOne({ name, email });
    res.redirect('/receivers');
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};