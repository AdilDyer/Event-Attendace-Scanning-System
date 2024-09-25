import dbConnect from "../../../lib/db";
import User from "../../../lib/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Generate JWT token synchronously
const generateToken = (name, email, enrollmentNumber) => {
  return jwt.sign({ name, email, enrollmentNumber }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

export async function GET(req) {
  try {
    await dbConnect();

    // Sample users (in a real scenario, fetch these from a data source)
    let users = [
      {
        name: "Adil Dyer",
        email: "smile.itsadil@gmail.com",
        enrollmentNumber: "123456",
      },
      {
        name: "Adil Dyer",
        email: "aaddiillllllllll@gmail.com",
        enrollmentNumber: "123457",
      },
    ];

    // Map through users to add JWT tokens
    users = users.map((user) => ({
      ...user,
      jwtToken: generateToken(user.name, user.email, user.enrollmentNumber),
    }));

    // Insert users into the database, ensure to handle duplicates if necessary
    await User.insertMany(users);

    // Return success response
    return NextResponse.json({
      status: 200,
      message: "Users and tokens generated successfully!",
    });
  } catch (error) {
    // Return error response in case of an exception
    return NextResponse.json({ error: error.message, status: 400 });
  }
}
