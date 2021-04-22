import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTicketsCourse, getTickets, getTicketStudent, addTicket, updateTicket, deleteTicket} from '../../actions/ticket';

export class PTickets extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        tickets: PropTypes.array.isRequired,
        ticketSelect: PropTypes.number.isRequired,
        getTicketsCourse: PropTypes.func.isRequired,
        getTickets: PropTypes.func.isRequired,
        getTicketStudent: PropTypes.func.isRequired,
        addTicket: PropTypes.func.isRequired,
        updateTicket: PropTypes.func.isRequired,
        deleteTicket: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getTicketsCourse(this.props.courseSelect);
    }

    render() {
        return (
            <Fragment></Fragment>
        );
    }
}

const mapStateToProps = state => ({
    tickets: state.ticket.tickets,
    ticketSelect: state.ticket.ticketSelect,
    courseSelect: state.course.courseSelect
});

export default connect(mapStateToProps,{getTicketsCourse, getTickets, getTicketStudent, addTicket, updateTicket, deleteTicket})(PTickets);