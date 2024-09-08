const request = require("supertest")
const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const app = require("../app.js")
const { RegisterModel } = require("../models/User.js")
const {
  registerValidation,
  loginValidation,
} = require("../validations/authValitadion.js")
const server = require("../app.js")

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI)
})

afterAll(async () => {
  if (server) {
    server.close()
  }
  await mongoose.connection.close()
})

beforeEach(async () => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash("testpassword", salt)
  await RegisterModel.create({
    username: "testuser",
    email: "test@example.com",
    password: hashedPassword,
    role: "user",
  })
})

afterEach(async () => {
  await RegisterModel.deleteMany({})
})

describe("Auth Controller", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/auth/register").send({
        username: "newuser",
        email: "newuser@example.com",
        password: "newpassword",
        role: "user",
      })

      expect(res.statusCode).toBe(201)
      expect(res.body).toHaveProperty("user", "newuser")
    })

    it("should return a validation error if input is invalid", async () => {
      const res = await request(app).post("/api/auth/register").send({
        username: "newuser",
        email: "invalidemail",
        password: "short",
      })

      expect(res.statusCode).toBe(400)
      expect(res.body).toHaveProperty("message")
    })
  })

  describe("POST /api/auth/login", () => {
    it("should login a user and return a token", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "testpassword",
      })

      expect(res.statusCode).toBe(200)
      expect(res.header).toHaveProperty("authorization")
      expect(res.body).toHaveProperty("message", "Login successfully")
    })

    it("should return an error if email or password is wrong", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "false@example.com",
        password: "falsepassword",
      })

      expect(res.statusCode).toBe(400)
      expect(res.body).toHaveProperty("message", "Email or password is wrong")
    })

    it("should return an error if password is incorrect", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      })

      expect(res.statusCode).toBe(400)
      expect(res.body).toHaveProperty("message", "Invalid Password")
    })
  })
})
