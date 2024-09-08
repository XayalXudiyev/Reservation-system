const express = require("express")
const { login, register } = require("../controllers/authController.js")

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *
 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                   description: The registered user's username
 *       400:
 *         description: Validation error or bad request
 *       500:
 *         description: Internal server error
 */
router.post("/register", register)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         headers:
 *           auth-token:
 *             schema:
 *               type: string
 *               description: JWT token for authenticated requests
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: <JWT_TOKEN>
 *       400:
 *         description: Invalid credentials or validation error
 *       500:
 *         description: Internal server error
 */
router.post("/login", login)

module.exports = router
