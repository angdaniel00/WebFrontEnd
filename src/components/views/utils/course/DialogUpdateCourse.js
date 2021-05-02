import React, { Fragment, useRef } from 'react';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';
import '../css/dialogcreate.css';

export const DialogUpdateCourse = ({updateCourseD, getActual, visible, hiden, actual, courses}) => {

    const ref = useRef(null)

    const showToast = () =>{
        ref.current.show({severity: 'warn', summary:'Error', detail:'Curso ya existente', life:2000})
    }

    const updateCourse = (event)=>{
        if(validCareer()){
            updateCourseD(actual)
            getActual()
        }
    }

    const onChange = e => {
        actual.cyear=e.target.valueAsNumber==='NaN'?null:(e.target.valueAsNumber+'-'+(e.target.valueAsNumber+1))
    }

    const validCareer = () =>{
        const toast = courses.some(c=>c.cyear===actual.cyear)
        if(toast)
            showToast()
        const sp = actual.cyear.split('-')
        return actual.cyear!=='NaN-NaN' && sp && sp[0] >= 2018 && !toast
    }

    return (
        <Fragment>
            <Toast ref={ref} onRemove={()=>ref.current.clear()}/>
            <Dialog visible={visible} onHide={hiden} header='Actualizar curso'>
                <label className='block'>Curso: {actual.cyear}</label>
                <label className='element-custom'>A&ntilde;o de inicio</label>
                <InputText type='number' onChange={onChange} defaultValue={actual.cyear.split('-')[0]} className='element-custom' min={2018} max={2100} step={1} requiered={true} name='initial' placeholder='A&ntilde;o de inicio'/>
                <Button label='Guardar' icon='pi pi-save' onClick={updateCourse}/>
            </Dialog>
        </Fragment>
    )
}