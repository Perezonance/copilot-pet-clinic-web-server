import { Veterinarian } from "../../models";
import { getVets } from "../../store";

export default async function getAllVets(): Promise<Veterinarian[]> {
  console.log("Getting all vets");
  return getVets();
}
