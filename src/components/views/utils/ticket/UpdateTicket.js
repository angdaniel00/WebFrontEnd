import React, { Fragment, useState } from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import '../css/dialogcreate.css';

export const UpdateTicket = ({visible, hiden, ticket, updateTicketD, clean, careers, showError}) => {

    const [ticketU, setTicketU] = useState({
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
})
    const [showOption2, setShowOption2] = useState(false)
    const [showOption3, setShowOption3] = useState(true)
    const [showOption4, setShowOption4] = useState(true)
    const [showOption5, setShowOption5] = useState(true)
    const [showOption6, setShowOption6] = useState(true)
    const [showOption7, setShowOption7] = useState(true)
    const [showOption8, setShowOption8] = useState(true)
    const [showOption9, setShowOption9] = useState(true)
    const [showOption10, setShowOption10] = useState(true)
    const [invalid, setInvalid] = useState(false)

    const updateTicket = (event)=>{
        if(validTicket()){
            updateTicketD(ticket)
            clean()
        }
        else
            showError()
    }

    const changeDisabled = (name, value)=>{
        var available = false
        if(name < 'option2'){
            if(!available){
                available=true
                setShowOption2(false)
            }
            else{
                setShowOption2(true)
            }
            ticketU.option2=!value?null:ticketU.option2
        }
        if(name < 'option3'){
            if(!available){
                available=true
                setShowOption3(false)
            }
            else{
                setShowOption3(true)
            }
            ticketU.option3=!value?null:ticketU.option3
        }
        if(name < 'option4'){
            if(!available){
                available=true
                setShowOption4(false)
            }
            else{
                setShowOption4(true)
            }
            ticketU.option4=!value?null:ticketU.option4
        }
        if(name < 'option5'){
            if(!available){
                available=true
                setShowOption5(false)
            }
            else{
                setShowOption5(true)
            }
            ticketU.option5=!value?null:ticketU.option5
        }
        if(name < 'option6'){
            if(!available){
                available=true
                setShowOption6(false)
            }
            else{
                setShowOption6(true)
            }
            ticketU.option6=!value?null:ticketU.option6
        }
        if(name < 'option7'){
            if(!available){
                available=true
                setShowOption7(false)
            }
            else{
                setShowOption7(true)
            }
            ticketU.option7=!value?null:ticketU.option7
        }
        if(name < 'option8'){
            if(!available){
                available=true
                setShowOption8(false)
            }
            else{
                setShowOption8(true)
            }
            ticketU.option8=!value?null:ticketU.option8
        }
        if(name < 'option9'){
            if(!available){
                available=true
                setShowOption9(false)
            }
            else{
                setShowOption9(true)
            }
            ticketU.option9=!value?null:ticketU.option9
        }
        if(name < 'option10'){
            if(!available){
                available=true
                setShowOption10(false)
            }
            else{
                setShowOption10(true)
            }
            ticketU.option10=!value?null:ticketU.option10
        }
        setTicketU(ticketU)
    }

    const hidenD = () =>{
        setShowOption2(true)
        setShowOption3(true)
        setShowOption4(true)
        setShowOption5(true)
        setShowOption6(true)
        setShowOption7(true)
        setShowOption8(true)
        setShowOption9(true)
        setShowOption10(true)
        setInvalid(false)
        hiden()
    }

    const initDialog = () =>{
        setTicketU(ticket)
        setShowOption2(false)
        setShowOption3(!(ticket.option2 && ticket.option2!==''))
        setShowOption4(!(ticket.option3 && ticket.option3!==''))
        setShowOption5(!(ticket.option4 && ticket.option4!==''))
        setShowOption6(!(ticket.option5 && ticket.option5!==''))
        setShowOption7(!(ticket.option6 && ticket.option6!==''))
        setShowOption8(!(ticket.option7 && ticket.option7!==''))
        setShowOption9(!(ticket.option8 && ticket.option8!==''))
        setShowOption10(!(ticket.option9 && ticket.option9!==''))
    }

    const validTicket = () =>{
        const{course, student, option1}=ticket
        setInvalid(!(option1))
        return (course && student && option1);
    }

    const onChangeOption = e =>{
        const value = e.target.value==='Ninguno'?null:e.target.value
        const name = e.target.name
        if(name==='option1')
            setInvalid(!(value && value!==''))
        ticketU[name]=value
        changeDisabled(name, value)
        setTicketU(ticketU)
    }

    return (
        <Fragment>
            <Dialog visible={visible} onShow={initDialog} onHide={hidenD} header='Actualizar boleta'>
                <label className="element-custom">Estudiante: {ticket.studentName}</label>
                <div>
                    <Dropdown className={invalid?"element-custom-dropdow p-invalid":"element-custom-dropdow"} optionLabel='name' optionValue="name" filter={true} required={true} value={ticketU.option1} onChange={onChangeOption} name='option1' options={[{name:'Ninguno'}, ...careers]} placeholder='Opci&oacute;n 1'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption2} value={ticketU.option2} onChange={onChangeOption} name='option2' options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1)]} placeholder='Opci&oacute;n 2'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption3} value={ticketU.option3} onChange={onChangeOption} name='option3' options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1 && career.name!==ticket.option2)]} placeholder='Opci&oacute;n 3'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption4} value={ticketU.option4} onChange={onChangeOption} name='option4' 
                        options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1 && career.name!==ticket.option2 && career.name!==ticket.option3)]} placeholder='Opci&oacute;n 4'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption5} value={ticketU.option5} onChange={onChangeOption} name='option5' 
                        options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1 && career.name!==ticket.option2 && career.name!==ticket.option3 && career.name!==ticket.option4)]} placeholder='Opci&oacute;n 5'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption6} value={ticketU.option6} onChange={onChangeOption} name='option6' 
                        options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1 && career.name!==ticket.option2 && career.name!==ticket.option3 && career.name!==ticket.option4 && career.name!==ticket.option5)]} placeholder='Opci&oacute;n 6'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption7} value={ticketU.option7} onChange={onChangeOption} name='option7' 
                        options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1 && career.name!==ticket.option2 && career.name!==ticket.option3 && career.name!==ticket.option4 && career.name!==ticket.option5 && career.name!==ticket.option6)]} placeholder='Opci&oacute;n 7'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption8} value={ticketU.option8} onChange={onChangeOption} name='option8' 
                        options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1 && career.name!==ticket.option2 && career.name!==ticket.option3 && career.name!==ticket.option4 && career.name!==ticket.option5 && career.name!==ticket.option6 && career.name!==ticket.option7)]} placeholder='Opci&oacute;n 8'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption9} value={ticketU.option9} onChange={onChangeOption} name='option9' 
                        options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1 && career.name!==ticket.option2 && career.name!==ticket.option3 && career.name!==ticket.option4 && career.name!==ticket.option5 && career.name!==ticket.option6 && career.name!==ticket.option7 && career.name!==ticket.option8)]} placeholder='Opci&oacute;n 9'/>
                    
                    <Dropdown className="element-custom-dropdow" optionLabel='name' optionValue="name" filter={true} disabled={showOption10} value={ticketU.option10} onChange={onChangeOption} name='option10' 
                        options={[{name:'Ninguno'}, ...careers.filter(career=>career.name!==ticket.option1 && career.name!==ticket.option2 && career.name!==ticket.option3 && career.name!==ticket.option4 && career.name!==ticket.option5 && career.name!==ticket.option6 && career.name!==ticket.option7 && career.name!==ticket.option8 && career.name!==ticket.option9)]} placeholder='Opci&oacute;n 10'/>
                    <div>
                        <Button label='Guardar' icon='pi pi-save' onClick={updateTicket}/>
                    </div>
                </div>
            </Dialog>
        </Fragment>
    )
}