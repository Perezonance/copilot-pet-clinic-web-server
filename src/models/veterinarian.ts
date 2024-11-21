export type Veterinarian = {
  id: number;
  firstName: string;
  lastName: string;
  specialty: string;
  // specialties?: Specialty[];
};

export type Specialty = {
  id: number;
  name: string;
};
