import User from "./user.model.js";
import UserSelect from "./user.select.js";

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
    return await User.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).select(UserSelect);
  }

  async softDelete(id) {
    return await User.findByIdAndUpdate(
      id,
      {
        $set: {
          isDeleted: true,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).select(UserSelect);
  }

  async delete(id) {
    return await User.findByIdAndDelete(id).select(UserSelect);
  }
}

export { UserRepository };
