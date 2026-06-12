import Profile from "./profile.model.js";
import ProfileSelect from "./profile.select.js";

class ProfileRepository {
  async findByUserId(userId) {
    return await Profile.findById(userId).select(ProfileSelect);
  }

  async create(userId, data) {
    return await Profile.create({
      _id: userId,
      ...data,
    });
  }

  async updateByUserId(userId, data) {
    return Profile.findByIdAndUpdate(
      userId,
      {
        $set: data,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    ).select(ProfileSelect);
  }
}

export { ProfileRepository };
