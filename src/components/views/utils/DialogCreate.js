import React, { Fragment, useState } from 'react';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import './css/dialogcreate.css';
import {initialSelection} from './TableAllStudent';

export const DialogCreate = ({addStudentD, visible, hide, courses}) => {

    const [student, setStudent] = useState(initialSelection)

    const addStudent = (event)=>{
        if(validStudent()){
            addStudentD(student)
            setStudent(initialSelection)
        }
    }

    const onChange = e => {
        const st = student
        st[e.target.name]=e.target.value
        setStudent(st)
    }

    const validStudent = () =>{
        const{name, school, course, acpre}=student
        return (name && name.length>0 && school && school.length>0 && course && acpre && acpre!=='' && acpre>=0 && acpre<=100);
    }

    return (
        <Fragment>
            <Dialog visible={visible} onHide={hide} header='A&ntilde;adir estudiante'>
                <label className='element-custom'>Curso</label>
                <Dropdown optionLabel='cyear' optionValue="id" value={student.course} onChange={onChange} name='course' options={courses} placeholder='Curso'/>
                <label className='element-custom'>Nombre</label>
                <InputText onChange={onChange} className='element-custom' name='name' placeholder='Nombre'/>
                <label className='element-custom'>Escuela</label>
                <InputText onChange={onChange} className='element-custom' name='school' placeholder='Escuela'/>
                <label className='element-custom'>Acumulado pre</label>
                <InputText type='number' onChange={onChange} className='element-custom' min={0} max={100} name='acpre' placeholder='Acumulado'/>
                <Button label='Guardar' icon='pi pi-save' onClick={addStudent}/>
            </Dialog>
        </Fragment>
    )
}