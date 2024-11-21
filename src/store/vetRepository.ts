import { Veterinarian } from "../models/veterinarian";

const VetRepository: Record<number, Veterinarian> = {
  50001: {
    id: 50001,
    firstName: "James",
    lastName: "Carter",
    specialty: "felines",
  },
  50002: {
    id: 50002,
    firstName: "Helen",
    lastName: "Leary",
    specialty: "canines",
  },
};

/**
 * Retrieves all veterinarians from the VetRepository.
 *
 * @returns {Veterinarian[]} An array of all veterinarians.
 */
export function getVets(): Veterinarian[] {
  return Object.values(VetRepository);
}

/**
 * Retrieves a veterinarian by their ID.
 *
 * @param id - The unique identifier of the veterinarian.
 * @returns The veterinarian object if found, otherwise `undefined`.
 */
export function getVetById(id: number): Veterinarian | undefined {
  return VetRepository[id];
}

/**
 * Adds a veterinarian to the VetRepository.
 *
 * @param vet - The veterinarian to add.
 * @returns The added veterinarian.
 */
export function addVet(vet: Veterinarian): Veterinarian {
  VetRepository[vet.id] = vet;
  return vet;
}

/**
 * Updates the information of an existing veterinarian in the VetRepository.
 *
 * @param vet - The veterinarian object containing updated information.
 * @returns The updated veterinarian object if the update was successful, or `undefined` if the veterinarian does not exist in the repository.
 */
export function updateVet(vet: Veterinarian): Veterinarian | undefined {
  if (VetRepository[vet.id]) {
    VetRepository[vet.id] = vet;
    return vet;
  }
  return undefined;
}
