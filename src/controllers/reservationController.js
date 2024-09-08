const dayjs = require("dayjs")
const ReservationModel = require("../models/Reservation")
const reservationValidation = require("../validations/reservationValidation")

exports.createReservation = async (req, res) => {
  const { error } = reservationValidation(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  const time = req.body.time

  try {
    const existingReservation = await ReservationModel.findOne({
      venueId: req.body.venueId,
      date: req.body.date,
      time: time,
    })

    if (existingReservation) {
      return res
        .status(400)
        .json({ message: "The venue is already booked at this time." })
    }

    const reservation = new ReservationModel({
      userId: req.user._id,
      venueId: req.body.venueId,
      date: req.body.date,
      time: time,
      numberOfPeople: req.body.numberOfPeople,
    })

    const savedReservation = await reservation.save()
    res.status(201).json(savedReservation)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getReservations = async (req, res) => {
  try {
    const reservations = await ReservationModel.find({ userId: req.user._id })
    res.status(200).json(reservations)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await ReservationModel.findById(req.params.id)
    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" })
    res.status(200).json(reservation)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await ReservationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    )
    if (!updatedReservation)
      return res.status(404).json({ message: "Reservation not found" })
    res.status(200).json(updatedReservation)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await ReservationModel.findByIdAndDelete(
      req.params.id,
    )
    if (!deletedReservation)
      return res.status(404).json({ message: "Reservation not found" })
    res.status(200).json({ message: "Reservation deleted successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
