import User from "./user.model.js";
import { UserSelect } from "./user.select.js";

class UserRepository {
  async findById(id) {
    return await User.findById(id).select(UserSelect);
  }

  async findByEmail(email) {
    return await User.findOne({
      email,
    }).select(UserSelect);
  }

  async create(data) {
    return await User.create(data);
  }

  async update(id, data) {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async softDelete(id) {
    return await User.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
      },
    );
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

export { UserRepository };
