const mongoose = require("mongoose")

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  venueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VenueModel",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
})

const ReservationModel = mongoose.model("Reservation", reservationSchema)

module.exports = ReservationModel
