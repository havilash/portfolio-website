import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import "./Login.css";
import { readForm } from "src/services/Utils";
import { login, logout } from "src/lib/api";
import Modal from "src/components/modals/Modal/Modal";

function validate(data) {
  const errors = {};

  // Validate email
  if (!data.email) {
    errors.email = ["Email is required"];
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
    errors.email = ["Email is invalid"];
  }

  // Validate password
  if (!data.password) {
    errors.password = ["Password is required"];
  } else if (data.password.length < 8) {
    errors.password = ["Password must be at least 8 characters long"];
  }

  return errors;
}

export default function Login({ session }) {
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!session.token || !session.ready) return;
    logout(session);
    session.logout();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setStatus("loading");
    session.logout();
    const data = readForm(e.target);
    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setStatus("failed");
      setIsLoading(false);
      return;
    }

    try {
      const resp = await login(data);
      session.login({ user: resp.user, token: resp.access_token });
      setStatus("success");
    } catch (error) {
      if (error.status === 429) {
        setStatus("tooManyAttempts");
      } else {
        setStatus("failed");
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (status == "success") {
      session.user.access == 0 && setModalOpen(true);
    }
  }, [status]);

  let statusMessage;
  switch (status) {
    case "success":
      statusMessage = (
        <div className="success">
          <FaCheckCircle /> Login Successful
        </div>
      );
      break;
    case "failed":
      statusMessage = (
        <div className="error">
          <FaTimesCircle /> Login Failed
        </div>
      );
      break;
    case "tooManyAttempts":
      statusMessage = (
        <div className="error">
          <FaTimesCircle /> Too Many Attempts
        </div>
      );
      break;
    case "loading":
      statusMessage = (
        <div className="loading">
          <img
            src="/assets/loader.svg"
            className={`loader ${!isLoading && "disabled"}`}
          />
          Loading
        </div>
      );
      break;
    default:
      statusMessage = null;
  }

  return (
    <section className="login flex justify-center items-center min-h-screen">
      <form onSubmit={onSubmit} className="form">
        {statusMessage}
        <fieldset>
          <label name="email">E-Mail</label>
          <input name="email" type="text" placeholder="Email" />
        </fieldset>
        <fieldset>
          <label name="password">Password</label>
          <input name="password" type="password" placeholder="Password" />
        </fieldset>
        <fieldset className="submit">
          <button type="submit" className="submit button" disabled={isLoading}>
            Log In
          </button>
          <Link to="/registration">Register</Link>
        </fieldset>
      </form>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="max-w-[24rem]">
          <p>
            Welcome back! We're sorry, but it looks like you don't have access
            to the secure space at this time.
          </p>
        </div>
      </Modal>
    </section>
  );
}
