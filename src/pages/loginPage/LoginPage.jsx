import React, { useEffect, useState } from "react";
import "./loginPageStyle.css";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../components/customInput/CustomInput";
import { get, post } from "../../servises/axios/api";
import { useAuthDispatch } from "../../contexts/auth-context";
import { actionType } from "../../contexts/reducer";

export default function LoginPage() {
  const [useName, setUseName] = useState("");
  const [password, setPassword] = useState("");
  const [isPersistent, setIsPersistent] = useState(false);
  const [token, setToken] = useState(null)

  const dispatch = useAuthDispatch()
  const handleLogin = (e) => {
    e.preventDefault();
    post("/api/Account/Login", {
      userName: `${useName}`,
      passWord: `${password}`,
      isPersistent: isPersistent,
    }).then((response)=>{
      if(response){
        setToken(response.access_token)
      }
      console.log(token)
    })
  };
  // const fetchCurrentUserInfo = () => {
  //   get()
  // }
  useEffect(() => {
    if(token){
      localStorage.setItem('token', token)
      dispatch({
        type: actionType.LOGIN_SUCCESS,
        payload: {
          user: '',
          token:token
        }
      })
    }
  }, [token, dispatch])
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      setToken(token)
    }
  }, [token])
  
  
  return (
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
              required
              label="مرا به خاطر بسپار!"
            />
          </Form.Group>
          <Button type="submit" variant="success">
            ورود
          </Button>
        </Form>
      </div>
    </div>
  );
}