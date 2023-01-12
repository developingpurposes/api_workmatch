import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import AppDataSource from "../../../data-source";
import {
  mockedAdminLoginRequest,
  mockedLoginRequest,
} from "../../mocks/integration/login.mock";
import { mockedCreateTechnology } from "../../mocks/integration/technologie.mock";
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
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /technlogies, Admin should be able to create Technology", async () => {
    await request(app).post("/users").send(mockedAdminUserCreate);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);

    const response = await request(app)
      .post("/technologies")
      .send(mockedCreateTechnology)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("icon");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.status).toBe(201);
  });

  test("POST /technologies, Users Should NOT be able to create Technology", async () => {
    await request(app).post("/users").send(mockedUserCreate);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserCreate);

    const response = await request(app)
      .post("/technologies")
      .send(mockedCreateTechnology)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /technologies, Admin should be able to edit Technology", async () => {
    await request(app).post("/users").send(mockedAdminUserCreate);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const techs = await request(app).get("/technologies");

    const response = await request(app)
      .patch(`/technologies/${techs.body[0].id}`)
      .send({
        name: "React Native 2",
        icon: "http://reactNative.com",
      })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body.name).toBe("React Native 2");
    expect(response.body.icon).toBe("http://reactNative.com");
    expect(response.status).toBe(200);
  });

  test("DELETE /technologies:id, Admin should be possible to delete Technology", async () => {
    await request(app).post("/users").send(mockedAdminUserCreate);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const techs = await request(app).get("/technologies");

    const response = await request(app)
      .delete(`/technologies/${techs.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(response.body).not.toHaveLength(1);
  });

  test("DELETE /technologies:id, User should not be possible to delete Technology", async () => {
    await request(app).post("/users").send(mockedUserCreate);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);
    const techs = await request(app).get("/technologies");

    const response = await request(app)
      .delete(`/technologies/${techs.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
