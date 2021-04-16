import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getStudents, deleteStudent} from'../../actions/students';

export class Leads extends Component {
    static propTypes = {
        students: PropTypes.array.isRequired, 
        getStudents: PropTypes.func.isRequired,
        deleteStudent: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getStudents();
    }

    render() {
        return (
            <Fragment>
                <h2>Leads</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.students.map(
                            lead => (
                                <tr key={lead.id}>
                                    <td>{lead.id}</td>
                                    <td>{lead.name}</td>
                                    <td>{lead.email}</td>
                                    <td>{lead.message}</td>
                                    <td>
                                        <button onClick={this.props.deleteStudent.bind(this, lead.id)} className="btn btn-danger btn-sm">Delete</button>
                                        </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    students: state.students.students
});

export default connect(mapStateToProps, { 
    getStudents,
    deleteStudent
})(Leads);
