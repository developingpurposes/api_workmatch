import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import AppDataSource from "../../../data-source";
import {
  invalidMockedProjectCreate,
  mockedProjectCreate,
} from "../../mocks/integration/project.mock";
import { mockedCreateTechnology } from "../../mocks/integration/technology.mock";
import { adminToken, userToken } from "../../mocks/integration/token.mocks";
import {
  mockedAdminUserCreate,
  mockedUserCreate,
} from "../../mocks/integration/user.mocks";

describe("/project", () => {
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

  test("POST /projects, Should be able to create project", async () => {
    const technologies = await request(app)
      .post("/technologies")
      .send(mockedCreateTechnology)
      .set("Authorization", await adminToken());

    mockedProjectCreate.technologies = [`${technologies.body.id}`];

    const response = await request(app)
      .post("/projects")
      .set("Authorization", await adminToken())
      .send(mockedProjectCreate);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("imgUrl");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("maxTeamSize");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("ownerId");
    expect(response.body).toHaveProperty("technologies");

    expect(response.body.technologies.length).toEqual(1);
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("POST /projects, should not be able to create projects with invalid data", async () => {
    const response = await request(app)
      .post("/projects")
      .set("Authorization", await userToken())
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
    const response = await request(app)
      .get("/projects")
      .set("Authorization", await adminToken());

    expect(response.body.projects).toHaveLength(1);
    expect(response.body.projects[0]).toHaveProperty("id");
  });

  test("GET /projects -  Must be able to list projects by ownerID", async () => {
    const projectresponse = await request(app)
      .get("/projects")
      .set("Authorization", await adminToken());

    const response = await request(app)
      .get(`/projects/user/${projectresponse.body.projects[0].owner.id}`)
      .set("Authorization", await adminToken());

    expect(response.body.projects).toHaveLength(1);
    expect(response.body.projects[0]).toHaveProperty("id");
    expect(response.status).toBe(200);
  });

  test("GET /projects, Should not be able to list projects without authentication", async () => {
    const response = await request(app).get("/projects");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /projects, Should be able to update Project", async () => {
    const newData = { name: "Teste", description: "salve os gatineos" };

    const projectToUpdate = await request(app)
      .get("/projects")
      .set("Authorization", await adminToken());

    const response = await request(app)
      .patch(`/projects/${projectToUpdate.body.projects[0].id}`)
      .set("Authorization", await adminToken())
      .send(newData);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("Teste");
  });

  test("PATCH /projects, should not be able to update projects without authentication", async () => {
    const newData = { name: "Teste", description: "salve os gatineos" };

    const projectToUpdate = await request(app)
      .get("/projects")
      .set("Authorization", await userToken());

    const response = await request(app)
      .patch(`/projects/${projectToUpdate.body.projects[0].id}`)
      .send(newData);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /projects, should not be able to update projects with invalid Id", async () => {
    const newData = { name: "Teste", description: "salve os gatineos" };

    const response = await request(app)
      .patch(`/projects/olhaoteste111`)
      .set("Authorization", await adminToken())
      .send(newData);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /projects, should not be able to update projects of other user without admin privileges", async () => {
    const newData = { name: "Teste", description: "salve os gatineos" };

    const projectToUpdate = await request(app)
      .get("/projects")
      .set("Authorization", await userToken());

    const response = await request(app)
      .patch(`/projects/${projectToUpdate.body.projects[0].id}`)
      .send(newData)
      .set("Authorization", await userToken());

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /projects, should not be able to join projects without authentication", async () => {
    const project = await request(app)
      .get("/projects")
      .set("Authorization", await userToken());

    const response = await request(app).post(
      `/projects/joinqueue/${project.body.projects[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /projects, should not be able to join projects without authentication", async () => {
    const project = await request(app)
      .get("/projects")
      .set("Authorization", await userToken());

    const response = await request(app).post(
      `/projects/joinqueue/${project.body.projects[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /projects, should be able to join projects", async () => {
    const project = await request(app)
      .get("/projects")
      .set("Authorization", await userToken());

    const response = await request(app)
      .post(`/projects/joinqueue/${project.body.projects[0].id}`)
      .set("authorization", await userToken());

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });

  test("POST /projects, should not be able to join projects if already joined", async () => {
    const project = await request(app)
      .get("/projects")
      .set("Authorization", await userToken());

    const response = await request(app)
      .post(`/projects/joinqueue/${project.body.projects[0].id}`)
      .set("Authorization", await userToken());

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /projects, should not be able to join projects if you are owner of project", async () => {
    const project = await request(app)
      .get("/projects")
      .set("Authorization", await adminToken());

    const response = await request(app)
      .post(`/projects/joinqueue/${project.body.projects[0].id}`)
      .set("Authorization", await adminToken());

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /projects, should be able to list all participants", async () => {
    const project = await request(app)
      .get("/projects")
      .set("Authorization", await adminToken());

    const response = await request(app)
      .get(`/projects/${project.body.projects[0].id}/queue`)
      .set("Authorization", await adminToken());

    expect(response.body.listQueue).toHaveLength(1);
    expect(response.body.listQueue[0].user).toHaveProperty("id");
    expect(response.status).toBe(200);
  });

  test("GET /projects, should not be able to list all participants whithout authentication", async () => {
    const project = await request(app)
      .get("/projects")
      .set("Authorization", await adminToken());

    const response = await request(app).get(
      `/projects/${project.body.projects[0].id}/queue`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /projects, should not be able to list all participants if not owner", async () => {
    const projectResponse = await request(app)
      .get("/projects")
      .set("Authorization", await userToken());

    const response = await request(app)
      .get(`/projects/${projectResponse.body.projects[0].id}/queue`)
      .set("Authorization", await userToken());

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /projects, should not be able to accept participants if not owner", async () => {
    const projectToUpdate = await request(app)
      .get("/projects")
      .set("Authorization", await adminToken());

    const participantToUpdate = await request(app)
      .get(`/projects/${projectToUpdate.body.projects[0].id}/queue`)
      .set("Authorization", await adminToken());

    const response = await request(app)
      .patch(
        `/projects/confirmuser/${participantToUpdate.body.listQueue[0].id}`
      )
      .set("Authorization", await userToken());

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /projects, should be able to accept participants", async () => {
    const project = await request(app)
      .get("/projects")
      .set("Authorization", await adminToken());

    const projectParticipants = await request(app)
      .get(`/projects/${project.body.projects[0].id}/queue`)
      .set("Authorization", await adminToken());

    const response = await request(app)
      .patch(
        `/projects/confirmuser/${projectParticipants.body.listQueue[0].id}`
      )
      .set("Authorization", await adminToken());

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });

  test("DELETE /projects, Should not be able to delete projects without auhentication", async () => {
    const projectToBeDeleted = await request(app)
      .get("/projects")
      .set("Authorization", await userToken());

    const response = await request(app).delete(
      `/projects/${projectToBeDeleted.body.projects[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /projects, Should be able to soft delete project", async () => {
    const projectToBeDeleted = await request(app)
      .get("/projects")
      .set("Authorization", await adminToken());

    const response = await request(app)
      .delete(`/projects/${projectToBeDeleted.body.projects[0].id}`)
      .set("Authorization", await adminToken());

    expect(response.status).toBe(204);
  });

  test("DELETE /projects, Should not be able to delete project with isActive = false", async () => {
    const projectToBeDeleted = await request(app)
      .get("/projects")
      .set("Authorization", await adminToken());

    const response = await request(app)
      .delete(`/projects/${projectToBeDeleted.body.projects[0].id}`)
      .set("Authorization", await adminToken());

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /projects, Should not be able to delete project with invalid id", async () => {
    const response = await request(app)
      .delete("/projects/56516144")
      .set("Authorization", await adminToken());

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
