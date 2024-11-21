import { FastifyRequest, FastifySchema } from "fastify";
import { getAllVets } from "../../controllers/vets/index.js";

const schema: FastifySchema = {
  headers: {},
};

const handler = async (request: FastifyRequest<{}>, reply: any) => {
  const vets = await getAllVets();
  reply.send(vets);
};

export default (fastify: any, opts: any, done: any) => {
  fastify.get("/vets", { schema }, handler);
  done();
};
