const express = require('express');
const companiesController = require('../controllers/companiesController.js');

const router = express.Router();

router.route('/')
  .get(companiesController.getAllCompanies)
  .post(companiesController.createNewCompany)
router.route('/:id')
  .get(companiesController.getCompanyById)
  .patch(companiesController.patchCompanyById)
  .delete(companiesController.deleteCompanyById)

module.exports = router;