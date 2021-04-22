import React, { Component, Fragment } from 'react';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import './css/dialogcreate.css';
//import {Dropdown} from 'primereact/dropdown';

export class DialogUpdate extends Component {

    componentWillMount(){
        console.log(this.props)
    }

    updateStudentD = (event)=>{
        if(this.validStudent())
            this.props.updateStudent(this.props.student)
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    validStudent = () =>{
        const{name, school, acpre, math, spanish, history}=this.props.student
        return (name.length>0 && school.length>0 && acpre!==null && acpre!=='' && acpre>=0 && acpre<=100
        && math!=='' && math>=0 && math<=100 && spanish!=='' && spanish>=0 && spanish<=100 && history!=='' && history>=0 && history<=100);
    }

    render() {

        /*
        <label className='element-custom'>Curso</label>
                    <Dropdown optionLabel='cyear' optionValue="id" value={this.state.course} onChange={this.onChange} name='course' options={this.props.courses} placeholder='Curso'/>
        */ 

        return (
            <Fragment>
                <Dialog visible={this.props.visible} onHide={this.props.hide} header='Actualizar estudiante'>
                    <label className='element-custom'>Nombre</label>
                    <InputText onChange={this.onChange} className='element-custom' defaultValue={this.props.student.name} name='name' placeholder='Nombre'/>
                    <label className='element-custom'>Escuela</label>
                    <InputText onChange={this.onChange} className='element-custom' defaultValue={this.props.student.school} name='school' placeholder='Escuela'/>
                    <label className='element-custom'>Acumulado pre</label>
                    <InputText type='number' onChange={this.onChange} className='element-custom' defaultValue={this.props.student.acpre} min={0} max={100} name='acpre' placeholder='Acumulado'/>
                    <label className='element-custom'>Matem&aacute;tica</label>
                    <InputText type='number' onChange={this.onChange} className='element-custom' defaultValue={this.props.student.math} min={0} max={100} name='math' placeholder='Matem&aacute;tica'/>
                    <label className='element-custom'>Espa&ntilde;ol</label>
                    <InputText type='number' onChange={this.onChange} className='element-custom' defaultValue={this.props.student.spanish} min={0} max={100} name='spanish' placeholder='Espa&ntilde;ol'/>
                    <label className='element-custom'>Historia</label>
                    <InputText type='number' onChange={this.onChange} className='element-custom' defaultValue={this.props.student.history} min={0} max={100} name='history' placeholder='Historia'/>
                    <Button label='Guardar' icon='pi pi-save' onClick={this.updateStudentD}/>
                </Dialog>
            </Fragment>
        );
    }
}