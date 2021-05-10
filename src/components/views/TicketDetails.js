import React, { Fragment } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Dialog} from 'primereact/dialog';
import './studentdetails.css'

export const TicketDetails =({visible, hide, ticket})=> {

    const convertTicket = (type)=>{
        if(!ticket) return []
        if(type === 1)
            return ticket.studentName
        return[
            {name:'Opción 1', value:ticket.option1},
            {name:'Opción 2', value:ticket.option2},
            {name:'Opción 3', value:ticket.option3},
            {name:'Opción 4', value:ticket.option4},
            {name:'Opción 5', value:ticket.option5},
            {name:'Opción 6', value:ticket.option6},
            {name:'Opción 7', value:ticket.option7},
            {name:'Opción 8', value:ticket.option8},
            {name:'Opción 9', value:ticket.option9},
            {name:'Opción 10', value:ticket.option10}
            
        ]
    }

    return (
            <Fragment>
                <Dialog id="dialog" visible={visible} onHide={hide} header='Informaci&oacute;n de boleta' style={{width: '37rem !important'}}>
                    <DataTable header={convertTicket(1)} value={convertTicket(2)} className='p-datatable-gridlines mt hidden-header'>
                        <Column field="name"></Column>
                        <Column field="value"></Column>
                    </DataTable>
                </Dialog>
            </Fragment>
    );
}