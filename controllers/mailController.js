const mailController = require('../utils/mail/mailController.js');
const Company = require('../models/companyModel.js');

const sendMail = async (req, res) => {
  try {
    const { subject, text } = req.body;
    const emails = await Company.find({});
    if(emails.length = 0){
      throw new Error('No receivers specified');
    }
    await mailController.sendMail({subject, text, emails});
    res.status(200).json({
      status: 'success',
      message: 'Message successfuly sent'
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const showMail = (req, res) => {
  res.send('show mail');
};

module.exports = {
  sendMail,
  showMail
};

