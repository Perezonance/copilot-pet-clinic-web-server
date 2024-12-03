import fastify from "fastify";
import type {
  FastifyInstance,
  FastifyListenOptions,
  FastifyServerOptions,
} from "fastify";
import routes from "./routes";
import config from "./util/config";

//Fastify Server Configuration
const fastifyServerConfig: FastifyServerOptions = {
  logger: true,
};

//Create a new Fastify server instance
const server: FastifyInstance = fastify(fastifyServerConfig);

//Register Routes
routes.forEach((route) => server.register(route));
const serverPort: number = config.nodeServerPort();
console.log(serverPort);

//Server Listening Configuration
const fastifyListenOptions: FastifyListenOptions = {
  port: serverPort,
  host: "0.0.0.0", //This is the same as http://localhost:3000
};

server
  .listen(fastifyListenOptions)
  .then(() => {
    //Log out that the server is started
    // console.log(`Server is accepting traffic on port ${serverPort}`);
  })
  .catch((err) => {
    //Log out any errors that occurred when starting the server
    console.error(err);
    process.exit(1);
  });

function shutdown() {
  server
    .close()
    .then(() => {
      console.log("Server is shutting down...");
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
