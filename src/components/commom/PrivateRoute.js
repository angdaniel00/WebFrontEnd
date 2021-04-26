import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute= ({component: Component, auth, type, ...rest}) => (
    <Route 
        {...rest}
        render={props =>{
            if(auth.isLoading){
                return <div className='center'><i className='pi pi-spin pi-spinner'></i><h2 className='inline'>Cargando...</h2></div>
            } else if(!auth.isAuthenticated && type==='private'){
                return <Redirect to="/login"/>
            } else{
                return<Component {...props}/>
            }
        }}
    />
)

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps) (PrivateRoute);