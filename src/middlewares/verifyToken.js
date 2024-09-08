const jwt = require("jsonwebtoken")
const { RegisterModel } = require("../models/User")

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization")

  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied: No token provided" })
  }

  const token = authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Access Denied: Token missing" })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const user = await RegisterModel.findById(payload.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    req.user = user
    next()
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" })
  }
}
