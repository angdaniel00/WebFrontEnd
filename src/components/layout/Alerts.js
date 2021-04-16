import React, { Component, Fragment } from 'react';
import {withAlert} from 'react-alert';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {

    constructor(props){
        super(props);
        withAlert(this);
    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps){
        const {error, alert, message} = this.props;
        if(error !== prevProps.error){
            if(error.msg.name){
                //alert.error("Name: "+ error.msg.name.join());
                console.log(alert)
            }
            if(error.msg.email){
                //alert.error("Email: "+error.msg.email.join());
                console.log(alert)
            }
            if(error.msg.message){
                //alert.error("Message: "+error.msg.message.join());
                console.log(alert)
            }
        }

        if(message !== prevProps.message){
            if(message.deleteLead){
                alert.success(message.deleteLead)
            }
            if(message.addLead){
                alert.success(message.addLead)
            }
        }
    }

    render() {
        return (
            <Fragment/>
        )
    }
}

const mapStateToProps = state=> ({
    error: state.errors,
    message: state.messages
})

export default connect(mapStateToProps)(Alerts);
