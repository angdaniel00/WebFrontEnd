import React, { Fragment, useState, useRef } from 'react';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';
import '../css/dialogcreate.css';

export const DialogCreateCourse = ({addCourseD, getActual, visible, hiden, coursesD}) => {

    const [course, setCourse] = useState({
        id: null,
        cyear:''
    })
    const [textLabel, setTextLabel] = useState('')
    const [invalidCourse, setInvalidCourse] = useState(false)
    const ref = useRef(null)

    const showToast = () =>{
        ref.current.show({severity: 'warn', summary:'Error', detail:'Curso ya existente', life:2000})
    }

    const addCourse = (event)=>{
        if(validCourse()){
            addCourseD(course.cyear)
            getActual()
            setCourse({
                id: null,
                cyear:''
            })
        }
        else{
            setInvalidCourse(true)
        }
    }

    const onChange = e => {
        const c = course
        c.cyear=e.target.valueAsNumber+'-'+(e.target.valueAsNumber+1)
        setInvalidCourse(c.cyear===''|| c.cyear==='NaN-NaN')
        setCourse(c)
        setTextLabel(course.cyear===''|| course.cyear==='NaN-NaN'?null:course.cyear)
    }

    const validCourse = () =>{
        const toast = coursesD.some(c=>c.cyear===course.cyear)
        if(toast)
            showToast()
        const sp = course.cyear.split('-')
        return course.cyear!=='NaN-NaN' && sp && sp[0] >= 2018 && !toast
    }

    const hidenDialog = () =>{
        setInvalidCourse(false)
        hiden()
    }

    return (
        <Fragment>
            <Toast ref={ref} onRemove={()=>ref.current.clear()}/>
            <Dialog visible={visible} onHide={hidenDialog} header='A&ntilde;adir curso'>
                <label>Curso: {textLabel}</label>
                <label className='element-custom'>A&ntilde;o de inicio</label>
                <InputText type='number' onChange={onChange} className={invalidCourse?'element-custom p-invalid':'element-custom'} min={2018} max={2100} step={1} requiered={true} name='initial' placeholder='A&ntilde;o'/>
                <Button label='Guardar' icon='pi pi-save' onClick={addCourse}/>
            </Dialog>
        </Fragment>
    )
}