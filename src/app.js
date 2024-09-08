const express = require("express")
const swaggerJsdoc = require("swagger-jsdoc")
const cors = require("cors")
const dotenv = require("dotenv")
const swaggerUi = require("swagger-ui-express")
const db = require("./config/db.js")
const authRoutes = require("./routes/authRoutes.js")
const reservationRoutes = require("./routes/reservationRoutes.js")
const venueRoutes = require("./routes/venueRoutes.js")
const swaggerOptions = require("./swagger.js")

dotenv.config()

const app = express()
db()
app.use(cors())

app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/venues", venueRoutes)
app.use("/api/reservations", reservationRoutes)

const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

module.exports = app
module.exports = server
