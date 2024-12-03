// This file

import { FastifySchema } from "fastify";
import { getAllPets, addNewPet, updatePet } from "../../handlers/pet-info";

const petFormBodySchema = {
  type: "object",
  required: ["name", "species", "age", "breed", "weight"],
  properties: {
    // petId: { type: "number" }, removed petId from Schema because was expected in body instead of Querystring
    name: { type: "string" },
    species: { type: "string" },
    age: { type: "number" },
    breed: { type: "string" },
    weight: { type: "number" },
    address: { type: "string" },
  },
};

const createNewPetSchema: FastifySchema = {
  body: petFormBodySchema,
};

const updatePetSchema: FastifySchema = {
  body: petFormBodySchema,
};

const getPetSchema: FastifySchema = {
  querystring: {
    type: "object",
    properties: {
      petId: { type: "number" },
    },
  },
};

export default (fastify: any) => {
  //ex: GET http://localhost:3000/pets
  fastify.get("/pets", { schema: getPetSchema }, getAllPets);

  //ex: POST http://localhost:3000/pets
  fastify.post("/pets", { schema: createNewPetSchema }, addNewPet);

  //ex: PUT http://localhost:3000/pets/10005
  fastify.put("/pets", { schema: updatePetSchema }, updatePet);
};
