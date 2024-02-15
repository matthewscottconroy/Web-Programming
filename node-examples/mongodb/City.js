const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: { type: String, required: true },
  years: [{
    year: Number,
    population: Number,
    income_distribution: {
      percent_poor: Number,
      percent_middle: Number,
      percent_wealthy: Number
    },
    weather: {
      total_precipitation: Number,
      temperature: {
        annual_high: Number,
        annual_low: Number
      }
    },
    mayor: { type: Schema.Types.ObjectId, ref: 'Mayor' }
  }]
});

module.exports = mongoose.model('City', citySchema);

