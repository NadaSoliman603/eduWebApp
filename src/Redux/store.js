import { combineReducers, configureStore } from '@reduxjs/toolkit'
import questions from "./reducerSlice/quiz"
const Reducers =combineReducers({
  quiz :questions
})

export const store = configureStore({
    reducer:Reducers,
  })

  