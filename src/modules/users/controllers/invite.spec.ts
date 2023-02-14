import request from "supertest";
import { createApp } from "@src/app.js";

describe('Invite Controller', () => {
    describe('Check user is authorized or not', () => {
        it('if user has token', async () => {
            const app = createApp()
            const response = await (
                await request(app).post("/v1/users/invite")
            ).headers({
                Authorization: "Bearer <token>",
            }).send({
                name: "",
                email: "",
                role: "",
                brancAccessId: []
            });
            expect(response.statusCode).toEqual(201);
            expect(response._id).toBeUndefined();
        })
        it('if user doesnt have token', async () => {
            const app = createApp()
            const response = await (
                await request(app).post("/v1/users/invite")
            ).headers({
                Authorization: "",
            }).send({
                name: "",
                email: "",
                role: "",
                brancAccessId: []
            });
            expect(response.statusCode).toEqual(401);
            expect(response._id).not.toBeUndefined();
        })
    })

    describe('Check user permission of invite', () => {
        it('if user have permission', async () => {
            const app = createApp()
            const response = await (
                await request(app).post("/v1/users/invite")
            ).headers({
                Authorization: "Bearer <token>",
            }).send({
                name: "",
                email: "",
                role: "",
                brancAccessId: []
            });
            expect(response.statusCode).toEqual(201);
            expect(response._id).toBeUndefined();
        })
        it('if user dont have permission', async () => {
            const app = createApp()
            const response = await (
                await request(app).post("/v1/users/invite")
            ).headers({
                Authorization: "Bearer <token>",
            }).send({
                name: "",
                email: "",
                role: "",
                brancAccessId: []
            });
            expect(response.statusCode).toEqual(403);
            expect(response._id).not.toBeUndefined();
        })
    })
    describe('Check if required fields filled out', () => {
        it('if all field filled out', () => {
            it('if user doesnt fill branchAccess', async () => {
                const app = createApp()
                const response = await (
                    await request(app).post("/v1/users/invite")
                ).headers({
                    Authorization: "Bearer <token>",
                }).send({
                    name: "John Doe",
                    email: "johndoe@gmail.com",
                    role: "63eae28fc8f7e4e683532071",
                    brancAccessId: [
                        "63eae28fc8f7e4e683532071",
                        "63eae28fc8f7e4e683532071"
                    ]
                });
                expect(response.statusCode).toEqual(201);
                expect(response._id).not.toBeUndefined();
            })
        })
        it('if user doesnt fill branchAccess', async () => {
            const app = createApp()
            const response = await (
                await request(app).post("/v1/users/invite")
            ).headers({
                Authorization: "Bearer <token>",
            }).send({
                name: "John Doe",
                email: "johndoe@gmail.com",
                role: "63eae28fc8f7e4e683532071",
                brancAccessId: []
            });
            expect(response.statusCode).toEqual(400);
            expect(response.message).toEqual(expect.stringContaining('branchAccessId'))
            expect(response._id).not.toBeUndefined();
        })
        it('if user doesnt fill name', async () => {
            const app = createApp()
            const response = await (
                await request(app).post("/v1/users/invite")
            ).headers({
                Authorization: "Bearer <token>",
            }).send({
                name: "",
                email: "johndoe@gmail.com",
                role: "63eae28fc8f7e4e683532071",
                brancAccessId: [
                    "63eae28fc8f7e4e683532071",
                    "63eae28fc8f7e4e683532071"
                ]
            });
            expect(response.statusCode).toEqual(400);
            expect(response.message).toEqual(expect.stringContaining('name'))
            expect(response._id).not.toBeUndefined();
        })
        it('if user doesnt fill email', async () => {
            const app = createApp()
            const response = await (
                await request(app).post("/v1/users/invite")
            ).headers({
                Authorization: "Bearer <token>",
            }).send({
                name: "John Doe",
                email: "",
                role: "63eae28fc8f7e4e683532071",
                brancAccessId: [
                    "63eae28fc8f7e4e683532071",
                    "63eae28fc8f7e4e683532071"
                ]
            });
            expect(response.statusCode).toEqual(400);
            expect(response.message).toEqual(expect.stringContaining('email'))
            expect(response._id).not.toBeUndefined();
        })
        it('if user doesnt fill role', async () => {
            const app = createApp()
            const response = await (
                await request(app).post("/v1/users/invite")
            ).headers({
                Authorization: "Bearer <token>",
            }).send({
                name: "John Doe",
                email: "johndoe@gmail.com",
                role: "",
                brancAccessId: [
                    "63eae28fc8f7e4e683532071",
                    "63eae28fc8f7e4e683532071"
                ]
            });
            expect(response.statusCode).toEqual(400);
            expect(response.message).toEqual(expect.stringContaining('role'))
            expect(response._id).not.toBeUndefined();
        })
    })

    describe('Check the uniqueness of the data', () => {
        it('if all data is unique', async () => {
            const app = createApp()
            const response = await (
                await request(app).post("/v1/users/invite")
            ).headers({
                Authorization: "Bearer <token>",
            }).send({
                name: "John Doe",
                email: "johndoe@gmail.com",
                role: "63eae28fc8f7e4e683532071",
                brancAccessId: [
                    "63eae28fc8f7e4e683532071",
                    "63eae28fc8f7e4e683532071"
                ]
            });
            expect(response.statusCode).toEqual(201);
            expect(response._id).not.toBeUndefined();
        })
        it('if email is already exist', async () => {
            const app = createApp()
            const response = await (
                await request(app).post("/v1/users/invite")
            ).headers({
                Authorization: "Bearer <token>",
            }).send({
                name: "John Doe",
                email: "johndoe@gmail.com",
                role: "63eae28fc8f7e4e683532071",
                brancAccessId: [
                    "63eae28fc8f7e4e683532071",
                    "63eae28fc8f7e4e683532071"
                ]
            });
            expect(response.statusCode).toEqual(200);
            expect(response.message).toEqual(expect.stringContaining('email'))
            expect(response._id).not.toBeUndefined();
        })
    })
})