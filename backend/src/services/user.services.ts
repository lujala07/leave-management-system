import { userRepository } from "../repositories/user.repository";
import { IUser } from "../models/User";
import { userRole } from "../enums/userRole.enum";
import { userStatus } from "../enums/userStatus.enum";

const generateUserId = () => `UID-${Date.now()}`;

// create user
export const createUserService = async (data: Partial<IUser>) => {
  const requiredFields = [
    "name",
    "email",
    "password",
    "role",
    "department",
    "employmentType",
  ];
  requiredFields.forEach((field) => {
    if (!data[field as keyof IUser]) {
      throw new Error(`Missing ${field}`);
    }
  });

  const existingUser = await userRepository.findByEmail(data.email!);
  if (existingUser) {
    throw new Error("Email already exists");
  }

  data.userId = generateUserId();
  data.role = data.role || userRole.EMPLOYEE;
  data.status = data.status || userStatus.ACTIVE;

  return userRepository.createUser(data);
};

// get all users
export const getAllUsersService = async () => {
  return userRepository.findAllActive();
};

// get user by ID
export const getByUserIdService = async (userId: string) => {
  const user = await userRepository.findById(userId);
  if (!user) throw new Error("User not found");
  return user;
};

// update user
export const updateUserService = async (userId: string, data: Partial<IUser>) => {
  const existingData = await userRepository.findById(userId);
  if (!existingData) throw new Error("User not found");

  if (data["email"]) {
    const existingEmail = await userRepository.findByEmail(data["email"]);
    if (existingEmail?.id !== userId) throw new Error("Email already exists");
  }

  const updatedData: Partial<IUser> = {};
  updatedData["name"] = data["name"] ?? existingData.name;
  updatedData["email"] = data["email"] ?? existingData.email;
  updatedData["department"] = data["department"] ?? existingData.department;
  updatedData["role"] = data["role"] ?? existingData.role;
  updatedData["employmentType"] = data["employmentType"] ?? existingData.employmentType;
  updatedData["status"] = data["status"] ?? existingData.status;

  return userRepository.updateByUserId(userId, updatedData);
};

// delete user
export const deleteUserService = async (userId: string) => {
  const deletedUser = await userRepository.deleteByUserId(userId);
  if (!deletedUser) throw new Error("User not found");
  return deletedUser;
};
