const app = require('../app');
const request = require('supertest');
const {sequelize, User} = require('../models');
const {queryInterface} = sequelize;
const {signToken} = require('../helpers/jwt');

const moviesJSON = require('../data/movies.json');

const user1 = {
  email: "bebek@mail.com",
  password: '123123'
}

let access_token_1 = null
let access_token_invalid = "asdasdasdasdad"

beforeAll(async () => {
  let user = await User.create(user1)

  access_token_1 = signToken({id: user.id})

  await queryInterface.bulkInsert(
    "Movies",
    moviesJSON.map((movie) => {
      movie.createdAt = movie.updatedAt = new Date();
      return movie;
    }, {})
  );
})

describe("/movies", () => {
  describe("GET /movies", () => {
    describe("Success", () => {
      test("Should return status 200 and array of object", async () => {
        let {status, body} = await request(app)
        .get("/movies")
        .set("Authorization", `Bearer ${access_token_1}`)

        expect(status).toBe(200)
        expect(body).toHaveLength(moviesJSON.length)
        expect(body[0]).toHaveProperty("id", expect.any(Number))
        expect(body[0]).toHaveProperty("title", moviesJSON[0].title)
      })
    })

    describe("Failed", () => {
      test("Should return status 401 and message invalid token", async () => {
        let {status, body} = await request(app)
        .get("/movies")
        .set("Authorization", `Bearer ${access_token_invalid}`)

        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Unauthenticated")
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