import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAprobados} from '../../../actions/students';
import {TableAllStudents} from '../../views/utils/TableAllStudent';
import {APR_STUDENTS} from '../../util/constants';

export class AprStudent extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        courses: PropTypes.array.isRequired,
        students: PropTypes.array.isRequired,
        getAprobados: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getAprobados(this.props.courseSelect);
    }

    render() {
        return (
            <Fragment>
                <TableAllStudents type={APR_STUDENTS} events={this.props} students={this.props.students} admin={false}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    courseSelect: state.course.courseSelect,
    courses: state.course.courses,
    students: state.students.students
});

export default connect(mapStateToProps,{getAprobados})(AprStudent);