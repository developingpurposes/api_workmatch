import AppDataSource from "../../../data-source";
import request from "supertest";
import { app } from "../../../app";
import { DataSource } from "typeorm";
import { mockedUserCreate } from "../../mocks/integration/user.mocks";

describe("/users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be possible to create user, method POST", async () => {
    const response = await request(app).post("/users").send(mockedUserCreate);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password"); // NOT
    expect(response.body).toHaveProperty("username");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("avatarUrl");
    expect(response.body).toHaveProperty("bio");
    expect(response.body).toHaveProperty("level");
    expect(response.body).toHaveProperty("contact");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");

    //EXPECTED RESULTS
    expect(response.body.email).toEqual("fabio@mail.com");
    expect(response.body.isAdm).toEqual(false);
    expect(response.body.isActive).toEqual(true);
    expect(response.statusCode).toBe(201); //VALIDAR .STATUSCODE ou .STATUS
  });
});
