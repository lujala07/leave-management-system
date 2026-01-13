import { Request, Response } from "express";
import User from "../models/User";

//create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { userId, email, password, name, role, department, employmentType } =
      req.body;

    if (
      !userId ||
      !name ||
      !email ||
      !password ||
      !role ||
      !employmentType ||
      !department 
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      userId,
      email,
      password,
      name,
      role: role || "EMPLOYEE", //if no role is selected on default gives employee
      department,
      employmentType: employmentType || "FULL_TIME",
      status: "ACTIVE",
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create users",
      error,
    });
  }
};

//get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ status: "ACTIVE" }).select("-password");

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch users",
      error,
    });
  }
};

//get user by id
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User fetched",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//update user 
export const updateUser= async(req: Request, res: Response)=>{
  try{
    const {id}= req.params;
    
    const user= await User.findById(id);
    if(!user){
      res.status(404).json({
        message:"User not found" 
      });
      return;
    }
    
    const {name, email, department, role, employmentType, status}=req.body;
    
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    const updateData: any= {};

    if (name){
      updateData.name=name;
    }
    if (email){
      updateData.email=email;
    }
    if (department){
      updateData.department= department;
    }
    if(role){
      updateData.role= role;
    }
    if(employmentType){
      updateData.employmentType= employmentType;
    }
    if(status){
      updateData.status= status;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
    
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update user",
      error,
    });
  }
};

//delete user
export const deleteUser= async(req: Request, res: Response) =>{
  try{
    const{id}= req.params;
    const user= await User.findById(id).select("-password");
    if(!user){
      res.status(404).json({
        message:"user not found"
      });
    }
    const deletedUser= await User.findByIdAndUpdate(
      id,
      {status:"DELETED"},
      {new: true},
    ).select("-password");

    return res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete user",
      error,
    });
  }
};