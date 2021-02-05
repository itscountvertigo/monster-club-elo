// env variables setup
require('dotenv').config();

const mongoose = require('mongoose')
const mongoPath = process.env.ELO_MONGO_PATH

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}