import { FastifyRequest, FastifySchema } from "fastify";
import { getAllOwners } from "../../controllers/owners/index.js";

const schema: FastifySchema = {
  headers: {},
};

const handler = async (request: FastifyRequest<{}>, reply: any) => {
  const vets = await getAllOwners();
  reply.send(vets);
};

export default (fastify: any, opts: any, done: any) => {
  fastify.get("/owners", { schema }, handler);
  done();
};
