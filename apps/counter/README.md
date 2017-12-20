# Understanding Redux with NewsAPI.ORG APIs

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## [Redux Concepts] (https://www.youtube.com/watch?v=1w-oQ-i1XB8)

1. One Store [all data is stored here] (https://redux.js.org/docs/basics/Store.html)

2. Provider Component [connects store with Components - helps in re-rendering the components when store changes]

3. Components [JakeTrent.com] (https://jaketrent.com/post/smart-dumb-components-react/)

    Smart means “container” or “app-level”. Some have compared it to the “C” in MVC. Dumb means “presentational” or “ui only”, possibly comparable to the “V” in MVC. Here’s a breakdown of a few key characteristics:

    1. Smart Components
        - Describe how things work
        - Provide no DOM markup or styles
        - Provide application data, do data fetching
        - Call Flux actions
        - Named Container by convention

    2. Dumb components
        - Describe how things
        - Have no app dependencies
        - Receive only props, providing data and callbacks
        - Rarely have own state, when they do, it’s just UI state
        - Named anything that’s a UI noun

4. Actions [these are payloads of information that send data from your application to your store] (https://redux.js.org/docs/basics/Actions.html)

5. Reducers [Actions describe the fact that something happened, but don't specify how the application's state changes in response. This is the job of reducers.] (https://redux.js.org/docs/basics/Reducers.html)

## Data Flow in Redux App

How does data flow through the application? Let's see.

[Store] -> [Provider] -> [Components] -> [Actions] -> [Reducers] ... -> [back to Store]

### When do we need redux?

As seen above there is a single source of truth for data, so when the application needs to handle a lot of data then to keep data consistent we need redux.

Extra installed packages -

- `react-redux`

- ``

#### Let's start coding

- Creating Store

```[lang="javascript"]
import { createStore } from 'react-redux';
```

- Initialization of Store

```[lang="javascript"]
const store = createStore([reducer], [initial store]);
```

How do I know when the something changes in Store?

We can subscribe to store whenever there is a change wrt store.

```[lang="javascript"]
store.subscribe(function(){
  console.log("Current store state", store.getState());
})
```

- Creating reducer

```[lang="javascript"]
function reducer (state, action){
  if(switch (action.type){
    // do something with state here
  }
}
```

How can we combine multiple reducers?

```[lang="javascript"]
import { combineReducers, createStore } from "redux";

const A_Reducer = function(state, action){
  // do something on Store's A object
}

const B_Reducer = function(state, action){
  // do something on Store's B object
}

const reducer = combineReducers({
  A: A_Reducer,
  B: B_Reducer
});

const store = createStore(reducer);
```

- Creating an Action

Action can be dispatched in various ways, for example button click calls a function which triggers an action or 
we can directly create an action in JS. The later one is explained here.

```[lang="javascript"]
store.dispatch({
  type: "ACTION_NAME", // this key must be same always.
  payload: "Whatever the payload/data top be sent to reducer"
})
```

- Adding Redux Middleware (Middlewares intercepts the actions, so it has the capability to modify the action or to cancel the action.)

```[lang="javascript"]
import { applyMiddleware, createStore } from "redux";

const logger = (store) => (next) => (action) {
  console.log("Action ", action.type, action.payload);
  next(action); // this triggers the next middleware in the row
}

const middleware = applyMiddleware(logger);

const store = createStore(reducers, initial_state, middleware);
```

There is npm package for logging middleware called [logger] (https://www.npmjs.com/package/redux-logger).

- Binding Redux Store to Components

As we know now that React is the only view layer for our applications, binding REDUX with React we will be binding Data Store with View Layer.

So then we'll be having our MVC complete. [Data (Model)] -> [Components (View)] -> [Controllers (Actions and Reducers)]

There are multiple steps here in the connection process which include the following:

a) Provider usage

```[lang="javascript"]
import { Provider } from "react-redux";
import store from '../store.js'

// connecting with Redux Provider

ReactDOM.render(
  <Provider store={store}>
    <AppContainer/>
  </Provider>
, document.getElementById("app"))

```

b) Data/Store access in components

There are two ways here.
First one is,

```[lang="javascript"]
@connect(mapStateToProps)
class MyComponent extends Component {}
```

Second one is,

```[lang="javascript"]
class MyComponent extends Component {}
MyComponent = connect(mapStateToProps)(MyComponent)
```

Example -

```[lang="javascript"]
@connect((store) => {
  return {
    counter: store.counter
  }
})
export default class CounterComponent extends Component{
  render (){
    return (
      <h1>{this.props.counter}</h1>
      {/* Now counter variable is the one which we have from connect decorator */}
    )
  }
}
```

c) Firing actions from components

```[lang="javascript"]
import { incr_counter } from '../actions'

@connect((store) => {
  return {
    counter: store.counter
  }
})
export default class CounterComponent extends Component{
  incrementCounter(){
    this.props.dispatch(incr_counter())
  }
  render (){
    return (
      <h1>{this.props.counter}</h1>
      {/* Now counter variable is the one which we have from connect decorator */}

      <button onClick={this.incrementCounter.bind(this)}>Increment Counter</button>
    )
  }
}

```

## FAQ

1. What is immutability in Javascript?

2. What will be the output of the following code snippets?

```[lang="javascript"]
var student1 = {name: "KS", subjects:["Maths", "Physics", "Chemistry"]}
var student2 = student1;

student2.name="Kunal";
console.log(student1, student2);
```

```[lang="javascript"]
var student1 = {name: "KS", subjects:["Maths", "Physics", "Chemistry"]}
var student2 = student1;

student2.subjects=["Data Structures", "Algorithms"];
console.log(student1, student2);
```

```[lang="javascript"]
var student1 = {name: "KS", subjects:["Maths", "Physics", "Chemistry"]}
var student2 = {..student1, name: "Kunal"};
console.log(student1, student2);

var student3 = {..student1, subjects: ["Data Structures", "Algorithms"]};
console.log(student1, student3);
```

4. How should we structure our project's app?

A project can be simply restructured as follows.

- src
  - js
    - actions
    - components
    - reducers
