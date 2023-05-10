import React, { useLayoutEffect, useEffect, useState } from "react";
import "./loginPageStyle.css";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../components/customInput/CustomInput";
import { get, post } from "../../servises/axios/api";
import { useAuthDispatch, useAuthState } from "../../contexts/auth-context";
import Loading from "../../components/Loading/Loading";
import { actionTypes, useAuthActions } from "../../contexts/reducer";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "react-bootstrap-icons";

export default function LoginPage() {
  const [useName, setUseName] = useState("");
  const [password, setPassword] = useState("");
  const [isPersistent, setIsPersistent] = useState(false);
  const [token, setToken] = useState(null);
  // const [userId, setUserId] = useState(null);
  // const [userName, setUserName] = useState(null);
  // const [centerId, setCenterId] = useState(null);
  // const [langId, setLangId] = useState(null);
  const [userInfos, setUserInfos] = useState(null);
  const [userConfigs, setUserConfigs] = useState(null);
  const { loading } = useAuthState() || {};
  const dispatch = useAuthDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { from } = location.state || { from: { pathname: "/" } };
  const { loginReq, loginSuccess, loginError } = useAuthActions();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
    });
    post("/api/Account/LoginWebClient", {
      userName: `${useName}`,
      passWord: `${password}`,
      isPersistent: isPersistent,
    }).then((response) => {
      setToken(response.userTokens.accessToken);
      setUserInfos(response.userInfos);
      setUserConfigs(response.userConfigs);
    });
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userInfos));
      localStorage.setItem("configs", JSON.stringify(userConfigs));
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
          user: userInfos,
          setting: userConfigs,
          token: token,
        },
      });
      navigate(from);
    }
  }, [token, userInfos, userConfigs, dispatch]);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const setting = localStorage.getItem("configs");
    if (token && user && setting) {
      dispatch({
        type: actionTypes.LOGIN_REQUEST,
      });
      setToken(token);
      setUserInfos( JSON.parse(user));
      setUserConfigs( JSON.parse(setting));
    }
  }, [dispatch]);
  const handleIsPersistent = (e) => {
    setIsPersistent(e.target.checked);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-100 centered-style login-container">
          <div className="login-form">
            <Form onSubmit={handleLogin} className="login">
              <CustomInput
                type="text"
                name="userName"
                required={true}
                handleChange={(e) => setUseName(e.target.value)}
                labelText="نام کاربری"
              />
              <CustomInput
                type="password"
                name="password"
                required={true}
                handleChange={(e) => setPassword(e.target.value)}
                labelText="رمز عبور"
              />
              <Form.Group className="mb-3">
                <Form.Check
                  checked={isPersistent}
                  onChange={handleIsPersistent}
                  label="مرا به خاطر بسپار!"
                />
              </Form.Group>
              <div className="frame">
                <button type="submit" className="custom-btn btn-5">
                  <span class="btn-icon mx-2">
                    <ArrowRight />
                  </span>
                  <span class="btn-txt">ورود</span>
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
