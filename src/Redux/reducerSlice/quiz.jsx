import { createSlice } from "@reduxjs/toolkit";
import { quiz } from "../../constants/dataConstants";



const initialState = quiz


const questions = createSlice({
    name:"questions" ,
    initialState,
    reducers:{
        setQuiz:(state, action)=>{
           const  payload = action.payload
            return ({
                ...action.payload
            })
        }
    }
})


export const { setQuiz } = questions.actions

export default questions.reducer