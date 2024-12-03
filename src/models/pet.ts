// All Pet models
/**
 * Represents a pet with various attributes.
 *
 * @typedef {Object} Pet
 * @property {number} petId - The unique identifier for the pet.
 * @property {string} name - The name of the pet.
 * @property {string} species - The species of the pet (e.g., dog, cat).
 * @property {number} age - The age of the pet in years.
 * @property {string} breed - The breed of the pet.
 * @property {number} weight - The weight of the pet in kilograms.
 */
export type Pet = {
    petId: number;
    name: string;
    species: string;
    age: number;
    breed: string;
    weight: number;
    address?: string;
  };

