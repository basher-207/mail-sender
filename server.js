const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app.js');
const PORT = process.env.PORT || 3000

const dbUrl = process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD);
mongoose.connect(dbUrl).then(() => {
  console.log('DB connection is successful');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
