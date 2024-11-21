import { Pet } from "../../models";
import { getPets } from "../../store";

export default async function getAllVets(): Promise<Pet[]> {
  console.log("Getting all vets");
  return getPets();
}
