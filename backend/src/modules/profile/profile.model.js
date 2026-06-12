import mongoose, { Schema } from "mongoose";

const profileSchema = new Schema({
  _id: {
    type: String,
    ref: "User",
    required: "User ID is required",
  },
  fullName: {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    required: "Full Name is required",
  },
  avatar: {
    type: String,
    trim: true,
  },
  avatarPublicId: {
    type: String,
    trim: true,
  },
});

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
