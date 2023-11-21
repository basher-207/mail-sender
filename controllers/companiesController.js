const Company = require('../models/companyModel.js');

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({});
    res.status(200).json({
      status: 'success',
      data: {
        count: companies.length,
        companies
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message
    });
  }
};

const createNewCompany = async (req, res) => {
  const { name, email, isFamous, isBig } = req.body;
  try {
    const company = await Company.create({ name, email, isFamous, isBig });
    res.status(201).json({
      status: 'success',
      data: {
        count: 1,
        company
      }
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if(!company){
      throw new Error('not found');
    }
    res.status(200).json({
      status: 'success',
      data: {
        count: 1,
        company
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error: `Company with id ${req.params.id} not found`
    });
  }
};

const patchCompanyById = async (req, res) => {
  try {
    const { name, email, isFamous, isBig } = req.body;
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id, 
      { name, email, isFamous, isBig },
      { 
        new: true,
        runValidators: true
      }
    );
    if(!updatedCompany){
      throw new Error('not found');
    }
    res.status(200).json({
      status: 'success',
      data: {
        count: 1,
        company: updatedCompany
      }
    });
  } catch (error) {
    if(error.name === "CastError" || error.message === 'not found'){
      res.status(404).json({
        status: 'fail',
        error: `Company with id ${req.params.id} not found`
      });
      return;
    }
    res.status(400).json({
      status: 'fail',
      error: error.message
    });
  }
};

const deleteCompanyById = async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if(!deletedCompany){
      throw new Error('not found');
    }
    res.sendStatus(204);
  } catch (error) {
    if(error.name === "CastError" || error.message === 'not found'){
      res.status(404).json({
        status: 'fail',
        error: `Company with id ${req.params.id} not found`
      });
      return;
    }
    res.status(500).json({
      status: 'fail',
      error: error.message
    });
  }
};

module.exports = { 
  getAllCompanies,
  getCompanyById,
  createNewCompany,
  patchCompanyById,
  deleteCompanyById
};