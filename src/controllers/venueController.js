const VenueModel = require("../models/Venue")
const { venueValidation } = require("../validations/venueValidation")

exports.createVenue = async (req, res) => {
  const { error } = venueValidation(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  try {
    const newVenue = new VenueModel({
      name: req.body.name,
      location: req.body.location,
      capacity: req.body.capacity,
      description: req.body.description,
      createdBy: req.user._id,
    })

    const savedVenue = await newVenue.save()
    res.status(201).json(savedVenue)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getVenues = async (req, res) => {
  try {
    const { page = 1, limit = 4, location } = req.query

    const filter = location ? { location } : {}

    const venues = await VenueModel.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await VenueModel.countDocuments(filter)

    res.status(200).json({
      venues,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getVenueById = async (req, res) => {
  try {
    const venue = await VenueModel.findById(req.params.id)
    if (!venue) return res.status(404).json({ message: "Venue not found" })
    res.status(200).json(venue)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateVenue = async (req, res) => {
  try {
    const updatedVenue = await VenueModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    )
    if (!updatedVenue)
      return res.status(404).json({ message: "Venue not found" })
    res.status(200).json(updatedVenue)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteVenue = async (req, res) => {
  try {
    const deletedVenue = await VenueModel.findByIdAndDelete(req.params.id)
    if (!deletedVenue)
      return res.status(404).json({ message: "Venue not found" })
    res.status(200).json({ message: "Venue deleted successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
