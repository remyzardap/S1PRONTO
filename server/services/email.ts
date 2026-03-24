import nodemailer from "nodemailer";
import { generateReviewQueueEmail, type ReviewQueueEmailData } from "../templates/review-queue-email";

interface EmailConfig {
  from: string;
  fromName: string;
  replyTo?: string;
}

const defaultConfig: EmailConfig = {
  from: "notifications@sutaeru.com",
  fromName: "Sutaeru Business",
  replyTo: "support@sutaeru.com",
};

interface EmailProvider {
  send(to: string, subject: string, html: string, text: string, config: EmailConfig): Promise<void>;
}

class ConsoleEmailProvider implements EmailProvider {
  async send(to: string, subject: string, _html: string, text: string, config: EmailConfig): Promise<void> {
    console.log("=== EMAIL SENT ===");
    console.log("To:", to);
    console.log("From:", `${config.fromName} <${config.from}>`);
    console.log("Subject:", subject);
    console.log("Text:", text.substring(0, 500) + "...");
    console.log("==================");
  }
}

class SmtpEmailProvider implements EmailProvider {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: parseInt(process.env.SMTP_PORT || "587", 10) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async send(to: string, subject: string, html: string, text: string, config: EmailConfig): Promise<void> {
    await this.transporter.sendMail({
      from: `"${config.fromName}" <${config.from}>`,
      replyTo: config.replyTo,
      to,
      subject,
      html,
      text,
    });
  }
}

function createEmailProvider(): EmailProvider {
  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPort = process.env.SMTP_PORT?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  if (smtpHost && smtpPort && smtpUser && smtpPass) {
    return new SmtpEmailProvider();
  }
  if (process.env.NODE_ENV === "production") {
    console.warn("[WARN] SMTP not configured. Falling back to console email provider. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS to enable real email sending.");
  }
  return new ConsoleEmailProvider();
}

export class EmailService {
  private provider: EmailProvider;
  private config: EmailConfig;

  constructor(provider?: EmailProvider, config?: Partial<EmailConfig>) {
    this.provider = provider || createEmailProvider();
    this.config = { ...defaultConfig, ...config };
  }

  async sendEmail(params: {
    to: string;
    subject: string;
    html: string;
    text: string;
  }): Promise<void> {
    await this.provider.send(params.to, params.subject, params.html, params.text, this.config);
  }

  async sendReviewQueueEmail(to: string, data: ReviewQueueEmailData): Promise<void> {
    const { subject, html, text } = generateReviewQueueEmail(data);
    await this.sendEmail({ to, subject, html, text });
  }
}

export const emailService = new EmailService();

export async function sendReviewQueueEmail(to: string, data: ReviewQueueEmailData): Promise<void> {
  return emailService.sendReviewQueueEmail(to, data);
}

