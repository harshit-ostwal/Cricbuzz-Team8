class UserDto {
  constructor(user) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.profleImage = user.profileImage
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

export { UserDto };