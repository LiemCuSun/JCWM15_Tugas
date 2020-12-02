
const INITIAL_STATE = {
    count: 0
}

const countReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PLUS':
            return {
                ...state,
                count: state.count + 1
            }
        case 'MINUS':
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state
    }
}

export default countReducer