import React from "react";
import "./loginPageStyle.css";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../components/customInput/CustomInput";

export default function LoginPage() {
  return (
    <div className="w-100 centered-style aaa">
      <div className="login-form">
        <Form>
        <CustomInput type='text' name='userName' required={true} handleChange labelText='نام کاربری' />
        <CustomInput type='password' name='password' required={true} handleChange labelText='رمز عبور' />
        <Button variant="success">ورود</Button>
        </Form>
      </div>
    </div>
  );
}
