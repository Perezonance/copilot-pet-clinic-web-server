import { FastifyRequest, FastifySchema } from "fastify";
import { getAllPets } from "../../controllers/pets/index.js";

const schema: FastifySchema = {
  headers: {},
};

const handler = async (request: FastifyRequest<{}>, reply: any) => {
  const pets = await getAllPets();
  reply.send(pets);
};

export default (fastify: any, opts: any, done: any) => {
  fastify.get("/pets", { schema }, handler);
  done();
};
