import React, { Fragment, useState, useRef } from 'react';
import {Button} from 'primereact/button'
import {Toolbar} from 'primereact/toolbar';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {DialogCreateCourse} from './DialogCreateCourse';
import {DialogUpdateCourse} from './DialogUpdateCourse';
import {confirmDialog} from 'primereact/confirmdialog';
import {Toast} from 'primereact/toast';
import '../css/tableallstudent.css';

export const initialSelection={
        id: null,
        cyear:''
}

export const AllCourses =({courses, events})=> {

    const [visible, setVisible] = useState(false)
    const [selection, setSelection] = useState(initialSelection)
    const [visibleUpdate, setVisibleUpdate] = useState(false)
    const [confirmVisible, setConfirmVisible] = useState(false)
    const toast = useRef(null)

    const showToast = () =>{
        toast.current.show({severity: 'warn', summary:'Error', detail:'Debe seleccionar un curso', life:2000})
    }

    const showConfirmDelete = () =>{
        toast.current.show({severity: 'error', summary:'Borrado', detail:'Curso eliminado', life:2000})
    }

    const successUpdate = () =>{
        toast.current.show({severity: 'success', summary:'Actualizado', detail:'Información actualizada', life:2000})
    }

    const createCourse=(event)=>{
        setVisible(true)
    }

    const updateCourse=(event)=>{
        (selection && selection.id) ?setVisibleUpdate(true):showToast()
    }

    const hide=(event)=>{
        setVisible(false)
    }

    const hideU=(event)=>{
        setVisibleUpdate(false)
    }

    const addCourseD = (course)=>{
        events.addCourse(course)
        hide()
    }

    const updateCourseD = (course)=>{
        events.updateCourse(course)
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
                events.deleteCourse(selection.id);
                if(selection.id===events.courseSelect)
                    events.getActual()
                setConfirmVisible(false)
                setSelection(initialSelection)
                showConfirmDelete()
            },
            reject:()=>setConfirmVisible(false),
            visible:confirmVisible
        })
    }

    const onRefresh = (event) => {
        setSelection(initialSelection)
        events.getCourses()
    }

    const left=(
        <Fragment>
            <Button tooltip='Nuevo' icon='pi pi-plus' className='p-mr-2' onClick={createCourse} tooltipOptions={{position:'bottom'}}/>
            <Button tooltip='Editar' icon='pi pi-pencil' className='p-button-success p-mr-2' onClick={updateCourse} tooltipOptions={{position:'bottom'}}/>
            <Button tooltip='Borrar' icon='pi pi-trash' className='p-button-danger p-mr-2' onClick={onDelete} tooltipOptions={{position:'bottom'}}/>
            <Button tooltip='Actualizar' icon='pi pi-refresh' name='refresh' onClick={onRefresh} tooltipOptions={{position:'bottom'}}/>
        </Fragment>
    )
         
    return (
        <Fragment>
                <Toast ref={toast} onRemove={()=>toast.current.clear()} className='toast'/>
                <DialogCreateCourse addCourseD={addCourseD} hiden={hide} visible={visible} coursesD={courses} getActual={events.getActual}/>
                <DialogUpdateCourse updateCourseD={updateCourseD} hiden={hideU} visible={visibleUpdate} courses={courses.filter(c=>c.id!==selection.id)} getActual={events.getActual} actual={selection}/>
                <Toolbar className='mt' left={left} />
                <DataTable header="Cursos" value={courses} selection={selection} onSelectionChange={onSelection} selectionMode='single' dataKey='id' className='p-datatable-gridlines mt'>
                    <Column field="id" header="ID"></Column>
                    <Column field="cyear" header="Curso escolar"></Column>
                </DataTable>
        </Fragment>
    )
}