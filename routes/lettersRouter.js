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

router.route('/:id/send')
  .post(controller.sendLetter)
router.route('/:id/edit')
  .get(controller.getEditPageForLetterById)
  .post(controller.editLetterById)
router.route('/:id/delete')
  .post(controller.deleteLetterById)
  
module.exports = router;