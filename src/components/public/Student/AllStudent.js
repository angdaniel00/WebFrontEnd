import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addStudent, updateStudent, deleteStudent, getStudentsAllCourse, getStudent} from '../../../actions/students';
import {TableAllStudents} from '../../views/utils/TableAllStudent';
import {ALL_STUDENTS} from '../../util/constants';

export class AllStudents extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        courses: PropTypes.array.isRequired,
        students: PropTypes.array.isRequired,
        selected: PropTypes.object.isRequired,
        addStudent: PropTypes.func.isRequired,
        updateStudent: PropTypes.func.isRequired,
        deleteStudent: PropTypes.func.isRequired,
        getStudent: PropTypes.func.isRequired,
        getStudentsAllCourse: PropTypes.func.isRequired,
    }

    componentWillMount(){
        this.props.getStudentsAllCourse(this.props.courseSelect);
    }

    render() {
        return (
            <Fragment>
                <TableAllStudents type={ALL_STUDENTS} events={this.props} students={this.props.students} admin={false}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    courseSelect: state.course.courseSelect,
    courses: state.course.courses,
    students: state.students.students,
    selected: state.students.selected
});

export default connect(mapStateToProps,{addStudent, updateStudent,deleteStudent, getStudentsAllCourse, getStudent})(AllStudents);