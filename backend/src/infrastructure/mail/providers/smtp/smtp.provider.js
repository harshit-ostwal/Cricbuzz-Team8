import nodemailer from "nodemailer";

import {
  NODE_ENV,
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
} from "../../../../config/env.config.js";

import ApiError from "../../../../core/http/api.error.js";
import { APP_NAME } from "../../../../shared/constants/app.constants.js";
import loggerService from "../../../logger/logger.service.js";

import {
  CONNECTION_TIMEOUT,
  GREETING_TIMEOUT,
  MAX_CONNECTIONS,
  MAX_MESSAGES_PER_CONNECTION,
  SOCKET_TIMEOUT,
} from "./smtp.constants.js";

class SmtpProvider {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE,

      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },

      requireTLS: true,

      tls: {
        rejectUnauthorized: NODE_ENV === "production",
      },

      connectionTimeout: CONNECTION_TIMEOUT,
      greetingTimeout: GREETING_TIMEOUT,
      socketTimeout: SOCKET_TIMEOUT,

      pool: true,
      maxConnections: MAX_CONNECTIONS,
      maxMessages: MAX_MESSAGES_PER_CONNECTION,
    });
  }

  async verifyConnection() {
    loggerService.info("Verifying SMTP connection...");

    try {
      await this.transporter.verify();

      loggerService.info("SMTP connection verified successfully.");

      return true;
    } catch (error) {
      loggerService.error("SMTP connection verification failed", { error });

      throw ApiError.serviceUnavailable("SMTP service unavailable", [error]);
    }
  }

  async sendMail({
    to,
    cc,
    bcc,
    subject,
    text,
    html,
    attachments = [],
    priority = "normal",
    ...options
  }) {
    try {
      const info = await this.transporter.sendMail({
        from: {
          name: APP_NAME,
          address: SMTP_USER,
        },

        to,
        cc,
        bcc,

        subject,
        text,
        html,

        attachments,
        priority,

        ...options,
      });

      loggerService.info("Email sent successfully", {
        to,
        subject,
        messageId: info.messageId,
      });

      return info;
    } catch (error) {
      loggerService.error("Failed to send email", {
        to,
        subject,
        error,
      });

      throw ApiError.serviceUnavailable("Failed to send email", [error]);
    }
  }
}

export default new SmtpProvider();
