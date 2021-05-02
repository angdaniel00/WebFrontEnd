import React, { Fragment } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Dialog} from 'primereact/dialog';
import './studentdetails.css'

export const StudentDetails =({visible, hide, student})=> {

    const convertStudent = (type)=>{
        if(!student) return []
        if(type === 1)
            return student.name
        return[
            {name:'Carrera', value:student.career},
            {name:'Boleta', value:student.ticket},
            {name:'Escuela', value:student.school},
            {name:'Acumulado preuniversitario', value:student.acpre},
            {name:'Matemática', value:student.math},
            {name:'Español', value:student.spanish},
            {name:'Historia', value:student.history},
            {name:'Acumulado final', value:student.noteFinal}
        ]
    }

    return (
            <Fragment>
                <Dialog id="dialog" visible={visible} onHide={hide} header='Informaci&oacute;n de estudiante' style={{width: '37rem !important'}}>
                    <DataTable header={convertStudent(1)} value={convertStudent(2)} className='p-datatable-gridlines mt hidden-header'>
                        <Column field="name"></Column>
                        <Column field="value"></Column>
                    </DataTable>
                </Dialog>
            </Fragment>
    );
}