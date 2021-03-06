import React, { Fragment, useState } from 'react';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import '../css/dialogcreate.css';

export const DialogCreateCareer = ({addCareerD, visible, hide, courses}) => {

    const [career, setCareer] = useState({
        id: null,
        name: '',
        course: null,
        university: '',
        cant: null,
        disp: null,
        description: '',
        corte: -1
    })
    const [invalidCourse, setInvalidCourse] = useState(false)
    const [invalidName, setInvalidName] = useState(false)
    const [invalidUniversity, setInvalidUniversity] = useState(false)
    const [invalidCant, setInvalidCant] = useState(false)
    const [invalidDescription, setInvalidDescription] = useState(false)
    const {course} = career

    const addCareer = (event)=>{
        if(validCareer()){
            career.disp=career.cant
            addCareerD(career)
            setCareer({
                id: null,
                name: '',
                course: null,
                university: '',
                cant: null,
                disp: null,
                description: '',
                corte: -1
        })
        }
    }

    const onChange = e => {
        const ca = career
        const value = e.target.value
        const name = e.target.name
        switch(name){
            case 'course':
                setInvalidCourse(!(value && value!==''))
                break
            case 'name':
                setInvalidName(!(value && value!==''))
                break
            case 'university':
                setInvalidUniversity(!(value && value!==''))
                break
            case 'cant':
                setInvalidCant(!(value && value!=='' && value>0))
                break
            case 'description':
                setInvalidDescription(!(value && value!==''))
                break
            default:
                break
        }
        ca[name]=value
        setCareer(ca)
    }

    const validCareer = () =>{
        const{name, cant, description, course, university}=career
        setInvalidCourse(!(course && course!==''))
        setInvalidName(!(name && name!==''))
        setInvalidUniversity(!(university && university!==''))
        setInvalidCant(!(cant && cant!=='' && cant>0))
        setInvalidDescription(!(description && description!==''))
        return (name && name.length>0 && university && university.length>0 && course && cant && cant!=='' && cant>0 &&
        description && description.length>0);
    }

    const hidenDialog = () =>{
        setInvalidCourse(false)
        setInvalidName(false)
        setInvalidUniversity(false)
        setInvalidCant(false)
        setInvalidDescription(false)
        hide()
    }

    return (
        <Fragment>
            <Dialog visible={visible} onHide={hidenDialog} header='A&ntilde;adir carrera'>
                <label className='element-custom'>Curso</label>
                <Dropdown optionLabel='cyear' className={invalidCourse?'p-invalid':''} optionValue="id" value={course} onChange={onChange} name='course' options={courses} placeholder='Curso'/>
                <label className='element-custom'>Nombre</label>
                <InputText onChange={onChange} className={invalidName?'element-custom p-invalid':'element-custom'} name='name' placeholder='Nombre'/>
                <label className='element-custom'>Universidad</label>
                <InputText onChange={onChange} className={invalidUniversity?'element-custom p-invalid':'element-custom'} name='university' placeholder='Universidad'/>
                <label className='element-custom'>Cantidad</label>
                <InputText type='number' onChange={onChange} className={invalidCant?'element-custom p-invalid':'element-custom'} min={0} name='cant' placeholder='Cantidad'/>
                <label className='element-custom'>Descripci&oacute;n</label>
                <InputTextarea onChange={onChange} className={invalidDescription?'element-custom p-invalid':'element-custom'} name='description' placeholder='Descripci&oacute;n'/>
                <Button label='Guardar' icon='pi pi-save' onClick={addCareer}/>
            </Dialog>
        </Fragment>
    )
}