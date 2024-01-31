const app = require('../app');
const request = require('supertest');

test("GET /", async () => {
  let {status, body} = await request(app).get("/")
  expect(status).toBe(200)
  expect(body).toHaveProperty("message", "Helo HCK 67")
})