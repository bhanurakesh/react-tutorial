import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Auxx';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {

  constructor(props){
      super(props);
      console.log('[App.js] Inside Construtor' , props);

      this.state = {
        persons: [
          { id: 'asfa1', name: 'Max', age: 28 },
          { id: 'vasdf1', name: 'Manu', age: 29 },
          { id: 'asdf1', name: 'Stephanie', age: 26 }
        ],
        otherState: 'some other value',
        showPersons: false,
        toggleClicked: 0,
        authenticated: false
      }
  }

componentWillMount(){
    console.log('[App.js] Inside componentWillMount()');
  }

componentDidMount(){
    console.log('[App.js] Inside componentDidMount()');
  }

/* shouldComponentUpdate(nextProps, nextState){
    console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
    return nextState.persons !== this.state.persons ||
          nextState.showPersons !== this.state.showPersons;
} */
componentWillUpdate(nextProps, nextState){
    console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
}

static getDerivedStateFromProps(nextProps, prevState) {
  console.log(
    "[UPDATE App.js] Inside getDerivedStateFromProps",
    nextProps,
    prevState
  );

  return prevState;
}

getSnapshotBeforeUpdate() {
  console.log(
    "[UPDATE App.js] Inside getSnapshotBeforeUpdate"
  );
}

componentDidUpdate(){
   console.log('[UPDATE App.js] Inside componentDidUpdate');
}

/*   state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf1', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false 
  }
 */
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
    this.setState( (prevState, props) => { 
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }      
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

  loginHadler = ()=> {
    this.setState({
      authenticated:true
    });
  }

  render() {
    console.log('[App.js] Inside render()');
    let persons = null;    

    if (this.state.showPersons) {
      persons =         
          <Persons 
           persons= {this.state.persons} 
           clicked= {this.deletePersonHandler}
           changed= {this.nameChangedHandler} 
           />;
    }

    return (
        <Aux>
        <button onClick={()=> {this.setState({showPersons: true})}}> Show Persons </button>
        <Cockpit 
        appTitle= {this.props.title}
        showPersons = {this.state.showPersons}
        persons = {this.state.persons}
        login={this.loginHadler}
        clicked = {this.togglePersonsHandler} /> 
        <AuthContext.Provider value={this.state.authenticated}>
        {persons}
        </AuthContext.Provider>
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
      </Aux>
    );

    //return React.createElement('div', {className: 'App'}, React.createElement('h1', 'null', 'Hi, I\'am a React App!!'));
  }
}

export default withClass(App, classes.App);
