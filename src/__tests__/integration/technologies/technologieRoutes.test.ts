import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import AppDataSource from "../../../data-source";
import { mockedCreateTechnology } from "../../mocks/integration/technology.mock";
import { adminToken, userToken } from "../../mocks/integration/token.mocks";
import {
  mockedAdminUserCreate,
  mockedUserCreate,
} from "../../mocks/integration/user.mocks";

describe("/technologies", () => {
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
    await request(app).post("/users").send(mockedAdminUserCreate);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /technlogies, Admin should be able to create Technology", async () => {
    const response = await request(app)
      .post("/technologies")
      .send(mockedCreateTechnology)
      .set("Authorization", await adminToken());

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("icon");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.status).toBe(201);
  });

  test("POST /technologies, Users Should NOT be able to create Technology", async () => {
    await request(app).post("/users").send(mockedUserCreate);
    const response = await request(app)
      .post("/technologies")
      .send(mockedCreateTechnology)
      .set("Authorization", await userToken());

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("PATCH /technologies, Admin should be able to edit Technology", async () => {
    const techs = await request(app)
      .get("/technologies")
      .set("Authorization", await adminToken());

    const response = await request(app)
      .patch(`/technologies/${techs.body[0].id}`)
      .send({
        name: "React Native 2",
        icon: "http://reactNative.com",
      })
      .set("Authorization", await adminToken());

    expect(response.body.name).toBe("React Native 2");
    expect(response.body.icon).toBe("http://reactNative.com");
    expect(response.status).toBe(200);
  });

  test("DELETE /technologies:id, User should not be possible to delete Technology", async () => {
    await request(app).post("/users").send(mockedUserCreate);
    const techs = await request(app)
      .get("/technologies")
      .set("Authorization", await userToken());

    const response = await request(app)
      .delete(`/technologies/${techs.body[0].id}`)
      .set("Authorization", await userToken());

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /technologies:id, Admin should be possible to delete Technology", async () => {
    const techs = await request(app)
      .get("/technologies")
      .set("Authorization", await adminToken());
    const response = await request(app)
      .delete(`/technologies/${techs.body[0].id}`)
      .set("Authorization", await adminToken());

    const deletedTech = await request(app)
      .get("/technologies")
      .set("Authorization", await adminToken());

    expect(response.status).toBe(204);
    expect(deletedTech.body).not.toHaveLength(1);
  });
});
