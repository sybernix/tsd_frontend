import React from "react";
import axios from "axios";
import { SubmissionError } from "redux-form";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function Submit(values) {
  return sleep(1000).then(() => {
    // simulate server latency
    if (!["john", "paul", "george", "ringo"].includes(values.username)) {
      throw new SubmissionError({
        username: "User does not exist",
        _error: "Login failed!"
      });
    } else if (values.password !== "123") {
      throw new SubmissionError({
        password: "Wrong password",
        _error: "Login failed!"
      });
    } else {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    }
  });
}

export default Submit;
