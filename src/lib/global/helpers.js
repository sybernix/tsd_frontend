import React, { Component, useState } from "react";
import { FormControl, Input, IconButton } from "@material-ui/core/";
import { LockOutlined, Visibility, VisibilityOff } from "@material-ui/icons";
import Cookies from "js-cookie";
import { Config } from "./Config";
import { Form, InputGroup, BP } from "bootstrap-4-react";

export function getJWT() {
  let token = Cookies.get("infinity");
  let userLevel = Cookies.get("usuario");
  return {
    token: token,
    userLevel: userLevel,
  };
}

export function encrypt(data) {
  var CryptoJS = require("crypto-js");
  var key = Config.CryptKey;
  var cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  return cipherText;
}

export function decrypt(data) {
  var CryptoJS = require("crypto-js");
  var key = Config.CryptKey;
  var bytes = CryptoJS.AES.decrypt(data, key);
  var decText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decText;
}

export function RenderPassword({
  input,
  label,
  id,
  required,
  placeholder,
  name,
  smalltext,
  meta: { touched, error, warning },
}) {
  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div>
      <Form.Group>
        <label htmlFor={id}>{label}</label>
        <InputGroup>
          <Form.Input
            type={showPassword ? "text" : "password"}
            name={name}
            required={required}
            id={id}
            placeholder={placeholder}
            {...input}
          />
          <InputGroup.Append>
            <InputGroup.Text id={id + "append"}>
              <IconButton
                size="small"
                aria-label="toggle password visibility"
                onClick={handlePassword}
                onMouseDown={handlePassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputGroup.Text>
          </InputGroup.Append>
          <Form.Text text="muted" xs={12} md={6}>
            {smalltext}
          </Form.Text>
        </InputGroup>
        {touched &&
          ((error && (
            <BP text="danger">
              <small>{error}</small>
            </BP>
          )) ||
            (warning && (
              <BP text="danger">
                <small>{warning}</small>
              </BP>
            )))}
      </Form.Group>
    </div>
  );
}

export function renderTextBox({
  input,
  label,
  type,
  id,
  required,
  readonly,
  className,
  placeholder,
  name,
  smalltext,
  meta: { touched, error, warning },
}) {
  return (
    <div>
      <Form.Group>
        <label htmlFor={id}>{label}</label>
        <Form.Input
          type={type}
          name={name}
          required={required}
          readonly={readonly}
          id={id}
          placeholder={placeholder}
          {...input}
        />
        <Form.Text text="muted" xs={12} md={6}>
          {smalltext}
        </Form.Text>
        {touched &&
          ((error && (
            <BP text="danger">
              <small>{error}</small>
            </BP>
          )) ||
            (warning && (
              <BP text="danger">
                <small>{warning}</small>
              </BP>
            )))}
      </Form.Group>
    </div>
  );
}

export function renderCheckBox({
  input,
  id,
  label,
  name,
  meta: { touched, error, warning },
}) {
  return (
    <Form.Group>
      <Form.CustomCheckbox id={id} name={name} {...input}>
        {label}
      </Form.CustomCheckbox>
      {touched &&
        ((error && (
          <BP text="danger">
            <small>{error}</small>
          </BP>
        )) ||
          (warning && (
            <BP text="danger">
              <small>{warning}</small>
            </BP>
          )))}
    </Form.Group>
  );
}

export function renderSelect({
  input,
  label,
  id,
  required,
  disabled,
  name,
  smalltext,
  items,
  meta: { touched, error, warning },
}) {
  return (
    <div>
      <Form.Group>
        <label htmlFor={id}>{label}</label>
        <Form.Select id={id} name={name} required={required} {...input}>
          <option value={null}>{label}</option>
          {items.map((item, i) => (
            <option value={item.id} key={i}>
              {item.name}
            </option>
          ))}
        </Form.Select>
        <Form.Text text="muted" xs={12} md={6}>
          {smalltext}
        </Form.Text>
      </Form.Group>
    </div>
  );
}

export function renderRadio({
  input,
  label,
  id,
  name,
  required,
  smalltext,
  items,
  meta: { touched, error, warning },
}) {
  return (
    <Form.Group>
      <label htmlFor={id}>{label}</label>
      {items.map((item, i) => (
        <Form.Check key={i}>
          <Form.Radio
            id={"radio" + item.id}
            name={name}
            required={required}
            {...input}
          />
          <Form.CheckLabel htmlFor={"radio" + item.id}>
            {item.name}
          </Form.CheckLabel>
        </Form.Check>
      ))}
      <Form.Text text="muted" xs={12} md={6}>
        {smalltext}
      </Form.Text>
    </Form.Group>
  );
}

export function renderHidden({ input, id, name }) {
  return <Form.Input type="hidden" name={name} id={id} {...input} />;
}
