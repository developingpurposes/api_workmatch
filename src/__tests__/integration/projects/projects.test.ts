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

  test("POST /projects, Should be able to create project", async () => {
    const registerResponse = await request(app)
      .post("/users")
      .send(mockedAdminUserCreate);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);

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

    expect(response.body.projectTech.length).toEqual(3);
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(201);
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
    expect(response.status).toBe(400);
  });

  test("POST /projects, should not be able to create projects without authentication", async () => {
    const response = await request(app)
      .post("/projects")
      .send(mockedProjectCreate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /projects -  Must be able to list projects", async () => {
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

  test("GET /projects -  Must be able to list projects by ownerID", async () => {
    const LoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);

    const projectresponse = await request(app)
      .get("/projects")
      .set("Authorization", `Bearer ${LoginResponse.body.token}`);

    const response = await request(app)
      .get(`/projects/user/${projectresponse.body[0].userId}`)
      .set("Authorization", `Bearer ${LoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.status).toBe(200);
  });

  test("GET /projects, should not be able to list projects without authentication", async () => {
    const response = await request(app).get("/projects");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /projects, Should be able to update Project", async () => {
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

    expect(response.status).toBe(200);
    expect(response.body[0].name).toEqual("Teste");
  });

  test("DELETE /projects, Should not be able to delete projects without auhentication", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);

    const projectToBeDeleted = await request(app)
      .get("/projects")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/projects/${projectToBeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /projects, Should be able to soft delete project", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);

    const projectToBeDeleted = await request(app)
      .get("/projects")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${projectToBeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /projects, Should not be able to delete project with isActive = false", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);

    const projectToBeDeleted = await request(app)
      .get("/projects")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/users/${projectToBeDeleted.body[0].id}`
    );

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /projects, Should not be able to delete project with invalid id", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);

    const response = await request(app)
      .delete("/projects/56516144")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /projects, should not be able to update projects without authentication", async () => {
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
      .send(newData);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /projects, should not be able to update projects with invalid Id", async () => {
    const newData = { name: "Teste", description: "salve os gatineos" };

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const token = `Bearer ${loginResponse.body.token}`;

    const response = await request(app)
      .patch(`/projects/olhaoteste111`)
      .set("Authorization", token)
      .send(newData);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /projects, should not be able to update projects of other user without admin privileges", async () => {
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
      .send(newData)
      .set("Authorization", token);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /projects, should not be able to join projects without authentication", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);
    const token = `Bearer ${loginResponse.body.token}`;

    const project = await request(app)
      .get("/projects")
      .set("Authorization", token);

    const response = await request(app).post(
      `/projects/joinqueue/${project.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /projects, should not be able to join projects without authentication", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);
    const token = `Bearer ${loginResponse.body.token}`;

    const project = await request(app)
      .get("/projects")
      .set("Authorization", token);

    const response = await request(app).post(
      `/projects/joinqueue/${project.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /projects, should be able to join projects", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);
    const token = `Bearer ${loginResponse.body.token}`;

    const project = await request(app)
      .get("/projects")
      .set("Authorization", token);

    const response = await request(app)
      .post(`/projects/joinqueue/${project.body[0].id}`)
      .set("authorization", token);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });

  test("POST /projects, should not be able to join projects if already joined", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);
    const token = `Bearer ${loginResponse.body.token}`;

    const project = await request(app)
      .get("/projects")
      .set("Authorization", token);

    const response = await request(app)
      .post(`/projects/joinqueue/${project.body[0].id}`)
      .set("Authorization", token);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /projects, should not be able to join projects if you are owner of project", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const token = `Bearer ${loginResponse.body.token}`;

    const project = await request(app)
      .get("/projects")
      .set("Authorization", token);

    const response = await request(app)
      .post(`/projects/joinqueue/${project.body[0].id}`)
      .set("Authorization", token);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /projects, should be able to list all participants", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const token = `Bearer ${loginResponse.body.token}`;

    const project = await request(app)
      .get("/projects")
      .set("Authorization", token);

    const response = await request(app)
      .get(`/projects/${project.body[0].id}/queue`)

      .set("Authorization", token);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });

  test("GET /projects, should not be able to list all participants whithout authentication", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const token = `Bearer ${loginResponse.body.token}`;

    const project = await request(app)
      .get("/projects")
      .set("Authorization", token);

    const response = await request(app)
      .get(`/projects/${project.body[0].id}/queue`)

      .set("Authorization", token);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /projects, should not be able to list all participants if not owner", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);
    const token = `Bearer ${loginResponse.body.token}`;

    const projectResponse = await request(app)
      .get("/projects")
      .set("Authorization", token);

    const response = await request(app)
      .get(`/projects/${projectResponse.body[0].id}/queue`)
      .set("Authorization", token);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /projects, should not be able to accept participants if not owner", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);
    const token = `Bearer ${loginResponse.body.token}`;

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const projectToUpdate = await request(app)
      .get("/projects")
      .set("Authorization", adminToken);

    const participantToUpdate = await request(app)
      .get(`/projects/${projectToUpdate.body[0].id}/queue`)
      .set("Authorization", adminToken);

    const response = await request(app)
      .get(`/projects/acceptparticipant/${participantToUpdate.body[0].id}`)
      .set("Authorization", token);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /projects, shouldbe able to accept participants", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const token = `Bearer ${loginResponse.body.token}`;

    const project = await request(app)
      .get("/projects")
      .set("Authorization", token);

    const projectParticipants = await request(app)
      .get(`/projects/${project.body[0].id}/queue`)
      .set("Authorization", token);

    const response = await request(app)
      .get(`/projects/acceptparticipant/${projectParticipants.body[0].id}`)
      .set("Authorization", token);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });
});
