import {GET_STUDENTS, DELETE_STUDENT, ADD_STUDENT, UPDATE_STUDENT, CHANGE_STUDENT} from '../actions/types';

const initialState = {
    students: []
}

const fixedStudents = (students) =>{
    for(var i = 0; i < students.length; i++){
        var student = students[i];
        student = fixedStudent(student);
    }
    return students;
}

const fixedStudent = (student)=>{
    student.math=student.math===-1?null:student.math;
    student.spanish=student.spanish===-1?null:student.spanish;
    student.history=student.history===-1?null:student.history;
    student.noteFinal=student.noteFinal===-1?null:student.noteFinal;
    return student;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state= initialState, action) {
    switch (action.type){
        case GET_STUDENTS:
            return{
                ...state,
                students: fixedStudents(action.payload)
            };
        case CHANGE_STUDENT:
            return{
                ...state,
                selected: fixedStudent(action.payload)
            }
        case DELETE_STUDENT:
            return { 
                ...state, 
                students: state.students.filter(student => student.id !== action.payload) 
            }
        case ADD_STUDENT:
            return{
                ...state,
                students: [...state.students, fixedStudent(action.payload)]
            }
        case UPDATE_STUDENT:
            return{
                ...state,
                students: [...state.students.filter(student => student.id !== action.payload.id) , fixedStudent(action.payload)]
            }
        default:
            return state
    }
}