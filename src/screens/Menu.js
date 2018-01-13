import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, MenuItem, Divider } from 'material-ui';
import NavDrawer from '../navigators/NavDrawer';
import { fetchMenus, nextMenu, prevMenu } from '../actions/MenuActions';
import { grey800 } from 'material-ui/styles/colors';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

class Menu extends Component {

    state = {
        drawerOpen: false
    };

    componentDidMount = () => {
        this.props.fetchMenus();
    }

    rendeAppBar = () => (
        <AppBar 
            title="CAIRS" 
            zDepth={2}
            onLeftIconButtonClick={() => this.setState({ drawerOpen: true })} 
        />
    );

    renderDrawer = () => (
        <NavDrawer 
            open={this.state.drawerOpen}
            menu={this.props.mainMenuChildren}
            close={() => this.setState({ drawerOpen: false })}
        />
    );

    renderMenu = () => {
        const { currentMenuChildren, menuHash, currentMenu, menuBreadCrumbs } = this.props;
        const menu = currentMenuChildren.map((menu, index) => 
            <MenuItem key={index} onClick={() => this.props.nextMenu(menu, menuHash, currentMenu, menuBreadCrumbs)}>
                <h5>{`${index + 1}. ${menu.Caption}`}</h5>
                <p>{menu.Description}</p>
            </MenuItem>
        );
        return (
            <div style={styles.menu}>
                <div style={styles.justifyLeft}>
                    {menu}
                </div>
            </div>
        );
    }

    renderBreadCrumbs = () => {
        const { menuBreadCrumbs, menuHash, currentMenu } = this.props;
        const breadCrumbs = menuBreadCrumbs.map((crumb, index) => 
            <MenuItem 
                key={index} 
                primaryText={`${crumb.Caption} >`} 
                onClick={() => this.props.prevMenu(crumb, index, menuHash, menuBreadCrumbs)} 
            />
        );
        return (
            <div style={styles.breadCrumbContainer}>
                {breadCrumbs}
                <MenuItem 
                    primaryText={`${currentMenu.Caption} >`}
                />
            </div>
        )
    }

    render = () => (
        <div style={{ backgroundColor: grey800 }}>
            {this.rendeAppBar()}
            {this.renderDrawer()}
            {this.renderBreadCrumbs()}
            {this.renderMenu()}
        </div>
    );
}

const mapStateToProps = (state) => {
    const { 
        currentMenuChildren, 
        currentMenu,

        mainMenu,
        mainMenuChildren,

        menuBreadCrumbs,
        menuHash,  
    } = state.menu;
    return {
        currentMenuChildren, 
        currentMenu,

        mainMenu,
        mainMenuChildren,

        menuBreadCrumbs,
        menuHash,  
    };
}

const styles = {
    menu: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    justifyLeft: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    breadCrumbContainer: {
        width: SCREEN_WIDTH,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
}


export default connect(mapStateToProps, { fetchMenus, nextMenu, prevMenu })(Menu);