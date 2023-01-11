import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import AppDataSource from "../../../data-source";
import { mockedLoginRequest } from "../../mocks/integration/login.mock";
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

  test("Should be possible to login, method POST", async () => {
    const response = await request(app).post("/login").send(mockedLoginRequest);
    expect(response.body).toHaveProperty("token");
    expect(response.statusCode).toBe(200);
  });
});
