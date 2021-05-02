import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCareerDisp} from '../../../actions/career';
import {TableCareer} from '../../views/utils/career/TableCareer';
import {DISP_CAREERS} from '../../util/constants';

export class DispCareer extends Component {

    static propTypes={
        courseSelect: PropTypes.number.isRequired,
        courses: PropTypes.array.isRequired,
        selectCareer: PropTypes.number.isRequired,
        careers: PropTypes.array.isRequired,
        getCareerDisp: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getCareerDisp(this.props.courseSelect);
    }

    render() {
        return (
            <Fragment>
                <TableCareer careers={this.props.careers} events={this.props} admin={false} type={DISP_CAREERS}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    selectCareer: state.career.selectCareer,
    careers: state.career.careers,
    courseSelect: state.course.courseSelect,
    courses: state.course.courses
});

export default connect(mapStateToProps,{getCareerDisp})(DispCareer);