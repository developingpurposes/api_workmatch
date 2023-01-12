import request from "supertest";
import { app } from "../../../app";
import { DataSource } from "typeorm";
import {
  mockedAdminUserCreate,
  mockedUserCreate,
} from "../../mocks/integration/user.mocks";
import AppDataSource from "../../../data-source";
import {
  mockedAdminLoginRequest,
  mockedLoginRequest,
} from "../../mocks/integration/login.mock";

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

  test("POST /users -  should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/users").send(mockedUserCreate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /users -  Must be able to list users", async () => {
    await request(app).post("/users").send(mockedAdminUserCreate);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(2);
    expect(response.body[0]).not.toHaveProperty("password");
  });

  test("GET /users -  should not be able to list users without authentication", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /users -  should not be able to list users not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("GET /users/:id -  must be able to list user by Id", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const users = await request(app).get("/users");
    const response = await request(app)
      .get(`/users/${users.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

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
    expect(response.status).toBe(200);
  });

  test("GET users/:id -  should not be able to list a user with invalid id", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const response = await request(app)
      .get(`/users/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("Should not be possible to update without authentication, method POST", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);
    const userToUpdate = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    const response = await request(app).patch(
      `/users/${userToUpdate.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("Should not be possible to update with invalid id, method POST", async () => {
    const newData = { name: "Teste", email: "teste@mail.com" };

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);
    const token = `Bearer ${loginResponse.body.token}`;

    const response = await request(app)
      .patch(`/users/91792517-9ght-167a-4e9h-nn0ca67f8h`)
      .set("Authorization", token)
      .send(newData);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("Shoul not be possible to update another user without admin permission, method PATCH", async () => {
    const newValue = { isAdm: true };

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const userToUpdateRequest = await request(app)
      .get("/users")
      .set("Authorization", adminToken);
    const response = await request(app)
      .patch(`/users/${userToUpdateRequest.body[0].id}`)
      .set("Authorization", userToken)
      .send(newValue);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("Should be possible to update Adm credential, method PATCH", async () => {
    const newAdmValue = { isAdm: true };

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);
    const token = `Bearer ${loginResponse.body.token}`;

    const userToUpdate = await request(app)
      .get("/users")
      .set("Authorization", token);

    const response = await request(app)
      .patch(`/users/${userToUpdate.body[0].id}`)
      .set("Authorization", token)
      .send(newAdmValue);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("Should be possible to update User, method PATCH", async () => {
    const newData = { name: "Teste", email: "teste@mail.com" };

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);
    const token = `Bearer ${loginResponse.body.token}`;

    const userToUpdate = await request(app)
      .get("/users")
      .set("Authorization", token);

    const response = await request(app)
      .patch(`/users/${userToUpdate.body[0].id}`)
      .set("Authorization", token)
      .send(newData);

    const updatedUser = await request(app)
      .get("/users")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(updatedUser.body[0].name).toEqual("Teste");
    expect(updatedUser.body[0]).not.toHaveProperty("password");
  });

  test("Should not be possible to delete user without authentication, method DELETE", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/users/${UserTobeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("Should not be possible to delete user not being admin, method DELETE", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);

    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${UserTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
  });

  test("Should be possible to soft delete user, method DELETE", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${UserTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(204);
  });

  test("Should not be possible to delete user with isActive = false, method DELETE", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);
    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${UserTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("Should not be possible to delete user with invalid id, DELETE", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLoginRequest);

    const response = await request(app)
      .delete(`/users/1`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});