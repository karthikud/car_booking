const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },
    phone_number: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const vehicleSchema = new Schema(
  {
    make: {
      type: String,
      required: true
    },

    model: {
      type: String,
      required: true
    },
    vin: {
      type: String,
      required: true,
      trim: true,
      minLength: 17,
      maxLength: 17
    }
  },
  { _id: false }
);

const bookingSchema = new Schema(
  {
    customer: customerSchema,
    vehicle: vehicleSchema,

    time: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
