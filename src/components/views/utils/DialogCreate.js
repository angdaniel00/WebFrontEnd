import React, { Fragment, useState } from 'react';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import './css/dialogcreate.css';

export const DialogCreate = ({addStudentD, visible, hide, courses}) => {

    const [student, setStudent] = useState({
        id: null,
        course: null,
        name: '',
        scholl: '',
        acpre: null,
        math: -1,
        spanish: -1,
        history: -1,
        noteFinal: -1
    })
    const [invalidCourse, setInvalidCourse] = useState(false)
    const [invalidName, setInvalidName] = useState(false)
    const [invalidSchool, setInvalidSchool] = useState(false)
    const [invalidAcpre, setInvalidAcpre] = useState(false)

    const addStudent = (event)=>{
        if(validStudent()){
            addStudentD(student)
            setStudent({
                id: null,
                course: null,
                name: '',
                scholl: '',
                acpre: null,
                math: -1,
                spanish: -1,
                history: -1,
                noteFinal: -1
        })
        }
    }

    const onChange = e => {
        const st = student
        const name = e.target.name
        const value = e.target.value
        switch(name){
            case 'course':
                setInvalidCourse(!value)
                break
            case 'name':
                setInvalidName(!(value && value.length>0))
                break
            case 'school':
                setInvalidSchool(!(value && value.length>0))
                break
            case 'acpre':
                setInvalidAcpre(!(value && value!=='' && value>=0 && value<=100))
                break
            default:
                break
        }
        st[e.target.name]=e.target.value
        setStudent(st)
    }

    const validStudent = () =>{
        const{name, school, course, acpre}=student
        setInvalidCourse(!course)
        setInvalidName(!(name && name.length>0))
        setInvalidSchool(!(school &&school.length>0))
        setInvalidAcpre(!(acpre && acpre!=='' && acpre>=0 && acpre<=100))
        return (name && name.length>0 && school && school.length>0 && course && acpre && acpre!=='' && acpre>=0 && acpre<=100);
    }

    const hideDialog = () =>{
        setInvalidCourse(false)
        setInvalidName(false)
        setInvalidSchool(false)
        setInvalidAcpre(false)
        hide()
    }

    return (
        <Fragment>
            <Dialog visible={visible} onHide={hideDialog} header='A&ntilde;adir estudiante'>
                <label className='element-custom'>Curso</label>
                <Dropdown optionLabel='cyear' optionValue="id" className={invalidCourse?'p-invalid':''} value={student.course} onChange={onChange} name='course' options={courses} placeholder='Curso'/>
                <label className='element-custom'>Nombre</label>
                <InputText onChange={onChange} className={invalidName?'element-custom p-invalid':'element-custom'} name='name' placeholder='Nombre'/>
                <label className='element-custom'>Escuela</label>
                <InputText onChange={onChange} className={invalidSchool?'element-custom p-invalid':'element-custom'} name='school' placeholder='Escuela'/>
                <label className='element-custom'>Acumulado pre</label>
                <InputText type='number' onChange={onChange} className={invalidAcpre?'element-custom p-invalid':'element-custom'} min={0} max={100} name='acpre' placeholder='Acumulado'/>
                <Button label='Guardar' icon='pi pi-save' onClick={addStudent}/>
            </Dialog>
        </Fragment>
    )
}