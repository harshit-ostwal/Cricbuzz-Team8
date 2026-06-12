import { MAIL_PROVIDER } from "../../config/env.config.js";
import ApiError from "../../core/http/api.error.js";
import SmtpProvider from "./providers/smtp/smtp.provider.js";

const providers = {
  smtp: SmtpProvider,
};

const mailProvider = providers[MAIL_PROVIDER];

if (!mailProvider) {
  throw ApiError.internalServerError(
    `Unsupported mail provider: ${MAIL_PROVIDER}`
  );
}

export default mailProvider;
