import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAprobados} from '../../../actions/students';

export class AprStudent extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        students: PropTypes.array.isRequired,
        selected: PropTypes.number.isRequired,
        getAprobados: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getAprobados(this.props.courseSelect);
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

export default connect(mapStateToProps,{getAprobados})(AprStudent);