import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCareerDisp} from '../../../actions/career';

export class DispCareer extends Component {

    static propTypes={
        selectCareer: PropTypes.number.isRequired,
        careers: PropTypes.array.isRequired,
        courseSelect: PropTypes.number.isRequired,
        getCareerDisp: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getCareerDisp(this.props.courseSelect);
    }

    render() {
        return (
            <Fragment></Fragment>
        );
    }
}

const mapStateToProps = state => ({
    selectCareer: state.career.selectCareer,
    careers: state.career.careers,
    courseSelect: state.course.courseSelect
});

export default connect(mapStateToProps,{getCareerDisp})(DispCareer);