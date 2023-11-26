const express = require('express');
const controller = require('../controllers/homePageController.js');

const router = express.Router();

router.route('/')
  .get(controller.getHome)

module.exports = router;