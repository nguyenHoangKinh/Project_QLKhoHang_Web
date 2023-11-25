import { useState, useEffect } from "react";
import { Alert } from "bootstrap";
import { LoginUserToken } from "../services/UserServices";
import axios from "axios";
const Login = (props) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  const handleLogin = () => {
    setLoadingData(true);
    if (username && password) {
      LoginUserToken(username, password);
      setLoadingData(false);
    }
  };

  return (
    <div className="app-containers">
      <div className="login-container col-12 col-sm-4">
        <div className="title">Login</div>
        <div className="text">Email Or UserName</div>
        <input
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <div className="text"> Password </div>
        <div className="input-pass">
          <input
            type={isShowPassword === true ? "text" : "password"}
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={
              isShowPassword === true
                ? "fa-solid fa-eye"
                : "fa-sharp fa-solid fa-eye-slash"
            }
            onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
        </div>
        <button
          className={username && password ? "active" : ""}
          disabled={username && password ? false : true}
          onClick={handleLogin}
        >
          {loadingData &&<i className="fa-solid fa-sync fa-spin"></i>}
          Login
        </button>
        <div className="back">
          <a href="registeraccount">
            Register<i className="fa-solid fa-chevron-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
