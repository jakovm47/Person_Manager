import React, { Component } from 'react';
import classes from  './App.css';
import Person from '../components/Persons/Person/Person.js';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.js';
import Persons from '../components/Persons/Persons.js';
import Cockpit from '../components/Cockpit/Cockpit.js';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('App.js constructor');
  }


  state = {
    persons: [
      {id: '1', name: 'Max', age: 28},
      {id: '2', name: 'Manu', age: 29},
      {id: '3', name: 'Stephanie', age: 26}
    ],
    otherState : 'some other value',
    showPersons: false,
    showCockpit: true
    
  }

  static getDerivedStateFromProps(props, state) {
    console.log('App.js getDerivedStateFromProps', props);
    return state;
  }


  componentDidMount() {
    console.log('App.js componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('App.js shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('App.js componentDidUpdate');
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} );
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = (event) => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }


    render() {

      console.log('App.js render');

      let persons = null;

      if ( this.state.showPersons ) {
        persons = (  
          <Persons 
              persons={this.state.persons}
              clicked={this.deletePersonHandler}
              changed={this.nameChangedHandler} />
        );
  
      }

      return (
          <div className={classes.App}>
          <button 
          onClick={() => {
            this.setState({showCockpit: false});
          }}
          >Remove cockpit</button>
            {this.state.showCockpit ? <Cockpit 
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler} /> : null }
            {persons}
          </div>
    
      );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a react app!!!'));
  

  }
}

export default App;
