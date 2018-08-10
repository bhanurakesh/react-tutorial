import React from 'react';
import classes from './Cockpit.css';
import Aux from '../../hoc/Auxx';

const cockpit = (props) => {

    const assignedClasses = [];
    let btnClass = classes.Button; 

    if(props.showPersons) {
       btnClass = [classes.Button,classes.Red].join(' ');
    }
    
    if (props.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (props.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
        <Aux>
        
            <h1> {props.appTitle} </h1>
            <p className={assignedClasses.join(' ')}>   This is really working </p>
{/*             <button
                onClick={this.switchNameHandler.bind(this, 'Maximillian')}
                key="key1">
                Switch User </button>
            <button onClick={() => this.switchNameHandler('Bhanu!!')}
                key="key2">
                Other way switch </button> */}
            <button
                className={btnClass}
                onClick={props.clicked}
                key="key3">
                Toggle User
            </button>
            <button onClick={props.login}> Log in </button>

        
        </Aux>
    );
}

export default cockpit;