"use client";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./verifyemail.module.css";

function VerifyEmail() {
  const searchParam = useSearchParams();

  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resending, setResending] = useState(false);

  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/user/verify", { token });
      console.log(`response: ${response.data}`);
      setVerified(true);
      toast.success("User verified");
    } catch (error: any) {
      setError(true);
      toast.error("Verification failed. Invalid or expired token.");
    }
  };

  const resendEmail = async () => {
    setResending(true);
    try {
      const response = await axios.post("/api/user/resend-verification", {
        token,
      });
      console.log(`response: ${response.data}`);
      toast.success("Verification email resent");
    } catch (error: any) {
      toast.error("Failed to resend verification email.");
    }
    setResending(false);
  };

  useEffect(() => {
    const verifyToken = searchParam.get("token");
    if (verifyToken) {
      setToken(verifyToken);
    } else {
      setError(true);
      toast.error("No token provided.");
    }
  }, [searchParam]);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className={styles.container}>
      <Toaster />
      <h1 className={styles.title}>Verify Email</h1>
      {verified ? (
        <div className={styles.message}>
          <h2 className={styles.verified}>Email Verified</h2>
          <Link href="/login" className={styles.link}>
            Login
          </Link>
        </div>
      ) : (
        <div className={styles.message}>
          {error ? (
            <div className={styles.error}>
              <h2 className={styles.errorText}>Error</h2>
              <button
                onClick={resendEmail}
                className={styles.resendButton}
                disabled={resending}
              >
                {resending ? "Resending..." : "Resend Verification Email"}
              </button>
            </div>
          ) : (
            <h2 className={styles.checkEmail}>
              Check your email for the verification link.
            </h2>
          )}
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
