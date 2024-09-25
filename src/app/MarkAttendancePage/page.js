"use client";
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast } from "react-toastify"; // For notifications

const MarkAttendancePage = () => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 500,
        height: 500,
      },
      fps: 2,
    });

    function success(result) {
      // scanner.clear();
      handleMarkAttendance(result);
    }
    function error(err) {
      // console.error(err);
    }
    scanner.render(success, error);
  }, []);

  const handleMarkAttendance = async (jwtToken) => {
    try {
      const response = await fetch("/api/markAttendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jwtToken }),
      });

      if (response.status === 200) {
        toast.success("Attendance marked successfully!", {
          autoClose: 500,
        });
      } else {
        throw new Error("Failed to mark attendance: " + response.statusText);
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 500,
      });
    }
  };

  return (
    <div className="scannerPageBigDiv">
      <h1>Welcome to the arena, Mafias !</h1>
      <h5>Scan Your QR Code over here !</h5>
      <div id="reader"></div>
    </div>
  );
};

export default MarkAttendancePage;
