import { FastifySchema } from "fastify";
import {
  getAppointmentsHandler,
  createAppointmentHandler,
  getAppointmentByIdHandler,
  updateAppointmentHandler, // Import the update handler
} from "../../handlers/appointments";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

const appointmentPathParamSchema = {
  type: "object",
  properties: {
    appointmentId: { type: "number" },
  },
  required: ["appointmentId"],
};

const appointmentFormBodySchema = {
  type: "object",
  properties: {
    petId: { type: "number" },
    vetId: { type: "number" },
    ownerId: { type: "number" },
    date: { type: "string" },
    reason: { type: "string" },
    notes: { type: "string" },
  },
  required: [],
};

const getAppointmentsSchema: FastifySchema = {
  querystring: {
    type: "object",
    properties: {
      status: { type: "string" },
    },
  },
};

const getAppointmentByIdSchema: FastifySchema = {
  params: appointmentPathParamSchema,
};

const createAppointmentSchema: FastifySchema = {
  body: appointmentFormBodySchema,
};

/**
 * Schema for updating an appointment.
 *
 * This schema validates the parameters and body of the request
 * to ensure they conform to the expected structure.
 *
 * - `params`: Validates the path parameters using `appointmentPathParamSchema`.
 * - `body`: Validates the request body using `appointmentFormBodySchema`.
 */
const updateAppointmentSchema: FastifySchema = {
  params: appointmentPathParamSchema,
  body: appointmentFormBodySchema,
};

export default (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: () => void
) => {
  //ex: GET http://localhost:3000/appointments
  //ex: GET http://localhost:3000/appointments?status=PENDING
  fastify.get(
    "/appointments",
    { schema: getAppointmentsSchema },
    getAppointmentsHandler
  );

  //ex: GET http://localhost:3000/appointments/:appointmentId
  fastify.get(
    "/appointments/:appointmentId",
    { schema: getAppointmentByIdSchema },
    getAppointmentByIdHandler
  );

  //ex: POST http://localhost:3000/appointments
  fastify.post(
    "/appointments",
    { schema: createAppointmentSchema },
    createAppointmentHandler
  );

  //ex: PUT http://localhost:3000/appointments/:appointmentId
  fastify.put(
    "/appointments/:appointmentId",
    { schema: updateAppointmentSchema }, // Add schema for update
    updateAppointmentHandler
  );

  done();
};
