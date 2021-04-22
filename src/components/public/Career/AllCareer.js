import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCareers, getCareersCourse} from '../../../actions/career';

export class AllCareer extends Component {

    static propTypes={
        selectCareer: PropTypes.number.isRequired,
        careers: PropTypes.array.isRequired,
        courseSelect: PropTypes.number.isRequired,
        getCareers: PropTypes.func.isRequired,
        getCareersCourse: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getCareersCourse(this.props.courseSelect);
    }

    render() {
        return (
            <Fragment>All career</Fragment>
        );
    }
}

const mapStateToProps = state => ({
    selectCareer: state.career.selectCareer,
    careers: state.career.careers,
    courseSelect: state.course.courseSelect
});

export default connect(mapStateToProps,{getCareers, getCareersCourse})(AllCareer);