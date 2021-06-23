const Booking = require("../../models/booking");
const Setting = require("../../models/setting");
const start_hour = 9;
const end_hour = 17;
const booking_duration = 2;
const working_hours = end_hour - start_hour;
module.exports = {
  bookings: async args => {
    try {
      const { filter } = args;
      var filterObject = {};
      var d = new Date(filter.day);

      var query_day =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        d
          .getDate()
          .toString()
          .padStart(2, "0");

      if (filter) {
        if (filter.day !== null) {
          filterObject.time = {
            $gte: `${query_day}T00:00:00.000Z`,
            $lt: `${query_day}T23:59:59.999Z`
          };
        }

        if (filter.vin !== null) {
          filterObject.vin = filter.vin;
        }
      }

      const bookings = await Booking.find(filterObject);

      return bookings.map(booking => {
        return {
          ...booking._doc,
          _id: booking.id,
          createdAt: new Date(booking._doc.createdAt).toISOString()
        };
      });
    } catch (error) {
      throw error;
    }
  },

  create_booking: async args => {
    try {
      const { customer, vehicle, time } = args.booking;
      var booking_time = new Date(time);
      var booking_hour = booking_time.getHours();
      if (booking_hour > end_hour || booking_hour < start_hour) {
        throw new Error("Out of booking hours");
      }
      const capacity = await Setting.findOne({ name: "capacity" });

      var check_capacity = (working_hours / booking_duration) * capacity.value;
      var d = new Date();

      var today =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        d
          .getDate()
          .toString()
          .padStart(2, "0");

      const bookings_for_today = await Booking.find({
        time: {
          $gte: `${today}T00:00:00.000Z`,
          $lt: `${today}T23:59:59.999Z`
        }
      });

      if (bookings_for_today.length > parseInt(check_capacity)) {
        throw new Error("Exceeds capacity");
      }
      const booking = new Booking({
        customer,
        vehicle,
        time
      });
      const new_booking = await booking.save();
      return { ...new_booking._doc, _id: new_booking.id };
    } catch (error) {
      throw error;
    }
  },
  upsert_setting: async args => {
    try {
      const { value } = args.Setting;
      const new_setting = await Setting.findOneAndUpdate(
        { name: "capacity" },
        { $set: { value: value } },
        { upsert: true, new: true }
      );
      return { ...new_setting._doc, _id: new_setting.id };
    } catch (error) {
      throw error;
    }
  }
};
