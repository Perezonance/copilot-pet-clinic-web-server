// Handles pet endpoints
import { FastifyReply, FastifyRequest } from "fastify";
import { Pet } from "../models/pet";

//An array of all pets in the system
const allPets: Pet[] = [
  {
    petId: 1,
    name: "Rex",
    species: "dog",
    age: 4,
    breed: "Golden Retriever",
    weight: 65,
  },
  {
    petId: 2,
    name: "Whiskers",
    species: "cat",
    age: 2,
    breed: "Siamese",
    weight: 10,
  },
  {
    petId: 3,
    name: "Spike",
    species: "dog",
    age: 10,
    breed: "Bulldog",
    weight: 45,
  },
];

const getAllPets = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(200).send(allPets);
};

const addNewPet = async (request: FastifyRequest, reply: FastifyReply) => {
  const newestPet: Pet = request.body as Pet;
  allPets.push(newestPet);
  reply.status(201).send(newestPet);
};

// Fastify request in shape of object with querystring updatePetQueryParam
interface updatePetQueryParam {
  petId: number;
}
const updatePet = async (
  request: FastifyRequest<{ Querystring: updatePetQueryParam }>,
  reply: FastifyReply
) => {
  const { petId } = request.query;
  const petIndex = allPets.findIndex((pet) => {
    const isPet = pet.petId == petId;
    return isPet;
  });
  if (petIndex === -1) {
    reply.status(404).send();
  }
  const updatedPetData = request.body as Pet;
  allPets[petIndex] = { ...allPets[petIndex], ...updatedPetData };
  reply.status(204).send(allPets[petIndex]);
};

// Export handlers
export { getAllPets, addNewPet, updatePet, allPets };
