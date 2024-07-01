// app.test.js
const request = require("supertest");
const app = require("./app");

describe("App test", () => {
  it("Test 1: Should return status 200 and a message from the root route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Hello, World!" });
  });

  it("Test 2: Should return status 200 and a message from the /about route", async () => {
    const response = await request(app).get("/about");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "About us" });
  });

  it("Test 3: Should return status 201 and a message from the /user route (POST)", async () => {
    const user = { username: "testUser", password: "testPassword" };
    const response = await request(app)
      .post("/user")
      .send(user)
      .set("Accept", "application/json");
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "User created", user });
  });

  // Additional Tests

  it("Test 4: Should return status 404 for an unknown route", async () => {
    const response = await request(app).get("/nonexistent");
    expect(response.status).toBe(404);
  });

  it("Test 5: Should handle errors gracefully for /user route (POST)", async () => {
    const response = await request(app).post("/user").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid input" });
  });

  it("Test 6: Should handle errors for invalid JSON payload on /user route (POST)", async () => {
    const response = await request(app)
      .post("/user")
      .send("invalid-json-payload")
      .set("Accept", "application/json");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid JSON payload" });
  });

  it("Test 7: Should handle errors for unsupported HTTP method on /user route", async () => {
    const response = await request(app).put("/user");
    expect(response.status).toBe(405);
  });

  // Add more tests as needed for additional routes
});
