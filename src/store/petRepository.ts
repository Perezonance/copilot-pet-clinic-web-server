import { Pet } from "../models/pet";

const PetRepository: Record<number, Pet> = {
  10001: {
    id: 10001,
    name: "Max",
    age: 5,
    type: "Dog",
    breed: "Golden Retriever",
    weight: 65,
    ownerId: 20001,
  },
  10002: {
    id: 10002,
    name: "Bella",
    age: 3,
    type: "Cat",
    breed: "Siamese",
    weight: 8,
    ownerId: 20002,
  },
  10003: {
    id: 10003,
    name: "Charlie",
    age: 2,
    type: "Dog",
    breed: "Poodle",
    weight: 10,
    ownerId: 20003,
  },
  10004: {
    id: 10004,
    name: "Lucy",
    age: 7,
    type: "Dog",
    breed: "Bulldog",
    weight: 55,
    ownerId: 20004,
  },
  10005: {
    id: 10005,
    name: "Luna",
    age: 1,
    type: "Cat",
    breed: "Persian",
    weight: 6,
    ownerId: 20002,
  },
};

/**
 * Retrieves all pets from the PetRepository.
 *
 * @returns {Pet[]} An array of all pets.
 */
export function getPets(): Pet[] {
  return Object.values(PetRepository);
}
