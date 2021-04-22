import React, { Component, Fragment } from 'react';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import './css/dialogcreate.css';

export class DialogCreate extends Component {

    state={
        id: null,
        course: null,
        name: '',
        scholl: '',
        acpre: null,
        math: -1,
        spanish: -1,
        history: -1,
        noteFinal: -1
    }

    addStudentD = (event)=>{
        if(this.validStudent())
            this.props.addStudentD(this.state)
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    validStudent = () =>{
        const{name, course, school, acpre}=this.state
        return (name.length>0 && school.length>0 && course!==null && acpre!==null && acpre!=='' && acpre>=0 && acpre<=100);
    }

    render() {
        return (
            <Fragment>
                <Dialog visible={this.props.visible} onHide={this.props.hide} header='A&ntilde;adir estudiante'>
                    <label className='element-custom'>Curso</label>
                    <Dropdown optionLabel='cyear' optionValue="id" value={this.state.course} onChange={this.onChange} name='course' options={this.props.courses} placeholder='Curso'/>
                    <label className='element-custom'>Nombre</label>
                    <InputText onChange={this.onChange} className='element-custom' name='name' placeholder='Nombre'/>
                    <label className='element-custom'>Escuela</label>
                    <InputText onChange={this.onChange} className='element-custom' name='school' placeholder='Escuela'/>
                    <label className='element-custom'>Acumulado pre</label>
                    <InputText type='number' onChange={this.onChange} className='element-custom' min={0} max={100} name='acpre' placeholder='Acumulado'/>
                    <Button label='Guardar' icon='pi pi-save' onClick={this.addStudentD}/>
                </Dialog>
            </Fragment>
        );
    }
}