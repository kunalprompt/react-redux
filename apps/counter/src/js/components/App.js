import React, { Component } from "react";
import { connect } from "react-redux";

import counter_action from '../actions/counter_actions'

class App extends Component{

    render(){
        console.log(this.props);
        return (
            <div>
                <h1>Counter</h1>
                <h2>{ this.props.counter }</h2>
                <input type="submit" value="Increment" onClick = { (e) => this.props.update(e, "INCR") }/> <br/>
                <input type="submit" value="Decrement" onClick = { (e) => this.props.update(e, "DECR") } />
            </div>
        )
    }
}

/* 
The Props required in Component are now to be passed from the Redux Store.
Therefore here the return type should be an object = props required in the Component 
*/
function mapStoreToProps(store) {
    return {
        counter: store.counter
    }
}

/* 
We've defined actions for Redux Store which need to be present in the 
component which will then trigger these actions. Here we just bind the actions to
Component.
*/
function mapActionsToProps(dispatch) {
    return {
        update: function(event, arg) {
            dispatch(counter_action(arg))
        }
    }
}

/* Connecting Store, Props, and Actions to Component */
export default connect(mapStoreToProps, mapActionsToProps)(App);
