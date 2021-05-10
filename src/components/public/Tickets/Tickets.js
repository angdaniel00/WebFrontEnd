import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {TableAllTickets} from '../../views/utils/ticket/AllTickets'
import {getTicketStudent, getTicketsCourse, getTickets} from '../../../actions/ticket';

export class Tickets extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        courses: PropTypes.array.isRequired,
        tickets: PropTypes.array.isRequired,
        getTicketStudent: PropTypes.func.isRequired,
        getTicketsCourse: PropTypes.func.isRequired,
        getTickets: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getTicketsCourse(this.props.courseSelect);
    }

    render() {
        return (
            <Fragment>
                <TableAllTickets admin={false} events={this.props} tickets={this.props.tickets}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    courseSelect: state.course.courseSelect,
    courses: state.course.courses,
    tickets: state.ticket.tickets
});

export default connect(mapStateToProps,{getTicketStudent, getTicketsCourse, getTickets})(Tickets);