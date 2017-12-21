const reducer = function(state, action){
    switch (action.type){
        case "INCR":
            state = {...state, counter: state.counter + 1}
            console.log(1)
            break
        case "DECR":
            state = {...state, counter: state.counter - 1}
            break
        default:
            break
    }
    return state
}

export default reducer
