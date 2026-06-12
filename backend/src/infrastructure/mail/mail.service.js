import mailProvider from "./mail.provider.js";

class MailService {
  async verifyConnection() {
    return await mailProvider.verifyConnection();
  }

  async sendMail(payload) {
    return await mailProvider.sendMail(payload);
  }
}

export default new MailService();
