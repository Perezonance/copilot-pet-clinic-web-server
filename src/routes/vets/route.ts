import { FastifyRequest, FastifySchema } from "fastify";
import { getAllVets } from "../../controllers/vets/index.js";
import addVet from "../../controllers/vets/addVet";
import { Veterinarian } from "../../models/veterinarian";

const getAllVetsSchema: FastifySchema = {
  headers: {},
};

const addVetSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["firstName", "lastName", "specialty"],
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      specialty: { type: "string" },
    },
  },
};

const getAllVetsHandler = async (request: FastifyRequest<{}>, reply: any) => {
  const vets = await getAllVets();
  reply.send(vets);
};

const addVetHandler = async (
  request: FastifyRequest<{ Body: Veterinarian }>,
  reply: any
) => {
  const newVet = await addVet(request.body);
  reply.send(newVet);
};

export default (fastify: any, opts: any, done: any) => {
  fastify.get("/vets", { schema: getAllVetsSchema }, getAllVetsHandler);
  fastify.post("/vets", { schema: addVetSchema }, addVetHandler);
  done();
};
