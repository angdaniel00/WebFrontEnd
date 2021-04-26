import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getStudents, getStudentsAllCourse,addStudent, updateStudent, deleteStudent} from '../../actions/students';
import {TableAllStudents} from '../views/utils/TableAllStudent';
import {ALL_STUDENTS} from '../util/constants'

export class PStudent extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        courses: PropTypes.array.isRequired,
        students: PropTypes.array.isRequired,
        selected: PropTypes.number.isRequired,
        getStudents: PropTypes.func.isRequired,
        getStudentsAllCourse: PropTypes.func.isRequired,
        addStudent: PropTypes.func.isRequired,
        updateStudent: PropTypes.func.isRequired,
        deleteStudent: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getStudentsAllCourse(this.props.courseSelect);
    }

    render() {
        return (
            <Fragment>
                <TableAllStudents type={ALL_STUDENTS} events={this.props} students={this.props.students} admin={true}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    courses: state.course.courses,
    courseSelect: state.course.courseSelect,
    students: state.students.students,
    selected: state.students.selected
});

export default connect(mapStateToProps,{getStudents, getStudentsAllCourse,addStudent, updateStudent, deleteStudent})(PStudent);