import  request  from "supertest";
import { app } from "../../../app";
import { mockedAdminLoginRequest, mockedLoginRequest } from "./login.mock";

export const adminToken = async () => {
    const adminLoginResponse = await request(app)
    .post("/login")
    .send(mockedAdminLoginRequest);

    return `Bearer ${adminLoginResponse.body.token}`;
  }

export const userToken = async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginRequest);

    return `Bearer ${userLoginResponse.body.token}`;
  }