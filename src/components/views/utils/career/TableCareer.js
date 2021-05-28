import React, { Fragment, useState, useRef } from 'react';
import {Button} from 'primereact/button'
import {Toolbar} from 'primereact/toolbar';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {DialogCreateCareer} from './DialogCreateCareer';
import {DialogUpdateCareer} from './DialogUpdateCareer';
import {confirmDialog} from 'primereact/confirmdialog';
import {Dropdown} from 'primereact/dropdown';
import {Toast} from 'primereact/toast';
import '../css/tableallstudent.css';
import {ALL_CAREERS, DISP_CAREERS} from '../../../util/constants';
import {CareerDetails} from '../../CareerDetails';

export const initialSelection={
        id: null,
        name: '',
        course: null,
        university: '',
        cant: null,
        disp: null,
        description: '',
        corte: -1
}

export const TableCareer =({careers, events, admin, type})=> {

    const [selectionCourse, setSelectionCourse]=useState(events.courseSelect)
    const [visible, setVisible] = useState(false)
    const [selection, setSelection] = useState({...initialSelection})
    const [visibleUpdate, setVisibleUpdate] = useState(false)
    const [confirmVisible, setConfirmVisible] = useState(false)
    const [visibleInfo, setVisibleInfo] = useState(false)
    const [loadingRefresh, setLoadingRefresh] = useState(false)
    const toast = useRef(null)

    const showToast = () =>{
        toast.current.show({severity: 'warn', summary:'Error', detail:'Debe seleccionar una carrera', life:2000})
    }

    const showErrorMessage = ()=>{
        setLoadingRefresh(false)
        toast.current.show({severity: 'error', summary:'Borrado', detail:'Alumno eliminado', life:2000})
    }

    const showConfirmDelete = () =>{
        toast.current.show({severity: 'error', summary:'Borrado', detail:'Carrera eliminada', life:2000})
    }

    const successUpdate = () =>{
        toast.current.show({severity: 'success', summary:'Actualizado', detail:'Información actualizada', life:2000})
    }

    const error = () => {
        toast.current.show({severity: 'error', summary:'Error', detail:'No hay cursos agregados', life:2000})
    }

    const createCareer=(event)=>{
        (!events.courseSelect || events.courseSelect===-1)?error():setVisible(true)
    }

    const updateCareer=(event)=>{
        (selection && selection.id) ?setVisibleUpdate(true):showToast()
    }

    const hide=(event)=>{
        setVisible(false)
    }

    const hideU=(event)=>{
        setVisibleUpdate(false)
    }

    const addCareerD = (student)=>{
        events.addCareer(student)
        hide()
    }

    const updateCareerD = (student)=>{
        events.updateCareer(student)
        hideU()
        successUpdate()
    }

    const onSelection = (event) =>{
        setSelection(event.value)
    }

    const onDelete = (event) =>{
        if(selection && selection.id){
            setConfirmVisible(true)
            confirm()
        }
        else{
            showToast()
        }
    }

    const clean = () =>{
        setSelection({...initialSelection})
    }

    const confirm=()=>{
        confirmDialog({
            message:'Seguro que lo quieres eliminar',
            header: 'Confirmar',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: ()=>{
                events.deleteCareer(selection.id);
                setConfirmVisible(false)
                setSelection(initialSelection)
                showConfirmDelete()
            },
            reject:()=>setConfirmVisible(false),
            visible:confirmVisible
        })
    }

    const onInfo = (event) => {
        (selection && selection.id)?setVisibleInfo(true):showToast()
    }

    const onRefresh = (event) => {
        if(event.target.name==='course')
            setSelectionCourse(event.target.value)
        setSelection(initialSelection)
        setLoadingRefresh(true)
        const s = (!event.target.name || event.target.name==='refresh')?selectionCourse:event.target.value
        switch(type){
            case ALL_CAREERS:
                events.getCareersCourse(s, showErrorMessage, ()=>setLoadingRefresh(false))
                break;
            case DISP_CAREERS:
                events.getCareerDisp(s, showErrorMessage, ()=>setLoadingRefresh(false))
                break;
            default:
                break;
        }
    }

    const left=(
        <Fragment>
            <Button tooltip='Nuevo' icon='pi pi-plus' className='p-mr-2' onClick={createCareer} tooltipOptions={{position:'bottom'}}/>
            <Button tooltip='Editar' icon='pi pi-pencil' className='p-button-success p-mr-2' onClick={updateCareer} tooltipOptions={{position:'bottom'}}/>
            <Button tooltip='Borrar' icon='pi pi-trash' className='p-button-danger p-mr-2' onClick={onDelete} tooltipOptions={{position:'bottom'}}/>
            <Button tooltip='Actualizar' disabled={loadingRefresh} icon={loadingRefresh?'pi pi-spin pi-spinner':'pi pi-refresh'} name='refresh' onClick={onRefresh} tooltipOptions={{position:'bottom'}}/>
        </Fragment>
    )

    const right=(
        <Fragment>
           <Dropdown className='p-mr-2' optionLabel='cyear' optionValue="id" value={selectionCourse} onChange={onRefresh} name='course' options={events.courses} placeholder='Curso'/>
           <Button tooltip='Informaci&oacute;n' icon='pi pi-info-circle' className='p-mr-2' onClick={onInfo} tooltipOptions={{position: 'bottom'}}/>
        </Fragment>
    )

    const leftPublic=(
        <Fragment>
            <label className='p-mr-2'>Curso</label>
            <Dropdown className='p-mr-2' optionLabel='cyear' optionValue="id" value={selectionCourse} onChange={onRefresh} name='course' options={events.courses} placeholder='Curso'/>
        </Fragment>
    )

    const rightPublic=(
        <Fragment>
           <Button tooltip='Informaci&oacute;n' icon='pi pi-info-circle' className='p-mr-2' onClick={onInfo} tooltipOptions={{position: 'bottom'}}/>
           <Button tooltip='Actualizar' disabled={loadingRefresh} icon={loadingRefresh?'pi pi-spin pi-spinner':'pi pi-refresh'} name='refresh' className='p-mr-2' onClick={onRefresh} tooltipOptions={{position:'bottom'}}/>
        </Fragment>
    )
         
    return (
        <Fragment>
                <Toast ref={toast} onRemove={()=>toast.current.clear()} className='toast'/>
                {admin?<DialogCreateCareer addCareerD={addCareerD} hide={hide} visible={visible} courses={events.courses}/>:null}
                {admin?<DialogUpdateCareer updateCareerD={updateCareerD} hiden={hideU} visible={visibleUpdate} clean={clean} career={selection}/>:null}
                {admin?<Toolbar className='mt' left={left} right={right}/>:<Toolbar className='mt' left={leftPublic} right={rightPublic}/>}
                <CareerDetails visible={visibleInfo} hide={()=>setVisibleInfo(false)} career={selection}/>
                <DataTable header="Carreras" value={careers} selection={selection} onSelectionChange={onSelection} selectionMode='single' dataKey='id' className='p-datatable-gridlines mt'>
                    <Column field="name" header="Nombre"></Column>
                    <Column field="university" header="Universidad"></Column>
                    <Column field="cant" header="Cantidad"></Column>
                    <Column field="description" header="Descripci&oacute;n"></Column>
                </DataTable>
        </Fragment>
    )
}