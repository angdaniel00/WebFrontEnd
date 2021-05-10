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
        ca[e.target.name]=e.target.value
        setCareer(ca)
    }

    const validCareer = () =>{
        const{name, cant, description, course, university}=career
        return (name && name.length>0 && university && university.length>0 && course && cant && cant!=='' && cant>=0 &&
        description && description.length>0);
    }

    return (
        <Fragment>
            <Dialog visible={visible} onHide={hide} header='A&ntilde;adir carrera'>
                <label className='element-custom'>Curso</label>
                <Dropdown optionLabel='cyear' optionValue="id" value={course} onChange={onChange} name='course' options={courses} placeholder='Curso'/>
                <label className='element-custom'>Nombre</label>
                <InputText onChange={onChange} className='element-custom' name='name' placeholder='Nombre'/>
                <label className='element-custom'>Universidad</label>
                <InputText onChange={onChange} className='element-custom' name='university' placeholder='Universidad'/>
                <label className='element-custom'>Cantidad</label>
                <InputText type='number' onChange={onChange} className='element-custom' min={0} name='cant' placeholder='Cantidad'/>
                <label className='element-custom'>Descripci&oacute;n</label>
                <InputTextarea onChange={onChange} className='element-custom' name='description' placeholder='Descripci&oacute;n'/>
                <Button label='Guardar' icon='pi pi-save' onClick={addCareer}/>
            </Dialog>
        </Fragment>
    )
}