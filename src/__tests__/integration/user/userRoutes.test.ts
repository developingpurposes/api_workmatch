import request from "supertest";
import { app } from "../../../app";
import { DataSource } from "typeorm";
import {
  mockedAdminUserCreate,
  mockedUpdateUserCreate,
  mockedUserCreate,
} from "../../mocks/integration/user.mocks";
import AppDataSource from "../../../data-source";
import {
  mockedLoginUpdateUserRequest,
} from "../../mocks/integration/login.mock";
import { adminToken, userToken } from "../../mocks/integration/token.mocks";

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
    await request(app).post("/users").send(mockedAdminUserCreate);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users, Should be able to create user", async () => {
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
    expect(response.status).toBe(201);
  });

  test("POST /users -  should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/users").send(mockedUserCreate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /users -  Must be able to list users", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", await adminToken());

    expect(response.body.users).toHaveLength(2);
    expect(response.body.users[0]).not.toHaveProperty("password");
  });

  test("GET /users -  should not be able to list users without authentication", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /users -  should not be able to list users not being admin", async () => {

    const response = await request(app)
      .get("/users")
      .set("Authorization", await userToken());

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("GET /users/:id -  Must be able to list user by Id", async () => {
    const users = await request(app)
      .get("/users")
      .set("Authorization", await adminToken());
    const response = await request(app)
      .get(`/users/${users.body.users[0].id}`)
      .set("Authorization", await adminToken());

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
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
    expect(response.status).toBe(200);
  });

  test("GET users/:id -  should not be able to list a user with invalid id", async () => {
    const response = await request(app)
      .get(`/users/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4`)
      .set("Authorization", await adminToken());

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /users, Should not be able to update without authentication", async () => {
    const userToUpdate = await request(app)
      .get("/users")
      .set("Authorization", await adminToken());

    const response = await request(app).patch(
      `/users/${userToUpdate.body.users[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /users, Should not be able to update with invalid id", async () => {
    const newData = { name: "Teste", email: "teste@mail.com" };

    const response = await request(app)
      .patch(`/users/olhaotesteeeeee`)
      .set("Authorization", await userToken())
      .send(newData);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /users, Should not be able to update another user without admin permission", async () => {
    const newValue = { isAdm: true };

    const userToUpdateRequest = await request(app)
      .get("/users")
      .set("Authorization", await adminToken());
    const response = await request(app)
      .patch(`/users/${userToUpdateRequest.body.users[0].id}`)
      .set("Authorization", await userToken())
      .send(newValue);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /users, Should not be able to update Adm credential", async () => {
    const newAdmValue = { isAdm: true };

    const userToUpdate = await request(app)
      .get("/users")
      .set("Authorization", await adminToken());

    const response = await request(app)
      .patch(`/users/${userToUpdate.body.users[0].id}`)
      .set("Authorization", await adminToken())
      .send(newAdmValue);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /users, Should be able to update user", async () => {
    const userToUpdate = await request(app)
      .post("/users")
      .send(mockedUpdateUserCreate);

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginUpdateUserRequest);

    const updateResponse = await request(app)
      .patch(`/users/${userToUpdate.body.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        email: "updatetest99@mail.com",
        username: "updatedfabinho",
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.email).toBe("updatetest99@mail.com");
    expect(updateResponse.body.username).toBe("updatedfabinho");
  });

  test("DELETE /users, Should not be able to delete user without authentication", async () => {
    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", await adminToken());

    const response = await request(app).delete(
      `/users/${UserTobeDeleted.body.users[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /users, Should not be able to delete user not being admin", async () => {
    const userTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", await adminToken());

    const response = await request(app)
      .delete(`/users/${userTobeDeleted.body.users[0].id}`)
      .set("Authorization", await userToken());

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /users, Should be able to soft delete user", async () => {
    const userTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", await adminToken());

    const response = await request(app)
      .delete(`/users/${userTobeDeleted.body.users[0].id}`)
      .set("Authorization", await adminToken());
    expect(response.status).toBe(204);
  });

  test("DELETE /users, Should not be able to delete user with isActive = false", async () => {
    const userTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", await adminToken());

    const response = await request(app)
      .delete(`/users/${userTobeDeleted.body.users[0].id}`)
      .set("Authorization", await adminToken());

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /users, Should not be able to delete user with invalid id", async () => {
    const response = await request(app)
      .delete("/users/1")
      .set("Authorization", await adminToken());

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
