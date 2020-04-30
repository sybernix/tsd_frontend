import React from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    display: "flex",
    position: "relative",
    alignItems: "center"
  },
  notificationDrawer: {
    [theme.breakpoints.up("sm")]: {
      width: container.width,
      flexShrink: 0
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: container.width
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

let container = null;
function NotificationPanel(props) {
  container = props;
  const classes = useStyles();
  const drawer = (
    <div>
     <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </List>
    </div>
  );

  const nav = (
    <div>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={container.open}
          onClose={container.onClose}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="right"
          variant="temporary"
          open={container.open}
          onClose={container.onClose}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </div>
  );

  return (
    <div className={classes.root}>
      <nav className={classes.drawer}>{nav}</nav>
    </div>
  );
}

NotificationPanel.propTypes = {
  container: PropTypes.any
};

export default NotificationPanel;
