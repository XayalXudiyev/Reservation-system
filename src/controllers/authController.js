const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/User.js")
const {
  registerValidation,
  loginValidation,
} = require("../validations/authValitadion.js")


exports.register = async (req, res) => {
  console.log()
  
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const NewUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
   
  });

  try {
    const savedUser = await NewUser.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: savedUser.email,
      subject: 'Registration Successful',
      text: `Hello ${savedUser.username},\n\nThank you for registering! Your registration was successful.\n\nBest regards`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ user: NewUser.username });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.login = async (req, res) => {
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  const user = await UserModel.findOne({ email: req.body.email })
  if (!user)
    return res.status(400).json({ message: "Email or password is wrong" })

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword)
    return res.status(400).json({ message: "Invalid Password" })

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  )
  res.header("Authorization", token).json({ message: "Login successfully" })
}
