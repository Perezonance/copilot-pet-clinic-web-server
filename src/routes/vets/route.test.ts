import { FastifyInstance } from "fastify";
import { Veterinarian } from "../../models/veterinarian";
import route from "./route";

jest.mock("../../controllers/vets", () => ({
  addVet: jest.fn().mockImplementation((req, reply) => {
    const { firstName, lastName, specialty } = req.body;
    if (!firstName || !lastName || !specialty) {
      return reply.status(400).send({ error: "Missing required fields" });
    }
    return reply.status(200).send(req.body);
  }),
  getVets: jest.fn().mockImplementation((req, reply) => {
    return reply.status(200).send([]);
  }),
}));

describe("Vets Routes", () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = require("fastify")();
    fastify.register(route);
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  describe("POST /vets", () => {
    it("should add a new veterinarian", async () => {
      const newVet: Veterinarian = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        specialty: "Surgery",
      };

      const response = await fastify.inject({
        method: "POST",
        url: "/vets",
        payload: newVet,
      });

      expect(response.statusCode).toBe(200);
      const responseBody = JSON.parse(response.body);
      expect(responseBody).toMatchObject(newVet);
    });

    it("should return 400 if required fields are missing", async () => {
      const incompleteVet = {
        firstName: "Jane",
      };

      const response = await fastify.inject({
        method: "POST",
        url: "/vets",
        payload: incompleteVet,
      });

      expect(response.statusCode).toBe(400);
    });

    it("should return 400 if payload is empty", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/vets",
        payload: {},
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe("GET /vets", () => {
    it("should return a list of veterinarians", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/vets",
      });

      expect(response.statusCode).toBe(200);
      const responseBody = JSON.parse(response.body);
      expect(Array.isArray(responseBody)).toBe(true);
    });

    it("should return an empty array if no veterinarians are found", async () => {
      // Assuming the database is empty or mocked to be empty
      const response = await fastify.inject({
        method: "GET",
        url: "/vets",
      });

      expect(response.statusCode).toBe(200);
      const responseBody = JSON.parse(response.body);
      expect(responseBody).toEqual([]);
    });
  });
});
