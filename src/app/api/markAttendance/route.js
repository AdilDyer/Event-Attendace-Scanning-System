// pages/api/markAttendance.js
import dbConnect from "../../../lib/db";
import User from "../../../lib/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();
    const { jwtToken } = await req.json();

    // Verify JWT token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const attendedUser = await User.findOne(
      { email: decoded.email } // Assuming you are using email to find the user
    );

    if (attendedUser.attended) {
      return NextResponse.json(
        { error: "User already marked attendance" },
        { status: 400 }
      );
    }

    // Mark attendance for the user
    const user = await User.findOneAndUpdate(
      { email: decoded.email }, // Assuming you are using email to find the user
      { $set: { attended: true } }, // Update attended field
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Attendance marked successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
