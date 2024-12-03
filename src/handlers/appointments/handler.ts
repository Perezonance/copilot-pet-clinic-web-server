import { FastifyRequest, FastifyReply } from "fastify";
import {
  Appointment,
  AppointmentForm,
  AppointmentStatus,
} from "../../models/appointments";
import { AppointmentIdPathParam, GetAppointmentsQueryParams } from "./types";
import * as AppointmentsDB from "../../repositories";

/**
 * Handler for retrieving appointments.
 *
 * This handler retrieves appointments based on the query parameters provided.
 *
 * @param request - The Fastify request object, which includes the query parameter
 *                  for the appointment ID.
 * @param reply - The Fastify reply object, used to send the response.
 *
 * @returns A promise that resolves to the HTTP response. If an appointment ID is
 *          provided and the appointment is found, it returns the appointment with
 *          a 200 status code. If the appointment is not found, it returns a 404
 *          status code. If no appointment ID is provided, it returns all
 *          appointments with a 200 status code.
 */
export async function getAppointmentsHandler(
  request: FastifyRequest<{ Querystring: GetAppointmentsQueryParams }>,
  reply: FastifyReply
) {
  //Normalize query parameter to uppercase
  const status: string | undefined = request.query.status?.toUpperCase();

  if (status) {
    //Query String Param Input Validation
    if (!validateStatus(status)) {
      return reply.status(400).send("Invalid status");
    }

    let appointments: Appointment[];

    //Make a call to the repository to get appointments filtered by status
    try {
      appointments = await AppointmentsDB.getAllAppointmentsByStatus(
        status as AppointmentStatus
      );
    } catch (error) {
      return reply.status(500).send("Internal Server Error");
    }
    if (appointments && appointments?.length === 0) {
      return reply
        .status(404)
        .send("No appointments found with status: " + status);
    }
    return reply.status(200).send(appointments);
  }

  const appointments: Appointment[] = await AppointmentsDB.getAllAppointments();
  return reply.status(200).send(appointments);
}

/**
 * Handler for retrieving a specific appointment by ID.
 *
 *
 * @param request - The Fastify request object, which includes the appointment ID in the parameters.
 *
 * @param reply - The Fastify reply object, used to send the response.
 *
 * @returns A promise that resolves to the HTTP response. If the appointment is found,
 *          it returns the appointment with a 200 status code. If the appointment is not
 *          found, it returns a 404 status code.
 */
export async function getAppointmentByIdHandler(
  request: FastifyRequest<{ Params: AppointmentIdPathParam }>,
  reply: FastifyReply
) {
  const appointmentId: number = request.params.appointmentId;
  let appointment: Appointment | undefined;

  try {
    appointment = await AppointmentsDB.getAppointmentById(appointmentId);
  } catch (error) {
    return reply.status(500).send("Internal Server Error");
  }

  if (appointment) {
    return reply.status(200).send(appointment);
  } else {
    return reply.status(404).send();
  }
}

/**
 * Handler to create a new appointment.
 *
 * @param request - The Fastify request object containing the appointment data in the body.
 * @param reply - The Fastify reply object used to send the response.
 *
 * @remarks
 * This handler creates a new appointment with the provided data. If the appointment is successfully created, it responds with a 201 status code and the created appointment data.
 * If the appointment creation fails, it responds with a 500 status code.
 */
export async function createAppointmentHandler(
  request: FastifyRequest<{ Body: AppointmentForm }>,
  reply: FastifyReply
) {
  const newAppointment: AppointmentForm = request.body;
  let appointment: Appointment;
  try {
    appointment = await AppointmentsDB.createAppointment(newAppointment);
  } catch (error) {
    return reply.status(500).send("Internal Server Error");
  }

  return reply.status(201).send(appointment);
}

function validateStatus(status: string): boolean {
  return Object.values(AppointmentStatus).includes(status as AppointmentStatus);
}
