import request from "supertest";
import { app } from "../../../app";
import { DataSource } from "typeorm";
import { mockedUserCreate } from "../../mocks/integration/user.mocks";
import AppDataSource from "../../../data-source";
import { mockedLoginRequest } from "../../mocks/integration/login.mock";

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

test("Should not be possible to update without authentication, method POST", async () => {
  const loginResponse = await request(app).post("/login").send(mockedLoginRequest)
  const userToUpdate = await request(app).get("/users").set("Authorization", `Bearer ${loginResponse.body.token}`)
  const response = await request(app).patch(`/users/${userToUpdate.body[0].id}`)

  expect(response.body).toHaveProperty("message")
  expect(response.status).toBe(401)

})

  test("Should not be possible to update with invalid id, method POST", async () => {
    const newData = {name: "Teste", email:"teste@mail.com"}

    const loginResponse = await request(app).post("/login").send(mockedLoginRequest)
    const token = `Bearer ${loginResponse.body.token}`

    const response = await request(app).patch(`/users/91792517-9ght-167a-4e9h-nn0ca67f8h`).set("Authorization", token ).send(newData)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(404)

  })


  test("Shoul not be possible to update another user without amin permission PATCH")

  test("Should be possible to update Adm credential, method PATCH", async () => {
    const newAdmValue = {isAdm: true}

    const loginResponse = await request(app).post("/login").send(mockedLoginRequest)
    const token = `Bearer ${loginResponse.body.token}`

    const userToUpdate = await request(app).get("/users").set("Authorization", token )

    const response = await request(app).patch(`/users/${userToUpdate.body[0].id}`).set("Authorization", token).send(newAdmValue)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)

  })


  test("Should be possible to update User, method PATCH", async ()=> {
    const newData = {name: "Teste", email:"teste@mail.com"}

    const loginResponse = await request(app).post("/login").send(mockedLoginRequest)
    const token = `Bearer ${loginResponse.body.token}`

    const userToUpdate = await request(app).get("/users").set("Authorization", token )

    const response = await request(app).patch(`/users/${userToUpdate.body[0].id}`).set("Authorization", token).send(newData)

    const updatedUser = await request(app).get("/users").set("Authorization", token)


    expect(response.status).toBe(200)
    expect(updatedUser.body[0].name).toEqual("Teste")
    expect(updatedUser.body[0]).not.toHaveProperty("password")
  })

});
