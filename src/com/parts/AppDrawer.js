import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import {Avatar, AppBar, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from "@material-ui/core"
import {MoveToInbox as InboxIcon, Mail as MailIcon, Menu as MenuIcon} from "@material-ui/icons";
import { blue } from '@material-ui/core/colors';

import Variables from "../../lib/global/Variables";

const styles = theme => ({
  drawer: { [theme.breakpoints.up("sm")]: { width: window.drawerWidth, flexShrink: 0 } },
  menuButton: { marginRight: theme.spacing(2), [theme.breakpoints.up("sm")]: { display: "none" } },
  toolbar: theme.mixins.toolbar, drawerPaper: { width: window.drawerWidth },
  content: { flexGrow: 1, padding: theme.spacing(3) },
  blue : { backgroundColor: blue },
  avetarContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center'},
  avetar: { width: theme.spacing(7), height: theme.spacing(7), marginBottom: theme.spacing(1)},
});

class AppDrawer extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    console.log(Variables.UserLevel);
  }

  render() {
    const { classes } = this.props;

    const drawer = () => {  
        return (
        <div>        
          <Box className={classes.toolbar} p={1} mt={3} mb={3}>
              <Box className={classes.avetarContainer}>
                <Avatar className={classes.avetar}>N</Avatar>
              </Box>
              <Typography p={0} align="center"><strong>Username</strong></Typography>
              <Typography p={0} align="center"><small>usre@gmail.com</small></Typography>
          </Box>
          <Divider />
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      );
    }
  
    const nav = () => {    
        return (
        <div>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={this.props.open}
              onClose={this.props.onClose}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true /*Better open performance on mobile.*/ }}
            >
              {drawer()}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              {drawer()}
            </Drawer>
          </Hidden>
        </div>
      );
    }
    return (
      <div className={classes.root}>
        <nav className={classes.drawer}>{nav()}</nav>
      </div>
    );
  }
}

AppDrawer.propTypes = {
  container: PropTypes.any
};

export default (withStyles(styles)(AppDrawer));
