import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
import {Menubar} from 'primereact/menubar';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';

export class Header extends React.Component {

   static propTypes= {
       auth: PropTypes.object.isRequired,
       logout: PropTypes.func.isRequired
   }

   redirectPage=(path)=>{
       window.location.hash = path;
   }

    render() {

       const {isAuthenticated} = this.props.auth;

       const items=[
           {
               label:'Inicio',
               icon: 'pi pi-fw pi-home',
               command: (event)=>{this.redirectPage('/')}
           },
           {
               label: 'Estudiantes',
               icon: 'pi pi-fw pi-user',
               items:[
                   {
                       label: 'Todos',
                       icon:'pi pi-fw pi-users',
                       command: (event)=>{this.redirectPage('/allstudents')}
                   },
                   {
                        label: 'Curso',
                        icon:'pi pi-fw pi-calendar',
                        command: (event)=>{this.redirectPage('/coursestudents')}
                    },
                    {
                        label: 'Aprobados',
                        icon:'pi pi-fw pi-check',
                        command: (event)=>{this.redirectPage('/aprstudents')}
                    },
                    {
                        label: 'Desaprobados',
                        icon:'pi pi-fw pi-ban',
                        command: (event)=>{this.redirectPage('/desstudents')}
                    },
                    {
                        label: 'Otorgamiento',
                        icon:'pi pi-fw pi-book',
                        command: (event)=>{this.redirectPage('/otorstudents')}
                    },
                    {
                        label: 'Escalafón',
                        icon:'pi pi-fw pi-list',
                        command: (event)=>{this.redirectPage('/escalafon')}
                    }                
               ]
           },
           {
               label: 'Boletas',
               icon: 'pi pi-file',
               command: ()=>{
                   this.redirectPage('/tickets');
                }
           },
           {
               label:'Carreras',
               icon: 'pi pi-fw pi-book',
               items:[
                   {
                       label:'Todas',
                       icon: 'pi pi-book',
                       command: (event)=>{this.redirectPage('/allcareer')}
                   },
                   {
                    label:'Disponibles',
                    icon: 'pi pi-book',
                    command: (event)=>{this.redirectPage('/dispcareer')}
                }
               ]
           },
           {
               label:'Administración',
               icon:'pi pi-fw pi-user',
               className: isAuthenticated?"":"hidden",
               items:[
                   {
                       label: 'Carrera',
                       icon:'pi pi-book',
                       command: (event)=>{this.redirectPage('/private/career')}
                   },
                   {
                        label: 'Curso',
                        icon:'pi pi-calendar',
                        command: (event)=>{this.redirectPage('/private/course')}
                    },
                    {
                        label: 'Estudiantes',
                        icon:'pi pi-users',
                        command: (event)=>{this.redirectPage('/private/Student')}
                    },
                    {
                        label: 'Boletas',
                        icon:'pi pi-file',
                        command: (event)=>{this.redirectPage('/private/tickets')}
                    },
                    {
                        label: 'Cerrar sesión',
                        icon: 'pi pi-power-off',
                        command: (event)=>{this.props.logout()}
                    }
               ]
           }
       ]

       const look = (
           <div>
               <InputText className="input-search" placeholder="Buscar" type="text"/>
               <Button className="btn-search" icon='pi pi-search'/>
           </div>
       )

        return (
            <Menubar model={items}
                end={look}
            />
        )
    }
}

const mapStateToProps = state =>({
   auth: state.auth
})

export default withRouter(connect(mapStateToProps, {logout})(Header));
