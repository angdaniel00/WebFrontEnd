import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class StudentDetails extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        selected: PropTypes.object.isRequired
    }

    componentDidMount(){
        console.log(this)
    }

    render() {
        return (
            <Fragment>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    courseSelect: state.course.courseSelect,
    selected: state.students.selected
});

export default connect(mapStateToProps,{})(StudentDetails);