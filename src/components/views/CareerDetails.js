import React, { Fragment } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Dialog} from 'primereact/dialog';

export const CareerDetails = ({visible, hide, career}) => {

    const convertCareer = () => {
        if(!career)
            return []
        return[
            {name:'Universidad', value:career.university},
            {name:'Cantidad', value:career.cant},
            {name:'Disponibles', value:career.disp},
            {name:'Descripción', value:career.description},
            {name:'Corte final', value:career.corte===-1?null:career.corte}
        ]
    }

    return (
        <Fragment>
            <Dialog id="dialog" visible={visible} onHide={hide} header='Informaci&oacute;n de la carrera' style={{width: '37rem !important'}}>
                <DataTable header={career?career.name:''} value={convertCareer()} className='p-datatable-gridlines mt hidden-header' >
                    <Column field="name"></Column>
                    <Column field="value"></Column>
                </DataTable>
            </Dialog>
        </Fragment>
    )
}