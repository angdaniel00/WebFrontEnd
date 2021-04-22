import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {addStudent, updateStudent, deleteStudent, getStudentsAllCourse} from '../../../actions/students';
import {Button} from 'primereact/button'
import {Toolbar} from 'primereact/toolbar';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {DialogCreate} from './DialogCreate';
import './css/tableallstudent.css';

export class TableAllStudents extends Component {

    state = {
        admin: this.props.admin,
        visible: false,
        selection: null
    }

    createStudent=(event)=>{
        this.setState({visible:true})
    }

    hide=(event)=>{
        this.setState({visible:false})
    }

    addStudentD = (student)=>{
        this.props.events.addStudent(student)
        this.props.events.getStudentsAllCourse(this.props.events.courseSelect)
        this.hide()
    }

    onSelection = (event) =>{
        this.setState({selection: event.value})
    }

    render() {

        const left=(
            <Fragment>
                <Button label='Nuevo' icon='pi pi-plus' className='p-mr-2' onClick={this.createStudent}/>
                <Button label='Actualizar' icon='pi pi-check' className='p-button-success p-mr-2'/>
                <Button label='Borrar' icon='pi pi-times' className='p-button-danger p-mr-2'/>
            </Fragment>
        );
         const right=(
             <Fragment>
                 <Button label='Actualizar' icon='pi pi-calendar' onClick={e=>{this.props.events.getStudentsAllCourse(this.props.events.courseSelect)}}/>
             </Fragment>
         );

        return (
            <Fragment>
                    {this.props.admin?<DialogCreate addStudentD={this.addStudentD} hide={this.hide} visible={this.state.visible} courses={this.props.events.courses}/>:null}
                    {this.props.admin?<Toolbar className='mt' left={left} right={right}/>:null}
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

export default connect(mapStateToProps,{addStudent, updateStudent, deleteStudent, getStudentsAllCourse})(TableAllStudents);