const express = require('express');
const controller = require('../controllers/lettersController.js');

const router = express.Router();

router.route('/')
  .get(controller.getLetters)

router.route('/add')
  .get(controller.getAddLetter)
  .post(controller.addLetter)

router.route('/:id')
  .get(controller.getLetterById)

module.exports = router;