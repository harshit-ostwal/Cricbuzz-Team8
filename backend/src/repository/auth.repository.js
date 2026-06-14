import userModel from "../models/user.model.js";

 class UserRepository {
  async create(data) {
    return await userModel.create(data);
  }

  async findUserByProvider(provider, providerId) {
    return await userModel.findOne({
      provider,
      providerId,
      isDeleted: false,
    });
  }

  async findByGoogleId(googleId) {
    return await userModel.findOne({ googleId });
  }
  async findByEmail(email) {
    return await userModel.findOne({ email, isDeleted: false });
  }

  async findById(userId) {
    return await userModel.findById(userId);
  }

  async updateById(id, data) {
    return await userModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
}


export const  userRepo = new UserRepository()