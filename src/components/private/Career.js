import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCareersCourse, getCareerDisp, addCareer, deleteCareer, updateCareer} from '../../actions/career';
import {TableCareer} from '../views/utils/career/TableCareer';
import {ALL_CAREERS} from '../util/constants';

export class PCareer extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        courses: PropTypes.array.isRequired,
        careers: PropTypes.array.isRequired,
        getCareersCourse: PropTypes.func.isRequired,
        getCareerDisp: PropTypes.func.isRequired,
        addCareer: PropTypes.func.isRequired,
        deleteCareer: PropTypes.func.isRequired,
        updateCareer: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getCareersCourse(this.props.courseSelect);
    }

    render() {
        return (
            <Fragment>
                <TableCareer type={ALL_CAREERS} events={this.props} careers={this.props.careers} admin={true}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    careers: state.career.careers,
    courses: state.course.courses,
    courseSelect: state.course.courseSelect
});

export default connect(mapStateToProps,{getCareersCourse, getCareerDisp, addCareer, deleteCareer, updateCareer})(PCareer);