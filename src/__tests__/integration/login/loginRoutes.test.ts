import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import AppDataSource from "../../../data-source";
import {
  mockedAdminLoginRequest,
  mockedLoginRequest,
} from "../../mocks/integration/login.mock";
import { mockedUserCreate } from "../../mocks/integration/user.mocks";

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

  test("Should be possible to login, method POST /login", async () => {
    const response = await request(app).post("/login").send(mockedLoginRequest);
    expect(response.body).toHaveProperty("token");
    expect(response.statusCode).toBe(200);
  });

  test("Should not be able to login with email or password invalid, method POST /login", async () => {
    const response = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    expect(response.body).not.toHaveProperty("token");
    expect(response.statusCode).toBe(404);
  });

  test("Should not be able to login with isActive = false, method POST /login", async () => {
    const responseAdminLogin = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const findUser = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${responseAdminLogin.body.token}`);
    await request(app)
      .delete(`/users/${findUser.body[0].id}`)
      .set("Authorization", `Bearer ${responseAdminLogin.body.token}`);
    const response = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);

    expect(response.body).not.toHaveProperty("token");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });
});
