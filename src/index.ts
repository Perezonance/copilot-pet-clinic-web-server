import fastify, { FastifyListenOptions } from "fastify";
import fastifySensible from "@fastify/sensible";
import routes from "./routes/index.js";
import fastifyCors from "@fastify/cors";

const server = fastify();

server.register(fastifySensible);
server.register(fastifyCors, {
  origin: "*",
});

routes.forEach((route) => {
  server.register(route);
});

server.get("/health", async (request, reply) => {
  return {
    systemTime: new Date().toLocaleString(),
  };
});

const serverPort: number = 8080;

const fastifyServerOptions: FastifyListenOptions = {
  port: serverPort,
  host: "0.0.0.0",
};

server
  .listen(fastifyServerOptions)
  .then(() => {
    console.log(`Server listening on port: ${serverPort}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

function shutdown() {
  server.close().then(() => {
    console.log("Server shutdown");
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
