import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMenus } from '../actions/MenuActions';
import logo from '../content/seal.svg';
import { FlatButton, Dialog } from 'material-ui';
import Menu from '../screens/Menu';
import {Switch, Route, Link} from 'react-router-dom';
import { Red } from 'material-ui/styles'

class DODWarning extends Component {
    
    state = {
        openDialog: false
    };

    actions = [
        <FlatButton 
            label="Okay"
            primary={true}
            onClick={() => this.setState({ openDialog: false })}
        />
    ];

    componentDidMount = () => {
        this.props.fetchMenus(this.props.currentMenuKey);
    }

    handleClose = () => {
        debugger;
        this.setState({ openDialog: false });
    }

    renderDeclineDialog = () => (
        <Dialog 
            title="Access Denied"
            actions={this.actions}
            model={false}
            open={this.state.openDialog}
            onRequestClose={this.handleClose}
        >
            You must accept this agreement to gain access to CAIRS.
        </Dialog>
    );

    renderMessage = () => (
        <div style={styles.bordersAround}>
            <p style={styles.messageStyle}>
                    This is a Department of Defense computer system. This computer system, including all related equipment, 
                networks and network devices (specifically including Internet access), are provided only for authorized 
                U.S. Government use. DoD computer systems may be monitored for all lawful purposes, including to ensure 
                that their use is authorized, for management of the system, to facilitate protection against unauthorized 
                access, and to verify security procedures, survivability and operational security. Monitoring includes 
                active attacks by authorized DoD entities to test or verify the security of this system. During monitoring, 
                information may be examined, recorded, copied and used for authorized purposes. All information, 
                including personal information, placed on or sent over this system may be monitored. Use of this DoD computer system,
                authorized or unauthorized, constitutes consent to monitoring of this system. Unauthorized use may subject you to
                criminal prosecution. Evidence of unauthorized use collected during monitoring may be used for administrative, 
                criminal or adverse action. Use of this system constitutes consent to monitoring for these purposes.
            </p>
        </div>
    );

    renderActions = () => (
        <div style={styles.row}>
            <Link to="/MainMenu" replace>
                <FlatButton 
                    label="Accept" 
                    primary
                />
            </Link>
            <FlatButton 
                label="Decline" 
                secondary
                onClick={() => this.setState({ openDialog: true })}
            />
        </div>
    )

    render = () => {
        return (
            <div style={styles.center}>
                <h1 style={styles.marginTop}><b>DoD Warning Message</b></h1>
                <img src={logo} width="200px" height="200px" />
                {this.renderMessage()}
                {this.renderActions()}
                {this.renderDeclineDialog()}
            </div> 
        );
    }
}

const styles ={
    center: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    marginTop: {
        marginTop: '20px'
    },
    bordersAround: {
        borderBottomWidth: '1px',
        borderTopWidth: '1px',
        borderRightWidth: '0px',
        borderLeftWidth: '0px',
        borderStyle: 'solid',
        borderColor: 'grey',
        flex: 1,
        marginTop: '30px',
        marginLeft: '200px',
        marginRight: '200px'
    },
    messageStyle: {
        paddingTop: '15px',
        paddingBotton: '15px'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '20px',
        width: window.innerWidth / 6
    },
    buttonStyle: {
        
    }
};

const mapStateToProps = (state) => {
    const { currentMenuKey } = state.menu;
    return { currentMenuKey };
}

export default connect(mapStateToProps, {
    fetchMenus
})(DODWarning);