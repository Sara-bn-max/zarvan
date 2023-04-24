import React, { useLayoutEffect, useEffect, useState } from "react";
import "./loginPageStyle.css";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../components/customInput/CustomInput";
import { get, post } from "../../servises/axios/api";
import { useAuthDispatch, useAuthState } from "../../contexts/auth-context";
import Loading from "../../components/Loading/Loading";
import { actionTypes } from "../../contexts/reducer";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [useName, setUseName] = useState("");
  const [password, setPassword] = useState("");
  const [isPersistent, setIsPersistent] = useState(false);
  const [token, setToken] = useState(null);
  const { loading } = useAuthState() || {};
  const dispatch = useAuthDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { from } = location.state || { from: { pathname: "/" } };
  // const { loginReq, loginSuccess, loginError } = useAuthActions();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
    });
    post("/api/Account/Login", {
      userName: `${useName}`,
      passWord: `${password}`,
      isPersistent: isPersistent,
    }).then((response) => {
      setToken(response.access_token);
      console.log(token);
    });
  };
  // const fetchCurrentUserInfo = () => {
  //   get()
  // }
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
          user: "",
          token: token,
        },
      });
      navigate(from);
    }
  }, [token, dispatch, from]);
  
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({
        type: actionTypes.LOGIN_REQUEST,
      });
      setToken(token);
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
        <div className="w-100 centered-style aaa">
          <div className="login-form">
            <Form onSubmit={handleLogin}>
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
              <Button type="submit" variant="success">
                ورود
              </Button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
