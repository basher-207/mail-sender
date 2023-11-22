const sendMailToCompanyById = (req, res) => {
  res.send('send to 1')
};

const sendMailsToManyCompanies = (req, res) => {
  res.send('send to many')
};

module.exports = {
  sendMailToCompanyById,
  sendMailsToManyCompanies
};

