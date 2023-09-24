import bcrypt from "bcryptjs";

const saltRound = 10;

export const hashPassword = (planpassword) => {
  return bcrypt.hashSync(planpassword, saltRound);
};

export const compressPassword = (planpassword, hashPasswordFromDb) => {
  return bcrypt.compareSync(planpassword, hashPasswordFromDb);
};
