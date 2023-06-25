import { useEffect, useState } from "react";
import { FaCheckCircle, FaKey, FaTimesCircle } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";

import { ReactComponent as Loader } from "src/assets/loader.svg";
import Modal from "src/components/modals/Modal/Modal";
import { login, register } from "src/lib/api";
import { readForm } from "src/services/Utils";
import "./Registration.css";

function validate(data) {
  const errors = {};

  // Validate name
  if (!data.name) {
    errors.name = ["Name is required"];
  }

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

  // Validate password confirmation
  if (!data.password_confirmation) {
    errors.password_confirmation = ["Password confirmation is required"];
  } else if (data.password !== data.password_confirmation) {
    errors.password_confirmation = ["Passwords do not match"];
  }

  // Validate comment
  if (data.comment && data.comment.length > 500) {
    errors.comment = ["Comment must be less than 500 characters"];
  }

  return errors;
}

export default function Registration({ session }) {
  const [searchParams] = useSearchParams();
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setStatus("loading");
    setErrors({});
    const data = {
      ...readForm(e.target),
      key: searchParams.get("key"),
    };
    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("failed");
      setIsLoading(false);
      return;
    }

    try {
      await register(data);
      const resp = await login(data);
      session.login({ user: resp.user, token: resp.access_token });
      setStatus("success");
    } catch (error) {
      const resp = await error.json();
      if (resp) {
        setErrors(resp);
      }
      if (resp.error === "Invalid key provided") {
        setStatus("invalidKey");
        setIsLoading(false);
        return;
      }
      setStatus("failed");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (status == "success") {
      setModalOpen(true);
    }
  }, [status]);

  let statusMessage;
  switch (status) {
    case "success":
      statusMessage = (
        <div className="success">
          <FaCheckCircle /> Registration Successful
        </div>
      );
      break;
    case "failed":
      statusMessage = (
        <div className="error">
          <FaTimesCircle /> Registration Failed
        </div>
      );
      break;
    case "invalidKey":
      statusMessage = (
        <div className="error">
          <FaTimesCircle /> Invalid Key
        </div>
      );
      break;
    case "loading":
      statusMessage = (
        <div className="loading">
          <Loader className={`loader ${!isLoading && "disabled"}`} />
          Loading
        </div>
      );
      break;
    default:
      statusMessage = null;
  }

  return (
    <section className="registration flex justify-center items-center min-h-screen">
      <form onSubmit={onSubmit} className="form">
        {statusMessage}
        <fieldset>
          <label name="name">Name</label>
          <input name="name" type="text" placeholder="Name" />
          {errors.name && <p className="error-text">{errors.name[0]}</p>}
        </fieldset>
        <fieldset>
          <label name="email">E-Mail</label>
          <input name="email" type="text" placeholder="Email" />
          {errors.email && <p className="error-text">{errors.email[0]}</p>}
        </fieldset>
        <fieldset>
          <label name="password">Password</label>
          <input name="password" type="password" placeholder="Password" />
          {errors.password && (
            <p className="error-text">{errors.password[0]}</p>
          )}
        </fieldset>
        <fieldset>
          <label name="password_confirmation">Password Confirmation</label>
          <input
            name="password_confirmation"
            type="password"
            placeholder="Password Confirmation"
          />
          {errors.password_confirmation && (
            <p className="error-text">{errors.password_confirmation[0]}</p>
          )}
        </fieldset>
        <fieldset>
          <label name="comment">
            Comment <span className="opacity-50">(Optional)</span>
          </label>
          <textarea
            name="comment"
            type="text"
            placeholder="Why should we grant you access?"
            rows="4"
            maxLength="500"
          />
          {errors.comment && <p className="error-text">{errors.comment[0]}</p>}
        </fieldset>
        <fieldset className="submit">
          <button type="submit" className="submit button" disabled={isLoading}>
            Register
            {searchParams.get("key") && <FaKey />}
          </button>
          <Link to="/login">Log In</Link>
        </fieldset>
      </form>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="max-w-[24rem]">
          {searchParams.get("key") ? (
            <p>
              Congratulations! You have successfully used your key and gained
              access to the secure space. You have now access to the portfolio.
            </p>
          ) : (
            <p>
              Thank you for your request. Please note that it may take a few
              days to process your request. You will receive an email with
              information about whether you have been granted access to the
              secure space.
            </p>
          )}
        </div>
      </Modal>
    </section>
  );
}
