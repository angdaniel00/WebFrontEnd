import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCareers, getCareersCourse} from '../../../actions/career';
import {TableCareer} from '../../views/utils/career/TableCareer';
import {ALL_CAREERS} from '../../util/constants';

export class AllCareer extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        courses: PropTypes.array.isRequired,
        careers: PropTypes.array.isRequired,
        getCareers: PropTypes.func.isRequired,
        getCareersCourse: PropTypes.func.isRequired,
    }

    componentDidMount(){
        this.props.getCareersCourse(this.props.courseSelect);
    }

    render() {
        return (
            <Fragment>
                <TableCareer careers={this.props.careers} events={this.props} admin={false} type={ALL_CAREERS}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    careers: state.career.careers,
    courseSelect: state.course.courseSelect,
    courses: state.course.courses
});

export default connect(mapStateToProps,{getCareers, getCareersCourse})(AllCareer);