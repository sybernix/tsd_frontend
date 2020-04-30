import React, { Component } from "react";
import { Avatar, Button, CssBaseline, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, IconButton, FormControl, Input, InputLabel, InputAdornment } from "@material-ui/core/";

import { LockOutlined, Visibility, VisibilityOff } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";

import clsx from "clsx";
import Cookies from 'js-cookie';

import { Field, reduxForm } from "redux-form";
import { getJWT, encrypt } from './../../lib/global/helpers';
import Call from "./../../lib/api/Call";

const styles = theme => ({
  paper: { marginTop: theme.spacing(8), display: "flex", flexDirection: "column", alignItems: "center" },
  avatar: { margin: theme.spacing(1), backgroundColor: theme.palette.primary.main },
  form: { width: "100%",  marginTop: theme.spacing(1) },
  submit: { margin: theme.spacing(3, 0, 2), padding: theme.spacing(1.5) }
});

class Login extends Component {
  
  state = { 
    showPassword: false, 
    errorMessage: "" 
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const jwt = getJWT();
    let invalid = false;
    if (jwt.token != null && jwt.userLevel != null) this.props.history.push("/dashboard");
  }

  onSubmit = (values) => {
    Call.Request("login", null, values)
    .then(response => {   
      let token = response.data.token;
      let exp = values.remember? 365 : 1;
      let userType = response.data.userType;
      let user = null;

      Call.Request("retrieve", token, { id: "admin001" }, userType)
            .then(response => {
                user = response.data;
                Cookies.set('infinity', token, { expires: exp });
                Cookies.set('usuario', encrypt(userType), { expires: exp });
                Cookies.set('embose',  encrypt(user), { expires: exp });
                this.props.history.push("/dashboard");
            })
            .catch(error => {
                 console.log(error);
                 return false;
            });
      
    })
    .catch(() => {
      this.props.dispatch(this.props.reset('loginVerification'));
      this.setState ({ errorMessage : "Authantication failed" });
    });
  }

  handlePassword = () => {
    this.setState(() => {
      let val = !this.state.showPassword;
      return { showPassword: val };
    });
  };

  renderUsername = 
  ({ input, label, type, id, meta: { touched, error, warning } }) => (
    <div>
      <FormControl fullWidth={true} required={true} autoFocus={true} margin="normal" >
        <InputLabel htmlFor="txtUsername">Phone/Index</InputLabel>
        <Input id={id} label={label} type={type} error={(touched && warning)?true:false} {...input} />
        {touched &&
        ((error && <span>{error}</span>) ||
         (warning && <span>{warning}</span>))}
      </FormControl>     
    </div>
  );

  renderPassword = 
  ({ input, label, type, id, classes, meta: { touched, error, warning } }) => (
    <div>
      <FormControl fullWidth={true} required={true} margin="normal" className={clsx(classes.margin, classes.textField)}>
        <InputLabel htmlFor="txtPassword">Password</InputLabel>
        <Input id={id} label={label} error={(touched && warning)?true:false} type={this.state.showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={this.handlePassword} onMouseDown={this.handlePassword}>
                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }  {...input} />
       {touched &&
        ((error && <span>{error}</span>) ||
         (warning && <span>{warning}</span>))}
      </FormControl>    
    </div>
  );

  renderCheckbox = ({ input, name, label }) => (
    <Checkbox {...input} color="primary" />
  );

  render() {    

    const { classes } = this.props;
    const { handleSubmit, pristine, submitting, invalid } = this.props;

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
          <form className={classes.form} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className={clsx(classes.margin, classes.textField)}></div>
              <Field name="username" type="text" component={this.renderUsername} label="Phone/Index" id="txtUsername" />
              <Field name="password" type="text" component={this.renderPassword} label="Password" id="txtPassword" classes={classes} />
           
            <FormControlLabel control={ <Field name="remember" component={this.renderCheckbox} /> } label="Remember me next time" />
              {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
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
            {"Copyright © "} <Link color="inherit" href="http://www.shilpa.lk">www.shilpa.lk</Link> {" 2019-"}{new Date().getFullYear()}{"."}
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
  if (!values.username) { warnings.username = "Phone/Index is Required"; }
  if (!values.password) { warnings.password = "Password is Required"; }
  return warnings;
};

export default reduxForm({
  initialValues: { type: "login", },
  enableReinitialize: true,
  form: "loginVerification",
  validate : validate,
  warn : warn
})(withStyles(styles)(Login));
