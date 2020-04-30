import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, useTheme, makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu } from "@material-ui/core";
import { AccountCircle, MailIcon, Notifications as NotificationsIcon, MoreVert as MoreIcon, Menu as MenuIcon, SettingsPowerRounded as LogoutIcon } from "@material-ui/icons";
import { NavLink, Link } from 'react-router-dom'

import AppDrawer from "./AppDrawer";
import NotificationPanel from "./NotificationPanel";

const drawerWidth = 250;
const notificationWidth = 350;

/**user styles**/
const styles = theme => ({
  appBar: {
    [theme.breakpoints.up("sm")]: { width: `calc(100% - ${drawerWidth}px)`, marginLeft: drawerWidth, position: "relative" },
    position: "fixed", top: 0, left: "auto", right: 0
  },
  grow: { flexGrow: 1 },
  menuButton: { [theme.breakpoints.up("sm")]: { display: "none" }, marginRight: theme.spacing(2) },
  title: { display: "block", [theme.breakpoints.up("sm")]: { display: "block" }, color: "#FFFFFF", textDecoration: "none" },
  link: { textDecoration: "none" },
  sectionDesktop: { display: "none", [theme.breakpoints.up("md")]: { display: "flex" } },
  sectionMobile: { display: "flex", [theme.breakpoints.up("md")]: { display: "none" } },
});

class Header extends Component
{
  constructor(props)
  {
    super(props);
    this.menuId = "primary-search-account-menu";
    this.mobileMenuId = "primary-search-account-menu-mobile";
    
    window.drawerWidth = drawerWidth;
    window.notificationWidth = notificationWidth;
  }

/*user menu open*/
  state = {
    mobileDrOpen : false,
    mobileNtOpen : false,
    isMenuOpen : false,
    isMobileMenuOpen : false
  }    

  /**mobile menu open*/
  handleMobileMenuOpen = () => { 
    this.setState ({ isMobileMenuOpen : true }); 
  };

  /**mobile menu close*/
  handleMobileMenuClose = () => { 
    this.setState ({ isMobileMenuOpen : false }); 
  };

  /**menu open */
  handleMenuOpen = () => { 
    console.log(122332);
    this.setState ({ isMenuOpen : true }); 
  };

  /**menu close */
  handleMenuClose = () => { 
    this.setState ({ isMenuOpen : false }); 
    this.handleMobileMenuClose();
  };

  /**drawer Toggle */
  handleDrawerToggle = () => { 
    this.setState ({ mobileDrOpen : !this.state.mobileDrOpen }); 
  };

  /**notification panel Toggle */
  handleNotificationToggle = () => { 
    this.setState ({ mobileNtOpen : !this.state.mobileNtOpen }); 
    this.handleMenuClose();
  };

  render() {
    const { classes } = this.props;

    const renderMenu = () => {
        return (
        <Menu
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={this.menuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.isMenuOpen}
          onClose={this.handleMenuClose} >
          <MenuItem>
            <NavLink className={classes.link} onClick={this.handleMenuClose} to="/account">
            <IconButton aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit" >
                <AccountCircle />
              </IconButton>
              Profile
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink className={classes.link} to="/logout">
            <IconButton aria-label="logout current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit" >
                <LogoutIcon />
              </IconButton>
              Logout
            </NavLink>
          </MenuItem>
        </Menu>
      );
    }  
    
    const renderMobileMenu = () => {    
        return(
        <Menu
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={this.mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.isMobileMenuOpen}
          onClose={this.handleMobileMenuClose} >
          <MenuItem onClick={this.handleNotificationToggle}>       
              <IconButton aria-label="notifications" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit" >
              <NotificationsIcon />
              </IconButton>
              Notifications
          </MenuItem>
          <MenuItem onClick={this.handleMobileMenuClose}>
            <NavLink className={classes.link} to="/account">
              <IconButton aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit" >
                <AccountCircle />
              </IconButton>
              Profile
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink className={classes.link} to="/logout">
              <IconButton aria-label="logout current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit" >
                <LogoutIcon />
              </IconButton>
              Logout
            </NavLink>
          </MenuItem>
        </Menu>
        );
    }
    
    return (
      <div>
        <AppDrawer width={drawerWidth} open={this.state.mobileDrOpen} onClose={this.handleDrawerToggle} />
        <div className={(classes.grow)}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer" onClick={this.handleDrawerToggle} >
                <MenuIcon />
              </IconButton>
              <Link to="/" className={classes.title + " " + "pacifico"} variant="h6" noWrap >
                Shilpa
              </Link>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton color="inherit" edge="end" aria-haspopup="true" onClick={this.handleNotificationToggle} >
                  <Badge /*badgeContent={17}*/ color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton edge="end" aria-label="account of current user" aria-controls={this.menuId} aria-haspopup="true" onClick={this.handleMenuOpen} color="inherit" >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-label="show more" aria-controls={this.mobileMenuId} aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit" >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu()}
          {renderMenu()}
        </div>
        <NotificationPanel width={notificationWidth} open={this.state.mobileNtOpen} onClose={this.handleNotificationToggle} />
      </div>
      );
  }
}

Header.propTypes = {
  container: PropTypes.any
};

export default (withStyles(styles)(Header));
