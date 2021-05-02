import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import {Panel} from 'primereact/panel';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';
import './login.css'

export class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    failed = () =>{
        this.refs.current.show({severity: 'error', summary: 'Error', detail:'Credenciales incorrectos'})
    }

    onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        this.props.login(this.state.username, this.state.password, this.failed);
    }


    onChange = e => this.setState(
        { [e.target.name]: e.target.value }
    )

    render() {

        if(this.props.isAuthenticated){
            return <Redirect to="/"/>
        }

        return (
            <div>
                <Toast ref={this.refs} onRemove={()=>this.refs.current.clear()}/>
                <Panel header="Login" className='panel-custom'>
                    <label className='element-custom-l w-20'>Usuario</label>
                    <InputText  className='element-custom-l w-20' name='username' onChange={this.onChange}/>
                    <label className='element-custom-l w-20'>Contrase&ntilde;a</label>
                    <Password className='element-custom-l w-20' name='password' onChange={this.onChange} toggleMask={false} footer={null}/>
                    <Button className='element-custom-l btn' onClick={this.onSubmit} label="Login"/>
                </Panel>   
            </div>
        )
    }
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);
