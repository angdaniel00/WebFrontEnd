import React, { Fragment } from 'react';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import './css/dialogcreate.css';

export const DialogUpdate = ({visible, hiden, student, updateStudentD, clean}) => {

    const updateStudent = (event)=>{
        if(validStudent()){
            updateStudentD(student)
            clean()
        }
    }

    const onChange = e => {
        student[e.target.name]= e.target.value;
    }

    const validStudent = () =>{
        const{name, school, acpre, math, spanish, history}=student
        return (name && name.length>0 && school &&school.length>0 && acpre && acpre!=='' && acpre>=0 && acpre<=100
        && (math || math==='' || math>=0 || math<=100) && (spanish || spanish==='' || spanish>=0 || spanish<=100) 
        && (history || history==='' || history>=0 || history<=100));
    }

    return (
        <Fragment>
            <Dialog visible={visible} onHide={hiden} header='Actualizar estudiante'>
                <label className='element-custom'>Nombre</label>
                <InputText onChange={onChange} className='element-custom' defaultValue={student.name} name='name' placeholder='Nombre'/>
                <label className='element-custom'>Escuela</label>
                <InputText onChange={onChange} className='element-custom' defaultValue={student.school} name='school' placeholder='Escuela'/>
                <label className='element-custom'>Acumulado pre</label>
                <InputText type='number' onChange={onChange} className='element-custom' defaultValue={student.acpre} min={0} max={100} name='acpre' placeholder='Acumulado'/>
                <label className='element-custom'>Matem&aacute;tica</label>
                <InputText type='number' onChange={onChange} className='element-custom' defaultValue={student.math} min={0} max={100} name='math' placeholder='Matem&aacute;tica'/>
                <label className='element-custom'>Espa&ntilde;ol</label>
                <InputText type='number' onChange={onChange} className='element-custom' defaultValue={student.spanish} min={0} max={100} name='spanish' placeholder='Espa&ntilde;ol'/>
                <label className='element-custom'>Historia</label>
                <InputText type='number' onChange={onChange} className='element-custom' defaultValue={student.history} min={0} max={100} name='history' placeholder='Historia'/>
                <Button label='Guardar' icon='pi pi-save' onClick={updateStudent}/>
            </Dialog>
        </Fragment>
    )
}