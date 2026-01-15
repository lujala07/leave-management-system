import { Request, Response } from "express";
import {
  createUserService,
  getAllUsersService,
  getByUserIdService,
  updateUserService,
  deleteUserService,
} from "../services/user.services";

import { successResponse, errorResponse } from "../utils/apiResponse";

// create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);
    return res.status(201).json(successResponse("User created successfully", user));
  } catch (error: any) {
    return res.status(400).json(errorResponse(error.message, error));
  }
};

// get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    return res.status(200).json(successResponse("Users fetched successfully", users));
  } catch (error: any) {
    return res.status(500).json(errorResponse(error.message, error));
  }
};

// get user by userId
export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await getByUserIdService(userId);
    return res.status(200).json(successResponse("User fetched successfully", user));
  } catch (error: any) {
    return res.status(404).json(errorResponse(error.message, error));
  }
};

// update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUser = await updateUserService(userId, req.body);
    return res.status(200).json(successResponse("User updated successfully", updatedUser));
  } catch (error: any) {
    return res.status(400).json(errorResponse(error.message, error));
  }
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deletedUser = await deleteUserService(userId);
    return res.status(200).json(successResponse("User deleted successfully", deletedUser));
  } catch (error: any) {
    return res.status(400).json(errorResponse(error.message, error));
  }
};
