import User from "./user.model.js";
import userSelect from "./user.select.js";

class UserRepository {
  async findById(id) {
    return await User.findById(id).select(userSelect);
  }

  async findByEmail(email) {
    return await User.findOne({
      email,
    }).select(userSelect);
  }

  async create(data) {
    return await User.create(data);
  }

  async update(id, data) {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
    }).select(userSelect);
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
    ).select(userSelect);
  }

  async delete(id) {
    return await User.findByIdAndDelete(id).select(userSelect);
  }
}

export { UserRepository };
