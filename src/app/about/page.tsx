"use client";
import React, { useState, useEffect } from "react";
import styles from "./About.module.css";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

function About() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    photo: "",
    isVerify: "",
  });

  const aboutUser = async () => {
    try {
      const responce = await axios.get("api/user/about");
      return responce.data.user;
    } catch (error: any) {
      return toast.error(error.message);
    }
  };

  useEffect(() => {
    // Fetch user data from an API or context

    // Here we use dummy data for demonstration
    const fetchUserData = async () => {
      // Simulate an API call
      const user = await aboutUser();
      console.log(`user: ${user.email}`);

      const userData = {
        email: user.email,
        username: user.name,
        role: user.role,
      };

      setUser({
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo,
        isVerify: user.isVerify,
      });
    };

    fetchUserData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Me</h1>
      <div className={styles.userInfo}>
        <p>Email: {user.email}</p>
        <p>Name: {user.name}</p>
        <p>Role: {user.role}</p>
        <p>Verified user?: {user.isVerify}</p>
      </div>
    </div>
  );
}

export default About;
