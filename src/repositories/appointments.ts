import {
  Appointment,
  AppointmentForm,
  AppointmentStatus,
} from "../models/appointments";
import { database } from "./mockDatabase";

let nextId = 40100;

/**
 * Retrieves an appointment by its ID.
 *
 * @param appointmentId - The unique identifier of the appointment.
 * @returns A promise that resolves to the appointment object if found, otherwise undefined.
 */
export async function getAppointmentById(
  appointmentId: number
): Promise<Appointment | undefined> {
  return database[appointmentId];
}

/**
 * Retrieves all appointments from the repository.
 *
 * @returns {Promise<Appointment[]>} A promise that resolves to an array of Appointment objects.
 */
export async function getAllAppointments(): Promise<Appointment[]> {
  return Object.values(database);
}

/**
 * Retrieves all appointments with a specific status from the repository.
 *
 * @param status - The status of the appointments to retrieve.
 * @returns {Promise<Appointment[]>} A promise that resolves to an array of Appointment objects.
 */
export async function getAllAppointmentsByStatus(
  status: AppointmentStatus
): Promise<Appointment[]> {
  return Object.values(database).filter(
    (appointment) => appointment.status === status
  );
}

/**
 * Creates a new appointment with the given appointment form data.
 *
 * @param appointment - The form data for the new appointment.
 * @returns A promise that resolves to the newly created appointment.
 */
export async function createAppointment(
  appointment: AppointmentForm
): Promise<Appointment> {
  const timestamp = new Date().toISOString();

  //Create new appointment object
  const newAppointment: Appointment = {
    id: nextId++,
    status: AppointmentStatus.PENDING,
    createdAt: timestamp,
    updatedAt: timestamp,
    ...appointment, //Spread operator to copy properties from appointment form
  };

  //Insert into Database
  database[newAppointment.id] = newAppointment;

  return newAppointment;
}

/**
 * Updates an existing appointment with the given appointment form data.
 *
 * @param appointmentId - The unique identifier of the appointment.
 * @param appointment - The form data for the updated appointment.
 * @returns A promise that resolves to the updated appointment if found, otherwise undefined.
 */
export async function updateAppointment(
  appointmentId: number,
  appointment: AppointmentForm
): Promise<Appointment | undefined> {
  const existingAppointment = database[appointmentId];

  if (!existingAppointment) {
    return undefined;
  }

  const updatedAppointment: Appointment = {
    ...existingAppointment,
    ...appointment,
    updatedAt: new Date().toISOString(),
  };

  database[appointmentId] = updatedAppointment;

  return updatedAppointment;
}

/**
 * Updates the status of an existing appointment.
 *
 * @param appointmentId - The unique identifier of the appointment.
 * @param status - The new status for the appointment.
 * @returns A promise that resolves to the updated appointment if found, otherwise undefined.
 */
export async function updateAppointmentStatus(
  appointmentId: number,
  status: AppointmentStatus
): Promise<Appointment | undefined> {
  const existingAppointment: Appointment = database[appointmentId];

  if (!existingAppointment) {
    return undefined;
  }

  const updatedAppointment: Appointment = {
    ...existingAppointment,
    status,
    updatedAt: new Date().toISOString(),
  };

  database[appointmentId] = updatedAppointment;

  return updatedAppointment;
}
