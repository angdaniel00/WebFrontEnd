import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getDesaprobados} from '../../../actions/students';
import {TableAllStudents} from '../../views/utils/TableAllStudent';
import {DES_STUDENTS} from '../../util/constants';

export class DesStudent extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        courses: PropTypes.array.isRequired,
        students: PropTypes.array.isRequired,
        selected: PropTypes.object.isRequired,
        getDesaprobados: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getDesaprobados(this.props.courseSelect);
    }

    render() {
        return (
            <Fragment>
                <TableAllStudents type={DES_STUDENTS} events={this.props} students={this.props.students} admin={false}/>
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

export default connect(mapStateToProps,{getDesaprobados})(DesStudent);