const express = require("express")
const {
  createReservation,
  deleteReservation,
  getReservationById,
  getReservations,
  updateReservation,
} = require("../controllers/reservationController")
const { checkAdmin } = require("../middlewares/checkAdmin")
const { verifyToken } = require("../middlewares/verifyToken")

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - venueId
 *         - userId
 *         - numberOfPeople
 *         - date
 *         - time
 */

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *           examples:
 *             example:
 *               value:
 *                 venueId: "64e8c916f9d6a71234abcd56"
 *                 date: "2024-10-07"
 *                 time: "13:00"
 *                 numberOfPeople: 4
 *     responses:
 *       201:
 *         description: The reservation was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */
router.post("/", verifyToken, createReservation)

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: A list of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */
router.get("/", verifyToken, getReservations)

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Get a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation ID
 *     responses:
 *       200:
 *         description: The reservation details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found
 */
router.get("/:id", verifyToken, checkAdmin, getReservationById)

/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Update a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *           examples:
 *             example:
 *               value: {}
 *     responses:
 *       200:
 *         description: The reservation was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", verifyToken, checkAdmin, updateReservation)

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Delete a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation ID
 *     responses:
 *       200:
 *         description: The reservation was successfully deleted
 *       404:
 *         description: Reservation not found
 */
router.delete("/:id", verifyToken, checkAdmin, deleteReservation)

module.exports = router
