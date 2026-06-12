import userModel from "../models/user.model.js";

export default class UserRepository {
  async create(data) {
    return await userModel.create(data);
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
}
