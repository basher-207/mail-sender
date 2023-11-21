const companies = [];

const getAllCompanies = (req, res) => {
  res.send('get all');
};

const createNewCompany = (req, res) => {
  res.send('Create new company');
};

const getCompanyById = (req, res) => {
  res.send('Get one company by id')
};

const patchCompanyById = (req, res) => {
  res.send('Patch one')
};

const deleteCompanyById = (req, res) => {
  res.send('Delete by id')
};

module.exports = { 
  getAllCompanies,
  getCompanyById,
  createNewCompany,
  patchCompanyById,
  deleteCompanyById
}