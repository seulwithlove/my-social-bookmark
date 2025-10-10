export type SendMailBody = {
  email: string;
  emailcheck: string;
  nickname?: string;
  emailType?: "regist" | "reset-password";
};
