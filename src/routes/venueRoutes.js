const express = require("express")
const {
  createVenue,
  deleteVenue,
  getVenueById,
  getVenues,
  updateVenue,
} = require("../controllers/venueController")
const { checkAdmin } = require("../middlewares/checkAdmin")
const { verifyToken } = require("../middlewares/verifyToken")

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     VenueModel:
 *       type: object
 *       required:
 *         - name
 *         - location
 *         - capacity
 *         - description
 *         - createdBy
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the venue
 *         location:
 *           type: string
 *           description: The location of the venue
 *         capacity:
 *           type: number
 *           description: The capacity of the venue
 *         description:
 *           type: string
 *           description: The description of the venue
 */

/**
 * @swagger
 * /api/venues:
 *   post:
 *     summary: Create a new venue
 *     tags: [Venues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VenueModel'
 *           examples:
 *             example:
 *               value:
 *                 name: "Grand Hall"
 *                 location: "123 Main St, Springfield"
 *                 capacity: 500
 *                 description: "A large hall suitable for conferences and events."
 *     responses:
 *       201:
 *         description: The venue was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VenueModel'
 *       500:
 *         description: Some server error
 */
router.post("/", verifyToken, checkAdmin, createVenue)

/**
 * @swagger
 * /api/venues:
 *   get:
 *     summary: Get all venues with pagination and filtering
 *     tags: [Venues]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 3
 *         description: The number of venues to retrieve per page.
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter venues by location.
 *     responses:
 *       200:
 *         description: Successfully retrieved venues.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 venues:
 *                   type: array
 *                   items:
 *                     $ref: '#/models/VenueModel'
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *       400:
 *         description: Bad request.
 */
router.get("/", getVenues)

/**
 * @swagger
 * /api/venues/{id}:
 *   get:
 *     summary: Get a venue by ID
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The venue ID
 *     responses:
 *       200:
 *         description: The venue details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/VenueModel'
 *       404:
 *         description: Venue not found
 */
router.get("/:id", getVenueById)

/**
 * @swagger
 * /api/venues/{id}:
 *   put:
 *     summary: Update a venue by ID
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The venue ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VenueModel'
 *           examples:
 *             example:
 *               value: {}
 *     responses:
 *       200:
 *         description: The venue was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VenueModel'
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", verifyToken, checkAdmin, updateVenue)

/**
 * @swagger
 * /api/venues/{id}:
 *   delete:
 *     summary: Delete a venue by ID
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The venue ID
 *     responses:
 *       200:
 *         description: The venue was successfully deleted
 *       404:
 *         description: Venue not found
 */
router.delete("/:id", verifyToken, checkAdmin, deleteVenue)

module.exports = router
