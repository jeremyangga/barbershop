// user.test.js
const request = require("supertest");
const express = require("express");
const userRouter = require("./user");

const app = express();
app.use(express.json());
app.use("/user", userRouter);

describe("User Routes Tests", () => {
  it("Test 1: Should return status 200 and a message from the /user route (GET)", async () => {
    const response = await request(app).get("/user");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "List of users" });
  });

  it("Test 2: Should return status 200 and a message with user ID from the /user/:id route (GET)", async () => {
    const userId = "123";
    const response = await request(app).get(`/user/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: `User with ID ${userId}` });
  });

  it("Test 3: Should return status 201 and a message from the /user route (POST)", async () => {
    const newUser = { username: "john_doe" };
    const response = await request(app).post("/user").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: `User ${newUser.username} created successfully`,
    });
  });

  // Add more tests as needed for additional user routes
});
