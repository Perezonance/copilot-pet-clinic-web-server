import { Owner } from "../models";

const OwnerRepository: Record<number, Owner> = {
  20001: {
    id: 20001,
    name: "John Doe",
    address: "123 Main St",
    phone: "555-1234",
  },
  20002: {
    id: 20002,
    name: "Jane Smith",
    address: "456 Elm St",
    phone: "555-5678",
  },
  20003: {
    id: 20003,
    name: "Alice Johnson",
    address: "789 Maple St",
    phone: "555-9012",
  },
  20004: {
    id: 20004,
    name: "Bob Brown",
    address: "321 Oak St",
    phone: "555-3456",
  },
};

/**
 * Retrieves all owners from the OwnerRepository.
 *
 * @returns {Owner[]} An array of all owners.
 */
export function getOwners(): Owner[] {
  return Object.values(OwnerRepository);
}
