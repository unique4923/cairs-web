import React, { Component } from 'react';
import { HashRouter, Route, Switch, NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import {AppBar, MenuItem, Drawer, IconButton} from 'material-ui';
import { Link } from 'react-router-dom';
import { nextMenu } from '../actions/MenuActions';


//svg icon imports
import { ActionHome, NavigationClose } from 'material-ui/svg-icons';



class NavDrawer extends Component {
  /*
  PROPS
  open: bool
  menu: object
  */

  renderMainMenu = () => {
    const { menu } = this.props;
    if (this.props.menu) {
      const menuComponent = menu.map((menuItem, index) => 
      <MenuItem key={index} onClick={() => this.navigate(menuItem)} primaryText={menuItem.Caption} />
    );
      return menuComponent;
    }
    return null;
  }

  navigate = (menu) => {
    const { menuHash, currentMenu, menuBreadCrumbs } = this.props;
    this.props.close();
    this.props.nextMenu(menu, menuHash, currentMenu, menuBreadCrumbs);
  }

  renderAppBar = () => (
    <AppBar 
      title="Navigation"
      iconElementLeft={<IconButton><NavigationClose /></IconButton>}
      onLeftIconButtonClick={this.props.close}
    />
  )

  render = () => {
    return (
      <div>
        <Drawer
          open={this.props.open}
        >
          {this.renderAppBar()}
          {this.renderMainMenu()}
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    menuHash,
    currentMenu,
    menuBreadCrumbs
  } = state.menu;
  return {
    menuHash,
    currentMenu,
    menuBreadCrumbs
  };
}

export default connect(mapStateToProps, {
  nextMenu
})(NavDrawer);
