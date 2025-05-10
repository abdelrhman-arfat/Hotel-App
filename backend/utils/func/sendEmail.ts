import nodemailer from "nodemailer";
import { CLIENT_URL, EMAIL_PASS, EMAIL_USER } from "../../constants/Env.js";

const sendEmail = async (user, message: string, subject: string) => {
  const transporter = await nodemailer.createTransport({
    service: "Gmail",
    auth: {
      // eslint-disable-next-line no-undef
      user: EMAIL_USER, // Your email
      // eslint-disable-next-line no-undef
      pass: EMAIL_PASS, // Your email password
    },
  });

  // eslint-disable-next-line no-undef

  await transporter.sendMail({
    // eslint-disable-next-line no-undef
    from: `Hotel <${EMAIL_USER}>`,
    to: user.email,
    subject: subject,
    html: `
      <div style="font-family: 'Playfair Display', serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <header style="background: linear-gradient(135deg, #FFD700 0%, #ffbe0b 100%); color: white; padding: 30px; text-align: center; border-radius: 8px;">
          <img src="https://your-hotel-logo.com/logo.png" alt="Hotel Logo" style="width: 150px; margin-bottom: 15px;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 300;">Welcome to Luxury Stay, ${user?.full_name}</h1>
        </header>
        
        <main style="background-color: #ffffff; padding: 30px; margin: 20px 0; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
          <div style="line-height: 1.6; color: #2c3e50; font-size: 16px;">
            ${message}
          </div>
          <div style="text-align: center; margin-top: 25px;">
            <a href=${CLIENT_URL} style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #ffb703 0%, #ffbe0b 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: 500; transition: all 0.3s ease;">Visit Our Website</a>
          </div>
          </main>


        
        <footer style="text-align: center; padding: 20px; color: #505050;">
          <div style="margin-bottom: 15px;">
            <a href="#" style="margin: 0 10px; color: #1e3c72; text-decoration: none;">Facebook</a>
            <a href="#" style="margin: 0 10px; color: #1e3c72; text-decoration: none;">Instagram</a>
            <a href="#" style="margin: 0 10px; color: #1e3c72; text-decoration: none;">Twitter</a>
          </div>
          <p style="margin: 0; font-size: 14px;">Thank you for choosing our luxury accommodation</p>
          <p style="margin: 10px 0 0; font-size: 12px; color: #777;">© ${new Date().getFullYear()} Luxury Hotel & Resorts. All rights reserved.</p>
        </footer>
      </div>
    `,
  });
};

export { sendEmail };
