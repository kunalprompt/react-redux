import { createStore } from "redux"

import reducer  from "./reducers/counter_reducer.js"


const store = createStore(reducer, {
    counter: 0
})

export default store
