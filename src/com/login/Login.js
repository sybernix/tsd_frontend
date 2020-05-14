import React, { Component } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
} from "@material-ui/core/";

import { LockOutlined, Visibility, VisibilityOff } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";

import addNotification from "react-push-notification";
import clsx from "clsx";
import Cookies from "js-cookie";

import { Field, reduxForm } from "redux-form";
import {
  getJWT,
  encrypt,
  renderTextBox,
  RenderPassword,
} from "./../../lib/global/helpers";
import { loginRequest } from "./../../lib/api/LoginApi";
import { contactRequest } from "./../../lib/api/m/ContactApi";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: { width: "100%", marginTop: theme.spacing(1) },
  submit: { margin: theme.spacing(3, 0, 2), padding: theme.spacing(1.5) },
});

class Login extends Component {
  state = {
    showPassword: false,
    errorMessage: "",
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const jwt = getJWT();
    let invalid = false;
    if (jwt.token != null && jwt.userLevel != null)
      this.props.history.push("/dashboard");
  }

  onSubmit = (values) => {
    loginRequest("login", values)
      .then((response) => {
        addNotification({
          title: "Success",
          subtitle: "Logged In",
          message: response.data.token,
          theme: "darkblue",
          native: true,
        });
        return;
        let token = response.data.token;
        let exp = values.remember ? 365 : 1;
        let userType = response.data.user_type;
        let user = null;
        Cookies.set("infinity", token, { expires: exp });
        Cookies.set("usuario", encrypt(userType), { expires: exp });

        contactRequest("retrieveByID", {
          _id: response.data.user_id,
          userType: userType,
        })
          .then((response) => {
            user = response.data;
            Cookies.set("embose", encrypt(user), { expires: exp });
            this.props.history.push("/dashboard");
          })
          .catch((error) => {
            console.log(error);
            return false;
          });
      })
      .catch(() => {
        this.props.dispatch(this.props.reset("loginVerification"));
        this.setState({ errorMessage: "Authantication failed" });
      });
  };

  handlePassword = () => {
    this.setState(() => {
      let val = !this.state.showPassword;
      return { showPassword: val };
    });
  };

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
          <form
            className={classes.form}
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
          >
            <div className={clsx(classes.margin, classes.textField)}></div>
            <Field
              name="username"
              type="text"
              component={renderTextBox}
              label="Phone/Index"
              id="txtUsername"
            />
            <Field
              name="password"
              type="text"
              component={RenderPassword}
              label="Password"
              id="txtPassword"
              classes={classes}
            />

            <FormControlLabel
              control={
                <Field name="remember" component={this.renderCheckbox} />
              }
              label="Remember me next time"
            />
            {this.state.errorMessage && (
              <Alert severity="error">{this.state.errorMessage}</Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={submitting || pristine || invalid}
              className={classes.submit}
            >
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
            {"Copyright © "}{" "}
            <Link color="inherit" href="http://www.shilpa.lk">
              www.shilpa.lk
            </Link>{" "}
            {" 2019-"}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    );
  }
}

const validate = (values) => {
  return warn(values);
};

const warn = (values) => {
  const warnings = {};
  if (!values.username) {
    warnings.username = "Phone/Index is Required";
  }
  if (!values.password) {
    warnings.password = "Password is Required";
  }
  return warnings;
};

export default reduxForm({
  initialValues: { type: "login" },
  enableReinitialize: true,
  form: "loginVerification",
  validate: validate,
  warn: warn,
})(withStyles(styles)(Login));
