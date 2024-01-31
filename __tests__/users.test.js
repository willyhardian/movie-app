const app = require('../app');
const request = require('supertest');
const {sequelize, User} = require('../models');
const {queryInterface} = sequelize;

const user1 = {
  email: "bebek@mail.com",
  password: '123123'
}

beforeAll(async () => {
  await User.create({
    email: "bebek@mail.com",
    password: '123123'
  })
})

describe("/users", () => {
  describe("POST /users/register", () => {
    describe("Success", () => {
      test("Should return status 201 and object (id, email)", async () => {
        let {status, body} = await request(app)
          .post("/users/register")
          .send({
            email: "ayam@mail.com",
            password: "yangsusah"
          })
          console.log(body);
        expect(status).toBe(201)
        expect(body).toHaveProperty("id", expect.any(Number))
        expect(body).toHaveProperty("email", "ayam@mail.com")
        expect(body).not.toHaveProperty("password")
      })
    })

    describe("Failed", () => {
      test("Should return status 400 and message duplicate email", async () => {
        let {status, body} = await request(app)
          .post("/users/register")
          .send(user1)
          console.log(body);
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "email has been used")
      })
    })
  })
})

afterAll(async () => {
  await queryInterface.bulkDelete('Users', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  });
})