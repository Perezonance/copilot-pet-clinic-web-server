import { AuditProperties } from "./auditProperties";

/**
 * Represents an appointment with audit properties and form details.
 *
 * @interface Appointment
 * @extends AuditProperties
 * @extends AppointmentForm
 *
 * @property {number} id - The unique identifier for the appointment.
 * @property {AppointmentStatus} status - The current status of the appointment.
 */
export interface Appointment extends AuditProperties, AppointmentForm {
  id: number;
  status: AppointmentStatus;
}

/**
 * Represents the form data required to create or update an appointment.
 */
export interface AppointmentForm {
  petId: number;
  vetId: number;
  ownerId: number;
  date: string;
  reason: string;
  notes?: string;
}

/**
 * Enum representing the status of an appointment.
 *
 * @enum {string}
 * @property {string} PENDING - The appointment is pending vet approval.
 * @property {string} APPROVED - The appointment has been approved.
 * @property {string} CANCELLED - The appointment has been cancelled.
 * @property {string} COMPLETED - The appointment has been completed.
 */
export enum AppointmentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}
