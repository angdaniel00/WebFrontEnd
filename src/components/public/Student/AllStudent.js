import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addStudent, updateStudent, deleteStudent, getStudents, getStudentsAllCourse} from '../../../actions/students';
import {TableAllStudents} from '../../views/utils/TableAllStudent'

export class AllStudents extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        students: PropTypes.array.isRequired,
        selected: PropTypes.number.isRequired,
        addStudent: PropTypes.func.isRequired,
        updateStudent: PropTypes.func.isRequired,
        deleteStudent: PropTypes.func.isRequired,
        getStudents: PropTypes.func.isRequired,
        getStudentsAllCourse: PropTypes.func.isRequired
    }

    componentWillMount(){
        this.props.getStudentsAllCourse(this.props.courseSelect);
    }

    render() {
        return (
            <Fragment>
                <TableAllStudents events={this.props} students={this.props.students} admin={false}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    courseSelect: state.course.courseSelect,
    students: state.students.students,
    selected: state.students.selected
});

export default connect(mapStateToProps,{addStudent, updateStudent,deleteStudent, getStudents, getStudentsAllCourse})(AllStudents);