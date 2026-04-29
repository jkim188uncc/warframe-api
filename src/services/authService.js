import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepo from "../repositories/userRepository.js";

const signup = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepo.createUser({
      username,
      email,
      password_hash: hashedPassword,
      role: "USER"
    });

    return user;
  } catch (err) {
    if (err.code === 'P2002') { // Prisma unique constraint violation
      throw { type: "CONFLICT", message: "User already exists" };
    }
    throw err;
  }
};

const login = async (email, password) => {
  const user = await userRepo.findUserByEmail(email);

  if (!user) throw { type: "UNAUTHORIZED", message: "Invalid credentials" };

  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) throw { type: "UNAUTHORIZED", message: "Invalid credentials" };

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

export default {
  signup,
  login
};