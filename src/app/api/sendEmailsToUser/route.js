import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConnect from "../../../lib/db";
import User from "../../../lib/models/user";
import QRCode from "qrcode";
const sendEmail = async (userEmail, userName, qrCodeImage) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: '"Freshers Committee" <swc.nss.nfsu@gmail.com>',
    to: userEmail,
    subject: `🎉 🎉 You're Invited, ${userName} :: The Freshers Event 2024 !`,
    text: `Hi ${userName},\n\nWe hope you have a wonderful event ahead!\n\nLets Rock this one together !\n\nBest Regards,\nFreshers Committee, Btech, NFSU`,
    html: `<div style="background-color:rgba(255, 192, 203, 0.72); border-radius:0.5rem; padding:1rem 0.5rem">

<br>🎈 🥳 🎉 🔥 🥰 🎊<br><br><h3>Dear ${userName}, </h3><br>

<h3>Welcome to Club! We're thrilled to have you as a part of our dynamic and vibrant community. To kick off your journey, we are having an event just for you!</h3> <br>
<h3>We invite you to The Incognito 3.0 —> A fun-filled event where you can connect with your peers, rock in the DJ, and get a glimpse of the amazing experiences that await you at our beloved NFSU.</h3>
<br>
<h2>Event Details:</h2>
<h3>Date: 3rd October 2024</h3>
<h3>Time: 8:00 PM</h3>
<h3>Venue: NFSU Upper Auditorium</h3>
<br>
<h3>Don't forget to bring your QR code along with you to the event. It's your ticket to the party!</h3>
<br>
<h3>See you there!</h3>
<br>
<h3>Best Regards,</h3>
<h3>Freshers Committee, Btech, NFSU</h3>
<br>
<h3>🎈 🥳 🎉 🔥 🥰 🎊</h3>
<br>
    </div>


`,
    attachments: [
      {
        filename: "qrcode.png",
        content: qrCodeImage.split(",")[1], // Only the base64 part
        encoding: "base64",
      },
    ],
  });
};
export async function GET(req) {
  try {
    await dbConnect();
    const users = await User.find({});
    for (const user of users) {
      const qrCodeImage = await QRCode.toDataURL(user.jwtToken);
      await sendEmail(user.email, user.name, qrCodeImage);
    }

    return NextResponse.json({
      message: " emails sent successfully",
      status: 200,
    });
  } catch (error) {
    // Return error response in case of an exception
    return NextResponse.json({ error: error.message, status: 400 });
  }
}
