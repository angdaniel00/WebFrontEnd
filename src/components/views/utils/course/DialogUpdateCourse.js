import React, { Fragment, useRef, useState } from 'react';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';
import '../css/dialogcreate.css';

export const DialogUpdateCourse = ({updateCourseD, getActual, visible, hiden, actual, courses}) => {

    const ref = useRef(null)

    const [invalidCourse, setInvalidCourse] = useState(false)

    const showToast = () =>{
        ref.current.show({severity: 'warn', summary:'Error', detail:'Curso ya existente', life:2000})
    }

    const updateCourse = (event)=>{
        if(validCourse()){
            updateCourseD(actual)
            getActual()
        }
        else{
            setInvalidCourse(true)
        }
    }

    const onChange = e => {
        actual.cyear=(!e.target.valueAsNumber || e.target.valueAsNumber==='NaN')?null:(e.target.valueAsNumber+'-'+(e.target.valueAsNumber+1))
        setInvalidCourse(!actual.cyear)
    }

    const validCourse = () =>{
        const toast = courses.some(c=>c.cyear===actual.cyear)
        if(toast)
            showToast()
        const sp = actual.cyear.split('-')
        return actual.cyear!=='NaN-NaN' && sp && sp[0] >= 2018 && !toast
    }

    const hidenDialog = () =>{
        setInvalidCourse(false)
        hiden()
    }

    return (
        <Fragment>
            <Toast ref={ref} onRemove={()=>ref.current.clear()}/>
            <Dialog visible={visible} onHide={hidenDialog} header='Actualizar curso'>
                <label className='block'>Curso: {actual.cyear}</label>
                <label className='element-custom'>A&ntilde;o de inicio</label>
                <InputText type='number' onChange={onChange} defaultValue={actual.cyear?actual.cyear.split('-')[0]:null} className={invalidCourse?'element-custom p-invalid':'element-custom'} min={2018} max={2100} step={1} requiered={true} name='initial' placeholder='A&ntilde;o de inicio'/>
                <Button label='Guardar' icon='pi pi-save' onClick={updateCourse}/>
            </Dialog>
        </Fragment>
    )
}