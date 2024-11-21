import { Owner } from "../../models";
import { getOwners } from "../../store";

export default async function getAllOwners(): Promise<Owner[]> {
  console.log("Getting all owners");
  return getOwners();
}
