const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    unique: [true, 'Company with that name already exist']
  },
  email: {
    type: String,
    required: [true, 'Company email is required'],
    unique: [true, 'Company with this email address already exist']
  },
  isFamous: {
    type: Boolean,
    required: [true, 'You have to specify if the company is famous']
  },
  isBig: {
    type: Boolean,
    required: [true, 'You have to specify if the company is big']
  }
});



const Company = mongoose.model('Company', companySchema);

module.exports = Company;