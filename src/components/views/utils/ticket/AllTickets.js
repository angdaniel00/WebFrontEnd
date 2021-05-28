import React, { Fragment, useState, useRef } from 'react';
import {Button} from 'primereact/button'
import {Toolbar} from 'primereact/toolbar';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {CreateTicket} from './CreateTicket';
import {UpdateTicket} from './UpdateTicket';
import {confirmDialog} from 'primereact/confirmdialog';
import {Dropdown} from 'primereact/dropdown';
import {Toast} from 'primereact/toast';
import '../css/tableallstudent.css';
import {TicketDetails} from '../../TicketDetails';

export const initialSelection={
        id: null,
        course: null,
        student: null,
        studentName: '',
        option1: null,
        option2: null,
        option3: null,
        option4: null,
        option5: null,
        option6: null,
        option7: null,
        option8: null,
        option9: null,
        option10: null
}

export const TableAllTickets =({students, careers, tickets, events, admin})=> {

    const [selectionCourse, setSelectionCourse]=useState(events.courseSelect)
    const [visible, setVisible] = useState(false)
    const [selection, setSelection] = useState(initialSelection)
    const [visibleUpdate, setVisibleUpdate] = useState(false)
    const [confirmVisible, setConfirmVisible] = useState(false)
    const [visibleInfo, setVisibleInfo] = useState(false)
    const [loadingRefresh, setLoadingRefresh] = useState(false)
    const toast = useRef(null)

    const showToast = () =>{
        toast.current.show({severity: 'warn', summary:'Error', detail:'Debe seleccionar una boleta', life:2000})
    }

    const showErrorMessage = ()=>{
        setLoadingRefresh(false)
        toast.current.show({severity: 'error', summary:'Borrado', detail:'Alumno eliminado', life:2000})
    }

    const noSelect = () =>{
        toast.current.show({severity: 'warn', summary:'Error', detail:'Debe seleccionar un estudiante', life:2000})
    }

    const showError = () =>{
        toast.current.show({severity: 'error', summary:'Error', detail:'Datos incorrectos o incompletos', life:2000})
    }

    const showConfirmDelete = () =>{
        toast.current.show({severity: 'error', summary:'Borrado', detail:'Boleta eliminada', life:2000})
    }

    const successUpdate = () =>{
        toast.current.show({severity: 'success', summary:'Actualizado', detail:'Información actualizada', life:2000})
    }

    const error = () => {
        toast.current.show({severity: 'error', summary:'Error', detail:'No hay cursos agregados', life:2000})
    }

    const createTicket=(event)=>{
        (!events.courseSelect || events.courseSelect===-1)?error():setVisible(true)
    }

    const updateTicket=(event)=>{
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

    const addTicketD = (ticket)=>{
        events.addTicket(ticket)
        hide()
    }

    const updateTicketD = (ticket)=>{
        events.updateTicket(ticket)
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
                events.deleteTicket(selection.id);
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
        const s = (!event.target.name || event.target.name==='refreshButton')?selectionCourse:event.target.value
        events.getTicketsCourse(s, showErrorMessage, ()=>setLoadingRefresh(false))
    }

    const left=(
        <Fragment>
            <Button tooltip='Nuevo' icon='pi pi pi-plus' className='p-mr-2' onClick={createTicket} tooltipOptions={{position:'bottom'}}/>
            <Button tooltip='Editar' icon='pi pi-pencil' className='p-button-success p-mr-2' onClick={updateTicket} tooltipOptions={{position:'bottom'}}/>
            <Button tooltip='Borrar' icon='pi pi-trash' className='p-button-danger p-mr-2' onClick={onDelete} tooltipOptions={{position:'bottom'}}/>
            <Button tooltip='Actualizar' disabled={loadingRefresh} icon={loadingRefresh?'pi pi-spin pi-spinner':'pi pi-refresh'} name='refreshButton' onClick={onRefresh} tooltipOptions={{position:'bottom'}}/>
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
           <Button tooltip='Actualizar' disabled={loadingRefresh} icon={loadingRefresh?'pi pi-spin pi-spinner':'pi pi-refresh'} name='refreshButton' className='p-mr-2' onClick={onRefresh} tooltipOptions={{position:'bottom'}}/>
        </Fragment>
    )
         
    return (
        <Fragment>
                <Toast ref={toast} onRemove={()=>toast.current.clear()} className='toast'/>
                {admin?<CreateTicket addTicketD={addTicketD} hide={hide} visible={visible} showError={showError} noSelect={noSelect} students={students.filter(student=>!student.ticket)} careers={careers.filter(career => career.disp>0)} course={selectionCourse?selectionCourse:events.courseSelect}/>:null}
                {admin?<UpdateTicket updateTicketD={updateTicketD} hiden={hideU} visible={visibleUpdate} showError={showError} careers={careers.filter(career => career.disp>0)} ticket={selection} clean={cleanSelection}/>:null}
                {admin?<Toolbar className='mt' left={left} right={right}/>:<Toolbar className='mt' left={leftPublic} right={rightPublic}/>}
                <TicketDetails visible={visibleInfo} hide={()=>setVisibleInfo(false)} ticket={selection}/>
                <DataTable header="Boletas" value={tickets} selection={selection} onSelectionChange={onSelection} selectionMode='single' dataKey='id' className='p-datatable-gridlines mt'>
                    <Column field="id" header="ID"></Column>
                    <Column field="studentName" header="Estudiante"></Column>
                </DataTable>
        </Fragment>
    )
}