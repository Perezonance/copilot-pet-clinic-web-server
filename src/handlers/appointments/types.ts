export interface AppointmentIdPathParam {
  appointmentId: number;
}

export interface UpdateStatusRequestBody {
  status: string;
}

export enum Headers {
  AuthId = "authid",
}

export type UpdateStatusRequestHeaders = Record<Headers, string>;

export interface GetAppointmentsQueryParams {
  status?: string;
}
