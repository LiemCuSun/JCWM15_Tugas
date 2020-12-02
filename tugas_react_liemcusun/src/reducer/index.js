// import combineReducers from redux
import { combineReducers } from 'redux'

// import reducer
import userReducer from "./userReducer"
import counterReducer from "./counterReducer"


// combine all reducer
let allReducers = combineReducers ({
    user: userReducer,
    count: counterReducer
})

export default allReducers