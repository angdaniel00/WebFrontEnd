import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getEscalafon} from '../../../actions/students';
import {TableAllStudents} from '../../views/utils/TableAllStudent';
import {ESCALAFON} from '../../util/constants';

export class EscStudents extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        courses: PropTypes.array.isRequired,
        students: PropTypes.array.isRequired,
        getEscalafon: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getEscalafon(this.props.courseSelect);
    }

    render() {
        return (
            <Fragment>
                <TableAllStudents type={ESCALAFON} events={this.props} students={this.props.students} admin={false}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    courseSelect: state.course.courseSelect,
    courses: state.course.courses,
    students: state.students.students
});

export default connect(mapStateToProps,{getEscalafon})(EscStudents);