import React, { Component, useState } from "react";
import { FormControl, Input } from "@material-ui/core/";
import Cookies from "js-cookie";
import { Globals } from "./Globals";
import { Form } from "bootstrap-4-react";

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
  var key = Globals.CryptKey;
  var cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  return cipherText;
}

export function decrypt(data) {
  var CryptoJS = require("crypto-js");
  var key = Globals.CryptKey;
  var bytes = CryptoJS.AES.decrypt(data, key);
  var decText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decText;
}

export function renderTextBox({
  input,
  label,
  type,
  id,
  required,
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
          id={id}
          placeholder={placeholder}
          {...input}
        />

        <Form.Text text="muted" xs={12} md={6}>
          {smalltext}
        </Form.Text>
      </Form.Group>
    </div>
  );
}

export function renderCheckBox({ input, id, label, name }) {
  return (
    <Form.Group>
      <Form.CustomCheckbox id={id} name={name} {...input}>
        {label}
      </Form.CustomCheckbox>
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
            id={"radio" + item}
            name={name}
            value={item}
            required={required}
            {...input}
          />
          <Form.CheckLabel htmlFor={"radio" + item}>{item}</Form.CheckLabel>
        </Form.Check>
      ))}
      <Form.Text text="muted" xs={12} md={6}>
        {smalltext}
      </Form.Text>
    </Form.Group>
  );
}
