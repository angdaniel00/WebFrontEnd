import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getDesaprobados} from '../../../actions/students';

export class DesStudent extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        students: PropTypes.array.isRequired,
        selected: PropTypes.number.isRequired,
        getDesaprobados: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getDesaprobados(this.props.courseSelect);
    }

    render() {
        return (
            <Fragment>Desaprobados</Fragment>
        );
    }
}

const mapStateToProps = state => ({
    courseSelect: state.course.courseSelect,
    students: state.students.students,
    selected: state.students.selected
});

export default connect(mapStateToProps,{getDesaprobados})(DesStudent);