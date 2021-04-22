import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTicketStudent, getTicketsCourse, getTickets} from '../../../actions/ticket';

export class Tickets extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        selected: PropTypes.number.isRequired,
        tickets: PropTypes.array.isRequired,
        ticketSelect: PropTypes.number.isRequired,
        getTicketStudent: PropTypes.func.isRequired,
        getTicketsCourse: PropTypes.func.isRequired,
        getTickets: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getTicketsCourse(this.props.courseSelect);
    }

    render() {
        return (
            <Fragment>tickets</Fragment>
        );
    }
}

const mapStateToProps = state => ({
    courseSelect: state.course.courseSelect,
    tickets: state.ticket.tickets,
    selected: state.students.selected,
    ticketSelect: state.ticket.ticketSelect
});

export default connect(mapStateToProps,{getTicketStudent, getTicketsCourse, getTickets})(Tickets);