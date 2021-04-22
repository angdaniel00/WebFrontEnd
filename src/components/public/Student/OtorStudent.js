import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getStudentsAllCourse} from '../../../actions/students';

export class OtorStudent extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        students: PropTypes.array.isRequired,
        selected: PropTypes.number.isRequired,
        getStudentsAllCourse: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getStudentsAllCourse(this.props.courseSelect);
    }

    render() {
        return (
            <Fragment></Fragment>
        );
    }
}

const mapStateToProps = state => ({
    courseSelect: state.course.courseSelect,
    students: state.students.students,
    selected: state.students.selected
});

export default connect(mapStateToProps,{getStudentsAllCourse})(OtorStudent);