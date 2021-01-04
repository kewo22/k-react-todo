import './App.css';
import TodoList from "./TodoList";
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faEdit, faSave, faTrash)

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  handelAddNewTodo = (allTodos) => {
    this.setState({ todos: allTodos });
  }

  render() {
    return (
      <React.Fragment>
        <TodoList todos={this.state.todos} onAddNewTodo={this.handelAddNewTodo} />
      </React.Fragment >
    );
  }

}

export default App;
