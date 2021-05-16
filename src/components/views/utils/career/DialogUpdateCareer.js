import React, { Fragment, useState } from 'react';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {Button} from 'primereact/button';
import '../css/dialogcreate.css';

export const DialogUpdateCareer = ({visible, hiden, career, clean, updateCareerD}) => {

    const[antCant, setAntCant] = useState(null)
    const [invalidName, setInvalidName] = useState(false)
    const [invalidUniversity, setInvalidUniversity] = useState(false)
    const [invalidCant, setInvalidCant] = useState(false)
    const [invalidDescription, setInvalidDescription] = useState(false)
    const [careerClone, setCareerClone] = useState({})

    const updateCareer = (event)=>{
        if(validCareer()){
            if(antCant)
            careerClone.disp += (careerClone.cant-antCant)
            updateCareerD(careerClone)
            career={...careerClone}
            clean()
        }
    }

    const onChange = e => {
        const value = e.target.value
        const name = e.target.name
        switch(name){
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
        careerClone[name]= value;
    }

    const validCareer = () =>{
        const{name, cant, description, course, university}=careerClone
        setInvalidName(!(name && name!==''))
        setInvalidUniversity(!(university && university!==''))
        setInvalidCant(!(cant && cant!=='' && cant>0))
        setInvalidDescription(!(description && description!==''))
        return (name && name.length>0 && university && university.length>0 && course && cant && cant!=='' && cant>=0 &&
        description && description.length>0);
    }

    const hidenDialog = () =>{
        setCareerClone({})
        setInvalidName(false)
        setInvalidUniversity(false)
        setInvalidCant(false)
        setInvalidDescription(false)
        hiden()
    }

    const initDialog = () =>{
        setCareerClone({...career})
        setAntCant(career.cant)
    }

    return (
        <Fragment>
            <Dialog onShow={initDialog} visible={visible} onHide={hidenDialog} header='Actualizar carrera'>
                <label className='element-custom'>Nombre</label>
                <InputText onChange={onChange} className={invalidName?'element-custom p-invalid':'element-custom'} defaultValue={careerClone.name} name='name' placeholder='Nombre'/>
                <label className='element-custom'>Universidad</label>
                <InputText onChange={onChange} className={invalidUniversity?'element-custom p-invalid':'element-custom'} defaultValue={careerClone.university} name='university' placeholder='Universidad'/>
                <label className='element-custom'>Cantidad</label>
                <InputText type='number' onChange={onChange} className={invalidCant?'element-custom p-invalid':'element-custom'} defaultValue={careerClone.cant} min={0} name='cant' placeholder='Cantidad'/>
                <label className='element-custom'>Descripci&oacute;n</label>
                <InputTextarea onChange={onChange} className={invalidDescription?'element-custom p-invalid':'element-custom'} defaultValue={careerClone.description} name='description' placeholder='Descripci&oacute;n'/>
                <Button label='Guardar' icon='pi pi-save' onClick={updateCareer}/>
            </Dialog>
        </Fragment>
    )
}