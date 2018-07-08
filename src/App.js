import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf1', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  switchNameHandler = (newName) => {
    //console.log('Was Clicked!');
    // Don't do THIS: this.state.persons[0].name="Maximilian";
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    })
  }

  nameChangedHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(
      p => {
        return p.id === id;
      }
    )
    const prs = { ...this.state.persons[personIndex] };
    //const prs = Object.assign({}, this.state.persons[personIndex]);

    prs.name = event.target.value;

    const nwpersons = [...this.state.persons];
    nwpersons[personIndex] = prs;

    this.setState({
      persons: nwpersons
    })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  }

  deletePersonHandler = (personIndex) => {
    //const nwpersons = this.state.persons.slice(); 
    const nwpersons = [...this.state.persons];
    nwpersons.splice(personIndex, 1);

    this.setState({
      persons: nwpersons
    });
  }

  render() {

    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((prsn, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={prsn.name}
              age={prsn.age}
              key={prsn.id}
              changed={(event) => this.nameChangedHandler(event, prsn.id)} />
          })
          }
        </div>
      );

      btnClass = classes.Red;
    }

    const assignedClasses = [];

    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1> Hi I am React App! </h1>
        <p className={assignedClasses.join(' ')}>   This is really working </p>
        <button
          onClick={this.switchNameHandler.bind(this, 'Maximillian')}
          key="key1">
          Switch User </button>
        <button onClick={() => this.switchNameHandler('Bhanu!!')}
          key="key2">
          Other way switch </button>
        <button
          className={btnClass}
          onClick={this.togglePersonsHandler}
          key="key3">
          Toggle User
      </button>
        {persons}
        {/*       { this.state.showPersons? 
      <div>
        <Person 
        name= { this.state.persons[0].name } 
        age= { this.state.persons[0].age}/>
      <Person 
        name= { this.state.persons[1].name } 
        age= { this.state.persons[1].age }
        changed= {this.nameChangedHandler}/>
      <Person 
        name= { this.state.persons[2].name } 
        age= { this.state.persons[2].age }
        click={ this.switchNameHandler.bind(this, 'Max!') }> My Hobbies: Racing </Person>
      </div> : null
      } */}

      </div>

    );

    //return React.createElement('div', {className: 'App'}, React.createElement('h1', 'null', 'Hi, I\'am a React App!!'));
  }
}

export default App;
