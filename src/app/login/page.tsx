"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import styles from "./login.module.css"; // Import the CSS module
import Link from "next/link";

function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [submitBtn, setSubmitBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    try {
      console.log(user);
      setLoading(true);
      const response = await axios.post("api/user/login", user);
      router.push("/about");
      toast.success("Login");
    } catch (error) {
      toast.error("Some error occurred");
    } finally {
      setLoading(false);
      toast.error("Some error occurred");
    }
  };

  useEffect(() => {
    // Enable submit button only when all fields are filled
    setSubmitBtn(user.email.length > 0 && user.password.length > 0);
  }, [user]);

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={submit} className={styles.loginForm}>
        <h2>Login</h2>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </div>

        <div className={`${styles.formGroup} ${styles.passwordGroup}`}>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={user.password}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={!submitBtn || loading}
        >
          {loading ? "Loging in..." : "Log in"}
        </button>
        <h5>
          Do not have an account? <Link href={"/signup"}>Sign up</Link>
        </h5>
      </form>
    </div>
  );
}

export default Login;
