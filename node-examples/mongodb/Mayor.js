const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mayorSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthdate: { type: Date, required: true },
  political_party: { type: String, required: true },
  terms_served: [{
    start_year: Number,
    end_year: Number,
    city: String
  }]
});

module.exports = mongoose.model('Mayor', mayorSchema);

