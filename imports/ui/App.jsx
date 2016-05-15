import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

class App extends Component {
  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      title: text,
      createdAt: new Date(),
    });

    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  renderForm() {
    return (
      <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
        <input
          type="text"
          ref="textInput"
          placeholder="Type to add new tasks"
        />
      </form>
    )
  }

  render() {
    return (
      <div className="container">
          <div className="row">
              <div className="col s12 center">
                  <ul className="collection with-header">
                      <li className="collection-header">
                        {this.renderForm()}
                      </li>
                      <div id='listComponent'>{this.renderTasks()}</div>
                  </ul>
              </div>
          </div>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);
