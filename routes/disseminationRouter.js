const express = require('express');
const controller = require('../controllers/disseminationController.js');

const router = express.Router();

router.route('/')
  .get(controller.getDissemination)

module.exports = router;