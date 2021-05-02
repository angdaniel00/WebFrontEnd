import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCourses, addCourse, updateCourse, deleteCourse, getActual} from '../../actions/course';
import {AllCourses} from '../views/utils/course/AlllCourse';

export class PCourse extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        courses: PropTypes.array.isRequired,
        getActual: PropTypes.func.isRequired,
        getCourses: PropTypes.func.isRequired,
        addCourse: PropTypes.func.isRequired,
        updateCourse: PropTypes.func.isRequired,
        deleteCourse: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getCourses();
    }

    render() {
        return (
            <Fragment>
                <AllCourses events={this.props} courses={this.props.courses}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    courses: state.course.courses,
    courseSelect: state.course.courseSelect
});

export default connect(mapStateToProps,{getCourses, addCourse, updateCourse, deleteCourse, getActual})(PCourse);