const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
  street: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  pincode: { type: String, required: true, trim: true },
});

const hospitalSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: addressSchema,
    departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
    image: { type: String },
  },
  { timestamps: true }
);

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
