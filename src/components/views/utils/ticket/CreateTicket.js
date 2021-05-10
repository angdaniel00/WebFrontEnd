import React, { Fragment, useState } from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {ListBox} from 'primereact/listbox';
import '../css/dialogcreate.css';

export const CreateTicket = ({addTicketD, students, careers, visible, hide, course, showError, noSelect}) => {

    const [ticket, setTicket] = useState({
        id: null,
        course: course,
        student: null,
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        option5: '',
        option6: '',
        option7: '',
        option8: '',
        option9: '',
        option10: '',
    })

    const [selectStudentView, setSelectStudentView] = useState(true)

    const [showOption2, setShowOption2] = useState(true)
    const [showOption3, setShowOption3] = useState(true)
    const [showOption4, setShowOption4] = useState(true)
    const [showOption5, setShowOption5] = useState(true)
    const [showOption6, setShowOption6] = useState(true)
    const [showOption7, setShowOption7] = useState(true)
    const [showOption8, setShowOption8] = useState(true)
    const [showOption9, setShowOption9] = useState(true)
    const [showOption10, setShowOption10] = useState(true)

    const addTicket = (event)=>{
        const t = ticket
        t.course=course
        if(validTicket()){
            console.log(t)
            console.log(students)
            console.log(students.find(st=>st.id===t.student))
            addTicketD(t)
            setTicket({
                id: null,
                course: course,
                student: null,
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
        })
        }
        else
            showError()
    }

    const changeDisabled = (name, value)=>{
        var available = false
        var t = ticket
        if(name < 'option2'){
            if(!available && value){
                available=true
                setShowOption2(false)
            }
            else{
                setShowOption2(true)
            }
            t.option2=!value?null:t.option2
        }
        if(name < 'option3'){
            if(!available && value){
                available=true
                setShowOption3(false)
            }
            else{
                setShowOption3(true)
            }
            t.option3=!value?null:t.option3
        }
        if(name < 'option4'){
            if(!available && value){
                available=true
                setShowOption4(false)
            }
            else{
                setShowOption4(true)
            }
            t.option4=!value?null:t.option4
        }
        if(name < 'option5'){
            if(!available && value){
                available=true
                setShowOption5(false)
            }
            else{
                setShowOption5(true)
            }
            t.option5=!value?null:t.option5
        }
        if(name < 'option6'){
            if(!available && value){
                available=true
                setShowOption6(false)
            }
            else{
                setShowOption6(true)
            }
            t.option6=!value?null:t.option6
        }
        if(name < 'option7'){
            if(!available && value){
                available=true
                setShowOption7(false)
            }
            else{
                setShowOption7(true)
            }
            t.option7=!value?null:t.option7
        }
        if(name < 'option8'){
            if(!available && value){
                available=true
                setShowOption8(false)
            }
            else{
                setShowOption8(true)
            }
            t.option8=!value?null:t.option8
        }
        if(name < 'option9'){
            if(!available && value){
                available=true
                setShowOption9(false)
            }
            else{
                setShowOption9(true)
            }
            t.option9=!value?null:t.option9
        }
        if(name < 'option10' && value){
            if(!available){
                available=true
                setShowOption10(false)
            }
            else{
                setShowOption10(true)
            }
            t.option10=!value?null:t.option10
        }
        setTicket(t)
    }

    const onChangeOption = e =>{
        var st = ticket
        const value = e.target.value==='Ninguno'?null:e.target.value
        st[e.target.name]=value
        setTicket(st)
        changeDisabled(e.target.name, value)
    }

    const validTicket = () =>{
        const{course, student, option1}=ticket
        return (course && student && option1);
    }

    const onClickNext = event =>{
        !ticket.student?noSelect():setSelectStudentView(false)
    }

    const onChangeList = e =>  {
        var t = ticket
        t.student=e.value
        setTicket(t)
    }

    const onBack = event =>{
        setSelectStudentView(true)
        setTicket({
            id: null,
            course: course,
            student: null,
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
        })
    }

    const reset = e =>{
        setTicket({
            id: null,
            course: course,
            student: null,
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
        })
        setSelectStudentView(true)
        hide()
    }

    return (
        <Fragment>
            <Dialog visible={visible} header='A&ntilde;adir boleta' onHide={reset}>
                {selectStudentView?
                <div>
                    <ListBox optionLabel='name' disabled={false} optionValue='id' value={ticket.student} options={students} onChange={onChangeList} filter={true} listStyle={{height: '25rem'}}/>
                    <Button className='mt-1' label='Siguiente' onClick={onClickNext}/>
                </div>:

                <div>
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} required={true} value={ticket.option1} onChange={onChangeOption} name='option1' options={[{name:'Ninguno'}, ...careers]} placeholder='Opci&oacute;n 1'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption2} value={ticket.option2} onChange={onChangeOption} name='option2' options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1)]} placeholder='Opci&oacute;n 2'/>
                    
                    <Dropdown  className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption3} value={ticket.option3} onChange={onChangeOption} name='option3' options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1 && career.name!==ticket.option2)]} placeholder='Opci&oacute;n 3'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption4} value={ticket.option4} onChange={onChangeOption} name='option4' 
                        options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1 && career.name!==ticket.option2 && career.name!==ticket.option3)]} placeholder='Opci&oacute;n 4'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption5} value={ticket.option5} onChange={onChangeOption} name='option5' 
                        options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1 && career.name!==ticket.option2 && career.name!==ticket.option3 && career.name!==ticket.option4)]} placeholder='Opci&oacute;n 5'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption6} value={ticket.option6} onChange={onChangeOption} name='option6' 
                        options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1 && career.name!==ticket.option2 && career.name!==ticket.option3 && career.name!==ticket.option4 && career.name!==ticket.option5)]} placeholder='Opci&oacute;n 6'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption7} value={ticket.option7} onChange={onChangeOption} name='option7' 
                        options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1 && career.name!==ticket.option2 && career.name!==ticket.option3 && career.name!==ticket.option4 && career.name!==ticket.option5 && career.name!==ticket.option6)]} placeholder='Opci&oacute;n 7'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption8} value={ticket.option8} onChange={onChangeOption} name='option8' 
                        options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1 && career.name!==ticket.option2 && career.name!==ticket.option3 && career.name!==ticket.option4 && career.name!==ticket.option5 && career.name!==ticket.option6 && career.name!==ticket.option7)]} placeholder='Opci&oacute;n 8'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption9} value={ticket.option9} onChange={onChangeOption} name='option9' 
                        options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1 && career.name!==ticket.option2 && career.name!==ticket.option3 && career.name!==ticket.option4 && career.name!==ticket.option5 && career.name!==ticket.option6 && career.name!==ticket.option7 && career.name!==ticket.option8)]} placeholder='Opci&oacute;n 9'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption10} value={ticket.option10} onChange={onChangeOption} name='option10' 
                        options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1 && career.name!==ticket.option2 && career.name!==ticket.option3 && career.name!==ticket.option4 && career.name!==ticket.option5 && career.name!==ticket.option6 && career.name!==ticket.option7 && career.name!==ticket.option8 && career.name!==ticket.option9)]} placeholder='Opci&oacute;n 10'/>
                    <div className="div-ticket">
                        <Button label='Atr&aacute;s' className="btn-back" onClick={onBack}/>
                        <Button label='Guardar' className="btn-save-ticket" icon='pi pi-save' onClick={addTicket}/>
                    </div>
                </div>}
            </Dialog>
        </Fragment>
    )
}