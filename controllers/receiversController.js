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
  res.render('pages/addReceivers', { receiverAdded: false });
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
    await Receiver.create({ name, email });
    res.render('pages/addReceivers', { receiverAdded: true });
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
    res.render('pages/editReceiver', { receiver });
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
    await Receiver.findByIdAndUpdate(id, { name, email });
    res.redirect('/receivers');
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};