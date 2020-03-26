import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { LockOutlined, Visibility, VisibilityOff } from "@material-ui/icons/";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Avatar, Button, CssBaseline, TextField, FormHelperText, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, IconButton, FormControl, Input, InputLabel, InputAdornment } from "@material-ui/core/";

import { Field, reduxForm } from "redux-form";
import Submit from "./Submit";

const styles = theme => ({
  paper: { marginTop: theme.spacing(8), display: "flex", flexDirection: "column", alignItems: "center" },
  avatar: { margin: theme.spacing(1), backgroundColor: theme.palette.primary.main },
  form: { width: "100%",  marginTop: theme.spacing(1) },
  submit: { margin: theme.spacing(3, 0, 2), padding: theme.spacing(1.5) }
});

class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = { showPassword: false };

  handlePassword = () => {
    this.setState(() => {
      let val = !this.state.showPassword;
      return { showPassword: val };
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  renderUsername = 
  ({ input, label, type, id, meta: { touched, error, warning } }) => (
    <Input {...input} id={id} label={label} type={type} error={touched && warning}
    />
  );

  renderPassword = 
  ({ input, label, type, id, meta: { touched, error, warning } }) => (
    <Input {...input} id={id} label={label} error={touched && warning} type={this.state.showPassword ? "text" : "password"}
      endAdornment={
        <InputAdornment position="end">
          <IconButton aria-label="toggle password visibility" onClick={this.handlePassword} onMouseDown={this.handlePassword}>
            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    />
  );

  renderCheckbox = ({ input, name, label }) => (
    <Checkbox {...input} color="primary" />
  );

  render() {
    const { classes } = this.props;
    const { error, handleSubmit, pristine, reset, submitting, invalid } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5" className={"pacifico"}>
            Log in to Shilpa
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(Submit)}>
            <div className={clsx(classes.margin, classes.textField)}></div>
            <FormControl fullWidth={true} required={true} autoFocus={true} margin="normal" >
              <InputLabel htmlFor="txtUsername">Phone/Index</InputLabel>
              <Field name="username" type="text" component={this.renderUsername} label="Phone/Index" id="txtUsername" />
            </FormControl>
            <FormControl fullWidth={true} required={true} margin="normal" className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="txtPassword">Password</InputLabel>
              <Field name="password" type="text" component={this.renderPassword} label="Password" id="txtPassword" />
            </FormControl>
            <FormControlLabel control={ <Field name="remember" component={this.renderCheckbox} /> } label="Remember me next time" />
              {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" fullWidth variant="contained" color="primary" disabled={submitting || pristine || invalid} className={classes.submit} >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="forgot" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="http://www.shilpa.lk">www.shilpa.lk</Link>
            {" 2019-"}{new Date().getFullYear()}{"."}
          </Typography>
        </Box>
      </Container>
    );
  }
}

const validate = values => {
  return warn(values);
};

const warn = values => {
  const warnings = {};
  if (!values.username) { warnings.username = "Username Required"; }
  if (!values.password) { warnings.password = "Password Required"; }
  return warnings;
};

export default reduxForm({
  form: "loginVerification",
  validate,
  warn
})(withStyles(styles)(Login));
