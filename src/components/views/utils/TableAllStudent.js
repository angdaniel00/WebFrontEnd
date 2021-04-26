import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {addStudent, updateStudent, deleteStudent, getStudentsAllCourse, getStudent, getAprobados, getDesaprobados, getEscalafon} from '../../../actions/students';
import store from '../../../store';
import {Button} from 'primereact/button'
import {Toolbar} from 'primereact/toolbar';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {DialogCreate} from './DialogCreate';
import {DialogUpdate} from './DialogUpdate';
import {confirmDialog} from 'primereact/confirmdialog';
import {Dropdown} from 'primereact/dropdown';
import './css/tableallstudent.css';
import {ALL_STUDENTS, APR_STUDENTS, DES_STUDENTS, ESCALAFON} from '../../util/constants';

export const initialSelection={
        id: null,
        course: null,
        name: '',
        scholl: '',
        acpre: null,
        math: -1,
        spanish: -1,
        history: -1,
        noteFinal: -1
}

export class TableAllStudents extends Component {

    constructor(props) {
        super(props)
        this.state = {
            admin: this.props.admin,
            visible: false,
            selection: initialSelection,
            visibleUpdate: false,
            confirmVisible: false,
            selectionCourse: this.props.events.courseSelect
        }
        this.confirm = this.confirm.bind(this);
    }

    createStudent=(event)=>{
        this.setState({visible:true})
    }

    updateStudent=(event)=>{
        if (this.state.selection)
            this.setState({visibleUpdate: true})
    }

    hide=(event)=>{
        this.setState({visible: false})
    }

    hideU=(event)=>{
        this.setState({visibleUpdate: false})
    }

    addStudentD = (student)=>{
        this.props.events.addStudent(student)
        this.hide()
    }

    updateStudentD = (student)=>{
        this.props.events.updateStudent(student)
        this.hideU()
    }

    onSelection = (event) =>{
        this.setState({selection: event.value})
    }

    onDelete = (event) =>{
        if(this.state.selection){
            this.setState({confirmVisible:true})
            this.confirm()
        }
    }

    confirm(){
        confirmDialog({
            message:'Seguro que lo quieres eliminar',
            header: 'Confirmar',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: ()=>{
                this.props.events.deleteStudent(this.state.selection.id);
                this.setState({confirmVisible:false, selection:initialSelection})
            },
            reject:()=>this.setState({confirmVisible:false}),
            visible:this.state.confirmVisible
        })
    }

    onInfo = (event) => {
        if(this.state.selection.id){
            const {selection}=this.state;
            store.dispatch(getStudent(selection))
            window.location.hash='/studentdetails/'+selection.id
        }
    }

    onRefresh = (event) => {
        event.target.name==='course'?this.setState({selectionCourse: event.target.value, selection: initialSelection}):this.setState({selection: initialSelection})
        switch(this.props.type){
            case ALL_STUDENTS:
                this.props.events.getStudentsAllCourse(this.state.selectionCourse)
                break;
            case APR_STUDENTS:
                this.props.events.getAprobados(this.state.selectionCourse)
                break;
            case DES_STUDENTS:
                this.props.events.getDesaprobados(this.state.selectionCourse)
                break;
            case ESCALAFON:
                this.props.events.getEscalafon(this.state.selectionCourse)
                break;
            default:
                break;
        }
    }

    render() {
        const left=(
            <Fragment>
                <Button tooltip='Nuevo' icon='pi pi-plus' className='p-mr-2' onClick={this.createStudent} tooltipOptions={{position:'bottom'}}/>
                <Button tooltip='Editar' icon='pi pi-pencil' className='p-button-success p-mr-2' onClick={this.updateStudent} tooltipOptions={{position:'bottom'}}/>
                <Button tooltip='Borrar' icon='pi pi-trash' className='p-button-danger p-mr-2' onClick={this.onDelete} tooltipOptions={{position:'bottom'}}/>
                <Button tooltip='Actualizar' icon='pi pi-refresh' name='refresh' onClick={this.onRefresh} tooltipOptions={{position:'bottom'}}/>
            </Fragment>
        );
         const right=(
             <Fragment>
                <Dropdown className='p-mr-2' optionLabel='cyear' optionValue="id" value={this.state.selectionCourse} onChange={this.onRefresh} name='course' options={this.props.events.courses} placeholder='Curso'/>
                <Button tooltip='Informaci&oacute;n' icon='pi pi-info' className='p-mr-2' onClick={this.onInfo} tooltipOptions={{position: 'bottom'}}/>
                <Button tooltip='Calcular' icon='pi pi-file' className='p-mr-2' tooltipOptions={{position:'bottom'}}/>
                <Button tooltip='Asignar' icon='pi pi-book' className='p-mr-2' tooltipOptions={{position:'bottom'}}/>
             </Fragment>
         );

         const leftPublic=(
             <Fragment>
                 <label className='p-mr-2'>Curso</label>
                 <Dropdown className='p-mr-2' optionLabel='cyear' optionValue="id" value={this.state.selectionCourse} onChange={this.onRefresh} name='course' options={this.props.events.courses} placeholder='Curso'/>
             </Fragment>
         )

         const rightPublic=(
             <Fragment>
                <Button tooltip='Actualizar' icon='pi pi-refresh' name='refresh' className='p-mr-2' onClick={this.onRefresh} tooltipOptions={{position:'bottom'}}/>
                <Button tooltip='Informaci&oacute;n' icon='pi pi-info' className='p-mr-2' onClick={this.onInfo} tooltipOptions={{position: 'bottom'}}/>
             </Fragment>
         )

        return (
            <Fragment>
                    {this.props.admin?<DialogCreate addStudentD={this.addStudentD} hide={this.hide} visible={this.state.visible} courses={this.props.events.courses}/>:null}
                    {this.props.admin?<DialogUpdate updateStudentD={this.updateStudentD} hiden={this.hideU} visible={this.state.visibleUpdate} student={this.state.selection}/>:null}
                    {this.props.admin?<Toolbar className='mt' left={left} right={right}/>:<Toolbar className='mt' left={leftPublic} right={rightPublic}/>}
                    <DataTable header="Estudiantes" value={this.props.students} selection={this.state.selection} onSelectionChange={this.onSelection} selectionMode='single' dataKey='id' className='p-datatable-gridlines mt'>
                        <Column field="name" header="Nombre"></Column>
                        <Column field="school" header="Escuela"></Column>
                        <Column field="acpre" header="Nota Pre"></Column>
                        <Column field="noteFinal" header="Nota final"></Column>
                    </DataTable>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    courseSelect: state.course.courseSelect,
    selected: state.students.selected
});

export default connect(mapStateToProps,{addStudent, updateStudent, deleteStudent, getStudentsAllCourse, getStudent, getAprobados, getDesaprobados, getEscalafon})(TableAllStudents);