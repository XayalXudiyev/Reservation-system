const mongoose = require("mongoose")
const { Schema } = mongoose
const {  UserModel } = require("./User.js")

const VenueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
})

const VenueModel = mongoose.model("Venue", VenueSchema)

module.exports = VenueModel
