import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {TableAllTickets} from '../views/utils/ticket/AllTickets';
import {getTicketsCourse, getTickets, getTicketStudent, addTicket, updateTicket, deleteTicket} from '../../actions/ticket';

export class PTickets extends Component {

    static propTypes={
        careers: PropTypes.array.isRequired,
        courseSelect: PropTypes.number.isRequired,
        courses: PropTypes.array.isRequired,
        tickets: PropTypes.array.isRequired,
        students: PropTypes.array.isRequired,
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
            <Fragment>
                <TableAllTickets students={this.props.students} admin={true} events={this.props} tickets={this.props.tickets} careers={this.props.careers}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    students: state.students.students,
    careers: state.career.careers,
    tickets: state.ticket.tickets,
    courseSelect: state.course.courseSelect,
    courses: state.course.courses
});

export default connect(mapStateToProps,{getTicketsCourse, getTickets, getTicketStudent, addTicket, updateTicket, deleteTicket})(PTickets);