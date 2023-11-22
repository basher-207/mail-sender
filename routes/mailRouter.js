const express = require('express');
const mailController = require('../controllers/mailController.js');

const router = express.Router();

router.route('/')
  .post(mailController.sendMailsToManyCompanies)

router.route('/:id')
  .post(mailController.sendMailToCompanyById)

module.exports = router;