import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page.</p>
      <Link href="/api/saveUser">
        {" "}
        <Button variant="dark">Save Users</Button>
      </Link>{" "}
      <Link href="/api/sendEmailsToUser">
        {" "}
        <Button variant="dark">Send Emails</Button>
      </Link>{" "}
      <Link href="/MarkAttendancePage">
        {" "}
        <Button variant="dark">Goto Attendace Page</Button>
      </Link>
    </div>
  );
};

export default Home;
