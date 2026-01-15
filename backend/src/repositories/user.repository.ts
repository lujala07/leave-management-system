import User, { IUser } from "../models/User";

export const userRepository = {
  createUser: async (data: Partial<IUser>) => {
    return User.create(data);
  },

  findAllActive: async()=>{
    return User.find({status:"ACTIVE"}).select("-password");
  },

  findByEmail: async (email: string) => {
    return User.findOne({ email });
  },

  findById: async (userId: string) => {
    return User.findOne({ userId });
  },

  updateByUserId: async (userId: string, data: Partial<IUser>) => {
    return User.findOneAndUpdate({ userId }, data, { new: true }).select("-password");
  },

  deleteByUserId: async(userId: string)=>{
    return User.findOneAndUpdate({userId},{status:"DELETED"},{new:true}).select("-password");
  }
};
