import _fastify from "fastify";
import * as AppointmentsDB from "../../repositories";
import route from "../../routes/appointments";
import { database as mockDB } from "../../repositories/mockDatabase";
import { Appointment } from "../../models/appointments";

jest.mock("../../repositories", () => ({
  getAllAppointments: jest.fn(),
  getAllAppointmentsByStatus: jest.fn(),
  getAppointmentById: jest.fn(),
  createAppointment: jest.fn(),
  updateAppointment: jest.fn(),
  updateAppointmentStatus: jest.fn(),
}));

const fastify = _fastify({
  logger: {
    level: "silent",
  },
});
fastify.register(route);

describe("Appointments Handlers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    fastify.close();
  });

  describe("getAppointmentsHandler()", () => {
    describe("golden path cases", () => {
      it("should make a call to repo.getAllAppointments() when no query param provided", async () => {
        (AppointmentsDB.getAllAppointments as jest.Mock).mockResolvedValueOnce([
          mockDB[40001],
        ]);

        const { statusCode } = await fastify.inject({
          method: "GET",
          url: "/appointments",
        });

        // Assert
        expect(statusCode).toBe(200);
        expect(AppointmentsDB.getAllAppointments).toHaveBeenCalledTimes(1);
      });

      it("should make a call to repo.getAllAppointmentsByStatus() when status query param provided", async () => {
        (
          AppointmentsDB.getAllAppointmentsByStatus as jest.Mock
        ).mockResolvedValueOnce([mockDB[40002]]);

        const { statusCode } = await fastify.inject({
          method: "GET",
          url: "/appointments?status=APPROVED",
        });

        // Assert
        expect(statusCode).toBe(200);
        expect(AppointmentsDB.getAllAppointmentsByStatus).toHaveBeenCalledTimes(
          1
        );
      });
    });

    describe("error cases", () => {
      it("given a request with an invalid status query param, return 400 and never make a call to the db", async () => {
        const { statusCode } = await fastify.inject({
          method: "GET",
          url: "/appointments?status=INVALID",
        });

        // Assert
        expect(statusCode).toBe(400);
        expect(AppointmentsDB.getAllAppointments).toHaveBeenCalledTimes(0);
      });

      it("given a request with a status query param that returns no results, return 404", async () => {
        (
          AppointmentsDB.getAllAppointmentsByStatus as jest.Mock
        ).mockImplementationOnce(() => [] as Appointment[]);

        const { statusCode } = await fastify.inject({
          method: "GET",
          url: "/appointments?status=APPROVED",
        });

        // Assert
        expect(statusCode).toBe(404);
        expect(AppointmentsDB.getAllAppointmentsByStatus).toHaveBeenCalledTimes(
          1
        );
      });

      it("given a request that results in the DB call failing and returning undefined, return 500", async () => {
        (
          AppointmentsDB.getAllAppointmentsByStatus as jest.Mock
        ).mockImplementationOnce(() => {
          throw new Error("DB Failure");
        });

        const { statusCode } = await fastify.inject({
          method: "GET",
          url: "/appointments?status=APPROVED",
        });

        // Assert
        expect(statusCode).toBe(500);
        expect(AppointmentsDB.getAllAppointmentsByStatus).toHaveBeenCalledTimes(
          1
        );
      });
    });
  });

  describe("getAppointmentByIdHandler()", () => {
    describe("golden path cases", () => {
      it("should return a 200 status code and the appointment when found", async () => {
        const appointmentId = 40001;
        const appointment = mockDB[appointmentId];

        (AppointmentsDB.getAppointmentById as jest.Mock).mockResolvedValueOnce(
          appointment
        );

        const { statusCode, payload } = await fastify.inject({
          method: "GET",
          url: `/appointments/${appointmentId}`,
        });

        // Assert
        expect(statusCode).toBe(200);
        expect(JSON.parse(payload)).toEqual(appointment);
      });
    });

    describe("error cases", () => {
      it("should return a 404 status code when the appointment is not found", async () => {
        const appointmentId = 99999;

        (AppointmentsDB.getAppointmentById as jest.Mock).mockResolvedValueOnce(
          undefined
        );

        const { statusCode } = await fastify.inject({
          method: "GET",
          url: `/appointments/${appointmentId}`,
        });

        // Assert
        expect(statusCode).toBe(404);
        expect(AppointmentsDB.getAppointmentById).toHaveBeenCalledTimes(1);
      });

      it("should return a 500 status code when the DB call fails", async () => {
        const appointmentId = 40001;

        (AppointmentsDB.getAppointmentById as jest.Mock).mockImplementationOnce(
          () => {
            throw new Error("DB Failure");
          }
        );

        const { statusCode } = await fastify.inject({
          method: "GET",
          url: `/appointments/${appointmentId}`,
        });

        // Assert
        expect(statusCode).toBe(500);
        expect(AppointmentsDB.getAppointmentById).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("createAppointmentHandler()", () => {
    describe("golden path cases", () => {
      it("should return a 201 status code and the created appointment", async () => {
        const newAppointment = {
          petId: 50001,
          vetId: 30001,
          ownerId: 20001,
          date: "2021-12-01T12:00:00.000Z",
          reason: "Annual checkup",
        };

        const createdAppointment = {
          id: 50002,
          status: "PENDING",
          ...newAppointment,
        };

        (AppointmentsDB.createAppointment as jest.Mock).mockResolvedValueOnce(
          createdAppointment
        );

        const { statusCode, payload } = await fastify.inject({
          method: "POST",
          url: "/appointments",
          payload: newAppointment,
        });

        // Assert
        expect(statusCode).toBe(201);
        expect(JSON.parse(payload)).toEqual(createdAppointment);
      });
    });

    describe("error cases", () => {
      it("should return a 500 status code when the DB call fails", async () => {
        const newAppointment = {
          petId: 50001,
          vetId: 30001,
          ownerId: 20001,
          date: "2021-12-01T12:00:00.000Z",
          reason: "Annual checkup",
        };

        (AppointmentsDB.createAppointment as jest.Mock).mockImplementationOnce(
          () => {
            throw new Error("DB Failure");
          }
        );

        const { statusCode } = await fastify.inject({
          method: "POST",
          url: "/appointments",
          payload: newAppointment,
        });

        // Assert
        expect(statusCode).toBe(500);
        expect(AppointmentsDB.createAppointment).toHaveBeenCalledTimes(1);
      });
    });
  });
});
