const SERVER = "localhost";

export const sendOTP = (email: string, otp: string) => {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey("API_KEY"); // 設定したSendGridのAPI　KEY

  const msg = {
    to: email,
    from: "test@example.com", // SendGridで作成したメールアドレス
    subject: "Sending with SendGrid is Fun",
    text: "テキストの内容",
    html: "あなたの認証コードは  <strong>" + otp + "</strong> です。",
  };

  sgMail.send(msg);
};
