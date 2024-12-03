import { FastifySchema } from "fastify";
import {
  getAppointmentsHandler,
  createAppointmentHandler,
  getAppointmentByIdHandler,
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
  required: ["petId", "vetId", "ownerId", "date", "reason"],
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

  //ex: GET http://localhost:3000/appointments/40001
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
  done();
};
