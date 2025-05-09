const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: { type: String, require: true },
  breed: { type: String, require: true },
  age: { type: Number, require: true },
  description: { type: String, require: true },
  image: { type: String, require: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', require: true },
});

const DogModel = mongoose.model('DogModel', dogSchema);

module.exports = {
    DogModel,
};