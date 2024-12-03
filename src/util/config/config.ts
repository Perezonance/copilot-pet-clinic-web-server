export default {
  nodeServerPort: () => Number(process.env.NODE_SERVER_PORT ?? 3000),
  databaseConnectionString: process.env.DATABASE_CONNECTION_URL ?? "",
};
