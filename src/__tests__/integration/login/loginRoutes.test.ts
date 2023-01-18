import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import AppDataSource from "../../../data-source";
import {
  mockedAdminLoginRequest,
  mockedInvalidFieldRequest,
  mockedLoginRequest,
} from "../../mocks/integration/login.mock";
import { adminToken } from "../../mocks/integration/token.mocks";
import {
  mockedAdminUserCreate,
  mockedUserCreate,
} from "../../mocks/integration/user.mocks";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUserCreate);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login, Should be able to login", async () => {
    const response = await request(app).post("/login").send(mockedLoginRequest);
    expect(response.body).toHaveProperty("token");
    expect(response.statusCode).toBe(200);
  });

  test("POST /login, Should not be able to login with email or password invalid", async () => {
    const response = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    expect(response.body).not.toHaveProperty("token");
    expect(response.statusCode).toBe(401);
  });

  test("POST /login, Should not be able to login if field is empty or wrong", async () => {
    const response = await request(app)
      .post("/login")
      .send(mockedInvalidFieldRequest);

    expect(response.body).not.toHaveProperty("token");
    expect(response.statusCode).toBe(400);
  });

  test("POST /login, Should not be able to login with isActive = false", async () => {
    const userToDeleteResponse = await request(app)
      .post("/users")
      .send(mockedAdminUserCreate);

    await request(app)
      .delete(`/users/${userToDeleteResponse.body.id}`)
      .set("Authorization", await adminToken());
    const response = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    expect(response.body).not.toHaveProperty("token");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
