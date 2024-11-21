import { addVet as addVetToRepository } from "../../store/vetRepository";
import { Veterinarian } from "../../models/veterinarian";

/**
 * Adds a new veterinarian to the repository.
 *
 * @param vet - The veterinarian object to be added.
 * @returns A promise that resolves to the added veterinarian object.
 */
export default async function addVet(vet: Veterinarian): Promise<Veterinarian> {
  console.log("Adding vet");
  return addVetToRepository(vet);
}
