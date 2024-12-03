import { FastifySchema } from "fastify";
import {
  getAppointmentsHandler,
  createAppointmentHandler,
  updateAppointmentHandler,
  getAppointmentByIdHandler,
  updateAppointmentStatusHandler,
} from "../../handlers/appointments";
import { Headers } from "../../handlers/appointments/types";
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

const updateAppointmentSchema: FastifySchema = {
  body: appointmentFormBodySchema,
  params: appointmentPathParamSchema,
};

const patchAppointmentStatusSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      status: { type: "string" },
    },
    required: ["status"],
  },
  headers: {
    type: "object",
    properties: {
      [Headers.AuthId]: { type: "string" },
    },
    required: [Headers.AuthId],
  },
  params: appointmentPathParamSchema,
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

  //ex: PUT http://localhost:3000/appointments/40001
  fastify.put(
    "/appointments/:appointmentId",
    { schema: updateAppointmentSchema },
    updateAppointmentHandler
  );

  //ex: PATCH http://localhost:3000/appointments/40001/status
  fastify.patch(
    "/appointments/:appointmentId/status",
    { schema: patchAppointmentStatusSchema },
    updateAppointmentStatusHandler
  );
  done();
};
