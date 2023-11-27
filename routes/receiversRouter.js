const express = require('express');
const controller = require('../controllers/receiversController.js');

const router = express.Router();

router.route('/')
  .get(controller.getReceivers)
  .post(controller.deleteReceivers)

router.route('/add')
  .get(controller.getAddReceivers)
  .post(controller.addNewReceiver)

router.route('/:id')
  .get(controller.getEditReceiver)
  .post(controller.editReceiver)

module.exports = router;