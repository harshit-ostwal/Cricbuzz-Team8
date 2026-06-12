import Profile from "./profile.model.js";
import ProfileSelect from "./profile.select.js";

class ProfileRepository {
  async findByUserId(userId) {
    return await Profile.findOne({
      user: userId,
    }).select(ProfileSelect);
  }

  async create(userId, data) {
    return await Profile.create({
      user: userId,
      ...data,
    });
  }

  async updateByUserId(userId, data) {
    return await Profile.findOneAndUpdate(
      {
        user: userId,
      },
      data,
      {
        new: true,
      },
    ).select(ProfileSelect);
  }
}

export { ProfileRepository };
