import React, { Fragment, useState, useRef } from 'react';
import {Button} from 'primereact/button'
import {Toolbar} from 'primereact/toolbar';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {DialogCreate} from './DialogCreate';
import {DialogUpdate} from './DialogUpdate';
import {confirmDialog} from 'primereact/confirmdialog';
import {Dropdown} from 'primereact/dropdown';
import {Toast} from 'primereact/toast';
import './css/tableallstudent.css';
import {ALL_STUDENTS, APR_STUDENTS, DES_STUDENTS, ESCALAFON} from '../../util/constants';
import {StudentDetails} from '../StudentDetails';

export const initialSelection={
        id: null,
        course: null,
        name: '',
        scholl: '',
        acpre: null,
        math: -1,
        spanish: -1,
        history: -1,
        noteFinal: -1,
        nameCareer: null
}

export const TableAllStudents =({students, events, admin, type})=> {

    const [selectionCourse, setSelectionCourse]=useState(events.courseSelect)
    const [visible, setVisible] = useState(false)
    const [selection, setSelection] = useState(initialSelection)
    const [visibleUpdate, setVisibleUpdate] = useState(false)
    const [confirmVisible, setConfirmVisible] = useState(false)
    const [visibleInfo, setVisibleInfo] = useState(false)
    const [loadingCal, setLoadingCal] = useState(false)
    const [loadingAsign, setLoadingAsign] = useState(false)
    const toast = useRef(null)

    const showToast = () =>{
        toast.current.show({severity: 'warn', summary:'Error', detail:'Debe seleccionar un estudiante', life:2000})
    }

    const showConfirmDelete = () =>{
        toast.current.show({severity: 'error', summary:'Borrado', detail:'Alumno eliminado', life:2000})
    }

    const successUpdate = () =>{
        toast.current.show({severity: 'success', summary:'Actualizado', detail:'Información actualizada', life:2000})
    }

    const successCal = () =>{
        setLoadingCal(false)
        toast.current.show({severity: 'success', summary:'Actualizado', detail:'Notas calculadas y guardadas', life:2000})
    }

    const successAsgin = () =>{
        setLoadingAsign(false)
        toast.current.show({severity: 'success', summary:'Actualizado', detail:'Carreras asignadas y guardadas', life:2000})
    }

    const error = () => {
        toast.current.show({severity: 'error', summary:'Error', detail:'No hay cursos agregados', life:2000})
    }

    const showErrorCalc = (message) => {
        setLoadingCal(false)
        toast.current.show({severity: 'error', summary:'Error', detail:message, life:2000})
    }

    const showErrorAsign = (message) => {
        setLoadingAsign(false)
        toast.current.show({severity: 'error', summary:'Error', detail:message, life:2000})
    }

    const createStudent=(event)=>{
        (!events.courseSelect || events.courseSelect===-1)?error():setVisible(true)
    }

    const updateStudent=(event)=>{
        (selection && selection.id) ?setVisibleUpdate(true):showToast()
    }

    const cleanSelection = () => {
        setSelection(initialSelection)
    }

    const hide=(event)=>{
        setVisible(false)
    }

    const hideU=(event)=>{
        setVisibleUpdate(false)
    }

    const addStudentD = (student)=>{
        events.addStudent(student)
        hide()
    }

    const updateStudentD = (student)=>{
        events.updateStudent(student)
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

    const confirm=()=>{
        confirmDialog({
            message:'Seguro que lo quieres eliminar',
            header: 'Confirmar',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: ()=>{
                events.deleteStudent(selection.id);
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
        const s = (!event.target.name || event.target.name==='refreshButton')?selectionCourse:event.target.value
        switch(type){
            case ALL_STUDENTS:
                events.getStudentsAllCourse(s)
                break;
            case APR_STUDENTS:
                events.getAprobados(s)
                break;
            case DES_STUDENTS:
                events.getDesaprobados(s)
                break;
            case ESCALAFON:
                events.getEscalafon(s)
                break;
            default:
                break;
        }
    }

    const eventCalc = (event)=>{
        setLoadingCal(true)
        events.calNoteFinal(selectionCourse, showErrorCalc, cleanSelection, successCal)
    }

    const eventAsign = (event)=>{
        setLoadingAsign(true)
        events.asignCareer(selectionCourse, showErrorAsign, cleanSelection, successAsgin)
    }

    const left=(
        <Fragment>
            <Button tooltip='Nuevo' icon='pi pi-user-plus' className='p-mr-2' onClick={createStudent} tooltipOptions={{position:'bottom'}}/>
            <Button tooltip='Editar' icon='pi pi-pencil' className='p-button-success p-mr-2' onClick={updateStudent} tooltipOptions={{position:'bottom'}}/>
            <Button tooltip='Borrar' icon='pi pi-trash' className='p-button-danger p-mr-2' onClick={onDelete} tooltipOptions={{position:'bottom'}}/>
            <Button tooltip='Actualizar' icon='pi pi-refresh' name='refreshButton' onClick={onRefresh} tooltipOptions={{position:'bottom'}}/>
        </Fragment>
    )

    const right=(
        <Fragment>
           <Dropdown className='p-mr-2' optionLabel='cyear' optionValue="id" value={selectionCourse} onChange={onRefresh} name='course' options={events.courses} placeholder='Curso'/>
           <Button tooltip='Informaci&oacute;n' icon='pi pi-info-circle' className='p-mr-2' onClick={onInfo} tooltipOptions={{position: 'bottom'}}/>
           <Button tooltip='Calcular' disabled={loadingCal} onClick={eventCalc} icon={loadingCal?'pi pi-spin pi-spinner':'pi pi-file'} className='p-mr-2' tooltipOptions={{position:'bottom'}}/>
           <Button tooltip='Asignar' disabled={loadingAsign} onClick={eventAsign} icon={loadingAsign?'pi pi-spin pi-spinner':'pi pi-book'} className='p-mr-2' tooltipOptions={{position:'bottom'}}/>
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
           <Button tooltip='Actualizar' icon='pi pi-refresh' name='refreshButton' className='p-mr-2' onClick={onRefresh} tooltipOptions={{position:'bottom'}}/>
        </Fragment>
    )
         
    return (
        <Fragment>
                <Toast ref={toast} onRemove={()=>toast.current.clear()} className='toast'/>
                {admin?<DialogCreate addStudentD={addStudentD} hide={hide} visible={visible} courses={events.courses}/>:null}
                {admin?<DialogUpdate updateStudentD={updateStudentD} hiden={hideU} visible={visibleUpdate} student={selection} clean={cleanSelection}/>:null}
                {admin?<Toolbar className='mt' left={left} right={right}/>:<Toolbar className='mt' left={leftPublic} right={rightPublic}/>}
                <StudentDetails visible={visibleInfo} hide={()=>setVisibleInfo(false)} student={selection}/>
                <DataTable header="Estudiantes" value={students} selection={selection} onSelectionChange={onSelection} selectionMode='single' dataKey='id' className='p-datatable-gridlines mt'>
                    <Column field="name" header="Nombre"></Column>
                    <Column field="school" header="Escuela"></Column>
                    <Column field="acpre" header="Nota Pre"></Column>
                    <Column field="noteFinal" header="Nota final"></Column>
                </DataTable>
        </Fragment>
    )
}