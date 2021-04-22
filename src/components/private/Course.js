import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCourses, getCourse, getCoursesLike, addCourse, updateCourse, deleteCourse} from '../../actions/course';

export class PCourse extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        courses: PropTypes.array.isRequired,
        getCourses: PropTypes.func.isRequired,
        getCourse: PropTypes.func.isRequired,
        getCoursesLike: PropTypes.func.isRequired,
        addCourse: PropTypes.func.isRequired,
        updateCourse: PropTypes.func.isRequired,
        deleteCourse: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getCourses();
    }

    render() {
        return (
            <Fragment></Fragment>
        );
    }
}

const mapStateToProps = state => ({
    courses: state.course.courses,
    courseSelect: state.course.courseSelect
});

export default connect(mapStateToProps,{getCourses, getCourse, getCoursesLike, addCourse, updateCourse, deleteCourse})(PCourse);