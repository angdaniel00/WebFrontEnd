import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCareersCourse} from '../../actions/career';

export class CareerDetails extends Component {
    
    state = { career:null }

    static propTypes={
        selectCareer: PropTypes.number.isRequired,
        careers: PropTypes.array.isRequired,
        courseSelect: PropTypes.number.isRequired,
        getCareersCourse: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getCareersCourse(this.props.courseSelect);
        this.setState({career:this.props.careers[this.props.selectCareer]});
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

export default connect(mapStateToProps,{getCareersCourse})(CareerDetails);