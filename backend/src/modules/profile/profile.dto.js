class ProfileDto {
  constructor(data) {
    this.fullName = {
      firstName: data.fullName.firstName,
      lastName: data.fullName.lastName,
    };
    this.avatar = data.avatar;
  }
}

export { ProfileDto };
