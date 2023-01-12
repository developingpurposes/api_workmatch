import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import AppDataSource from "../../../data-source";
import {
  mockedAdminLoginRequest,
  mockedLoginRequest,
} from "../../mocks/integration/login.mock";
import {
  invalidMockedProjectCreate,
  mockedProjectCreate,
} from "../../mocks/integration/project.mock";
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

  test("POST /projects, Should be possible to create project", async () => {
    const registerResponse = await request(app)
      .post("/users")
      .send(mockedUserCreate);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);

    mockedProjectCreate.user = registerResponse.body.id;

    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedProjectCreate);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("imgUrl");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("maxTeamSize");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("userProjects");
    expect(response.body).toHaveProperty("projectTech");

    //EXPECTED RESULTS
    expect(response.body.projectTech.length).toEqual(3);
    expect(response.body.isActive).toEqual(true);
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(201); //VALIDAR .STATUSCODE ou .STATUS
  });

  test("POST /projects, should not be able to create projects with invalid data", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);

    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(invalidMockedProjectCreate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /projects, should not be able to create projects without authentication", async () => {
    const response = await request(app)
      .post("/projects")
      .send(mockedProjectCreate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /users -  Must be able to list users", async () => {
    await request(app).post("/users").send(mockedLoginRequest);
    const LoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const response = await request(app)
      .get("/projects")
      .set("Authorization", `Bearer ${LoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("id");
  });

  test("GET /projects, should not be able to list projects without authentication", async () => {
    const response = await request(app).get("/projects");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("Update /projects, Should be possible to update Project", async () => {
    const newData = { name: "Teste", description: "salve os gatineos" };

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);
    const token = `Bearer ${loginResponse.body.token}`;

    const projectToUpdate = await request(app)
      .get("/projects")
      .set("Authorization", token);

    const response = await request(app)
      .patch(`/projects/${projectToUpdate.body[0].id}`)
      .set("Authorization", token)
      .send(newData);

    const updatedProject = await request(app)
      .get("/projects")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(updatedProject.body[0].name).toEqual("Teste");
  });
});
