import nodemailer from "nodemailer";
import User from "@/models/user.models";
import bcrypt from "bcryptjs";

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 25,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER_NAME,
    pass: process.env.PASS,
  },
});

export const mailer = async (email: string, userId: any, emailType: string) => {
  try {
    console.log(`userid: ${userId}`);

    const token = await bcrypt.hash(userId.toString(), 12);
    if (emailType === "verify") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: token,
          verifyTokenExp: Date.now() + 60 * 60 * 10 * 1000,
        },
      });
    } else if (emailType === "forgot") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: token,
          forgotPasswordTokenExp: Date.now() + 60 * 60 * 10 * 1000,
        },
      });
    }

    const mailOptions = {
      from: "mumerfarooq@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "verify"
          ? "Verify your email with in 10min"
          : "Reset your password with in 10 min", // Subject line

      html: `
          <p>Click <a href="${process.env.DOMAIN}verify?token=${token}">here</a>
          to ${
            emailType === "verify" ? "verify your email" : "reset your password"
          }
          or copy and paste the link below in your browser.</p>
          <p>${process.env.DOMAIN}verify?token=${token}</p>
        `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
