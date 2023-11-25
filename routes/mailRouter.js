const express = require('express');
const mailController = require('../controllers/mailController.js');

const router = express.Router();

router.route('/')
  .get(mailController.showMail)
  .post(mailController.sendMail)

module.exports = router;