import React, { Fragment, useState } from 'react';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import './css/dialogcreate.css';

export const DialogUpdate = ({visible, hiden, student, updateStudentD, clean}) => {

    const [invalidName, setInvalidName] = useState(false)
    const [invalidSchool, setInvalidSchool] = useState(false)
    const [invalidAcpre, setInvalidAcpre] = useState(false)
    const [invalidMath, setInvalidMath] = useState(false)
    const [invalidSpanish, setInvalidSpanish] = useState(false)
    const [invalidHistory, setInvalidHistory] = useState(false)

    const updateStudent = (event)=>{
        if(validStudent()){
            updateStudentD(student)
            clean()
        }
    }

    const onChange = e => {
        const name = e.target.name
        const value = e.target.value
        switch(name){
            case 'name':
                setInvalidName(!(value && value.length>0))
                break
            case 'school':
                setInvalidSchool(!(value && value.length>0))
                break
            case 'acpre':
                setInvalidAcpre(!(value && value!=='' && value>=0 && value<=100))
                break
            case 'math':
                setInvalidMath(!((value && value>=0 && value<=100) || !value || value === ''))
                break
            case 'spanish':
                setInvalidSpanish(!((value && value>=0 && value<=100) || !value || value===''))
                break
            case 'history':
                setInvalidHistory(!((value && value>=0 && value<=100) || !value || value===''))
                break
            default:
                break
        }
        student[name]= value
    }

    const validStudent = () =>{
        const{name, school, acpre, math, spanish, history}=student
        setInvalidName(!(name && name.length>0))
        setInvalidSchool(!(school &&school.length>0))
        setInvalidAcpre(!(acpre && acpre!=='' && acpre>=0 && acpre<=100))
        setInvalidMath(!((math && math>=0 && math<=100) || !math || math === ''))
        setInvalidSpanish(!((spanish && spanish>=0 && spanish<=100) || !spanish || spanish===''))
        setInvalidHistory(!((history && history>=0 && history<=100) || !history || history===''))
        return (name && name.length>0 && school &&school.length>0 && acpre && acpre!=='' && acpre>=0 && acpre<=100
        && ((math && math>=0 && math<=100) || !math || math === '') && ((spanish && spanish>=0 && spanish<=100) || !spanish || spanish==='') 
        && ((history && history>=0 && history<=100) || !history || history===''));
    }

    const hideDialog = () =>{
        setInvalidName(false)
        setInvalidSchool(false)
        setInvalidAcpre(false)
        setInvalidMath(false)
        setInvalidSpanish(false)
        setInvalidHistory(false)
        hiden()
    }

    return (
        <Fragment>
            <Dialog visible={visible} onHide={hideDialog} header='Actualizar estudiante'>
                <label className='element-custom'>Nombre</label>
                <InputText onChange={onChange} className={invalidName?'element-custom p-invalid':'element-custom'} defaultValue={student.name} name='name' placeholder='Nombre'/>
                <label className='element-custom'>Escuela</label>
                <InputText onChange={onChange} className={invalidSchool?'element-custom p-invalid':'element-custom'} defaultValue={student.school} name='school' placeholder='Escuela'/>
                <label className='element-custom'>Acumulado pre</label>
                <InputText type='number' onChange={onChange} className={invalidAcpre?'element-custom p-invalid':'element-custom'} defaultValue={student.acpre} min={0} max={100} name='acpre' placeholder='Acumulado'/>
                <label className='element-custom'>Matem&aacute;tica</label>
                <InputText type='number' onChange={onChange} className={invalidMath?'element-custom p-invalid':'element-custom'} defaultValue={student.math} min={0} max={100} name='math' placeholder='Matem&aacute;tica'/>
                <label className='element-custom'>Espa&ntilde;ol</label>
                <InputText type='number' onChange={onChange} className={invalidSpanish?'element-custom p-invalid':'element-custom'} defaultValue={student.spanish} min={0} max={100} name='spanish' placeholder='Espa&ntilde;ol'/>
                <label className='element-custom'>Historia</label>
                <InputText type='number' onChange={onChange} className={invalidHistory?'element-custom p-invalid':'element-custom'} defaultValue={student.history} min={0} max={100} name='history' placeholder='Historia'/>
                <Button label='Guardar' icon='pi pi-save' onClick={updateStudent}/>
            </Dialog>
        </Fragment>
    )
}