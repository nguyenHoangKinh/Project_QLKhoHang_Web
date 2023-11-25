import React, { useState } from "react";
import "../theme/RegisterAccount.css";
import axios from "axios";
import { BASE_URL } from "../config";

const initFormValue = {
  username: "",
  address: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const isEmptyValue = (value) => {
  return !value || value.trim().length < 1;
};

export default function RegisterPage() {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState({});

  const validateForm = () => {
    const error = {};

    if (isEmptyValue(formValue.username)) {
      error["username"] = "Username is required";
    }

    if (isEmptyValue(formValue.address)) {
      error["address"] = "Address is required";
    }

    if (isEmptyValue(formValue.email)) {
      error["email"] = "Email is required";
    }

    if (isEmptyValue(formValue.phone)) {
      error["phone"] = "Phone is required";
    }

    if (isEmptyValue(formValue.password)) {
      error["password"] = "Password is required";
    }

    if (isEmptyValue(formValue.confirmPassword)) {
      error["confirmPassword"] = "Confirm Password is required";
    } else if (formValue.confirmPassword !== formValue.password) {
      error["confirmPassword"] = "Confirm Password not match";
    }
    setFormError(error);

    return Object.keys(error).length === 0;
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      console.log("form value", formValue);
      let acc = {
        username: formValue.username,
        password: formValue.password,
        confirmPassword: formValue.confirmPassword,
        address: formValue.address,
        phone: formValue.phone,
        email: formValue.email,
      };

      axios.post(BASE_URL + "/auth/register?status=1",
        acc
      ).then((respone) => {
        console.log(respone);
        alert("Đăng ký thành công");
        window.location.href = "login";
      }).catch((err) => {
        console.log(err.request.response);
        alert(err.request.response.slice(12).replace('"}', ""));
      });
    } else {
      console.log("form invalid");
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <h1 className="title">Register account</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              className="form-control"
              type="text"
              name="username"
              value={formValue.username}
              onChange={handleChange}
            />
            {formError.username && (
              <div className="error-feedback">{formError.username}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              id="address"
              className="form-control"
              type="text"
              name="address"
              value={formValue.address}
              onChange={handleChange}
            />
            {formError.address && (
              <div className="error-feedback">{formError.address}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              className="form-control"
              type="text"
              name="email"
              value={formValue.email}
              onChange={handleChange}
            />
            {formError.email && (
              <div className="error-feedback">{formError.email}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              id="phone"
              className="form-control"
              type="text"
              name="phone"
              value={formValue.phone}
              onChange={handleChange}
            />
            {formError.phone && (
              <div className="error-feedback">{formError.phone}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              className="form-control"
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
            />
            {formError.password && (
              <div className="error-feedback">{formError.password}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="confirm-password" className="form-label">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              className="form-control"
              type="password"
              name="confirmPassword"
              value={formValue.confirmPassword}
              onChange={handleChange}
            />
            {formError.confirmPassword && (
              <div className="error-feedback">{formError.confirmPassword}</div>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>

          <div className="btn_login">
            You have account
            <a href="/"> Login</a>
          </div>

        </form>
      </div>
    </div>
  );
}
