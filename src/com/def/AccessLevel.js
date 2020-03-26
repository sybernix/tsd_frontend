import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid, TextField, Button, FormControlLabel, Checkbox } from "@material-ui/core";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import { Edit } from "@material-ui/icons"

import df_access_level from "../../class/data/df_access_level";
const styles = theme => ({
  form: { width: "100%", marginTop: theme.spacing(3) },
  table: { width: "100%" },
  submit: { padding: theme.spacing(2, 0, 2) },
  paper: { minWidth: 350, marginTop: theme.spacing(3) }
});

class AccessLevel extends Component {
  constructor(props) {
    super(props);
    console.log(new df_access_level());
  }

  rows = [
    new df_access_level()
  ];

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Typography component="h1" variant="h6" align="left">
            Add an Access Level
          </Typography>
        </div>

        <Grid container spacing={2}>
          <Grid item sm={12} lg={6}>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={8}>
                  <TextField autoComplete="level" name="level" variant="outlined" fullWidth id="level" label="Access Level" autoFocus />
                  <FormControlLabel id="is_admin" name="is_admin" control={<Checkbox value="is_admin" color="primary" />} label="Is Administratotr" />
                  <FormControlLabel id="is_active" name="is_active" control={<Checkbox value="is_active" color="primary" />} label="Active" />
                </Grid>
                <Grid item xs={12} sm={12} lg={4}>
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Save</Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
            <TableContainer component={Paper} className={classes.paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell component="th" align="left">Level</TableCell>
                    <TableCell component="th" align="right">Is Admin</TableCell>
                    <TableCell component="th" align="right">Cerated</TableCell>
                    <TableCell component="th" align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.rows.map(row => (
                    <TableRow key={row.name}>
                      <TableCell align="right">{row.level}</TableCell>
                      <TableCell align="right">{row.is_admin}</TableCell>
                      <TableCell align="right">{row.created_date}</TableCell>
                      <TableCell align="right"><Edit /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default reduxForm({
  form: "accessLevelForm"
})(withStyles(styles)(AccessLevel));
