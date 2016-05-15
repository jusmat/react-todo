import React, { Component, PropTypes } from 'react';

import { Tasks } from '../api/tasks.js';

export default class Task extends Component {
  toggleChecked() {
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  render() {
    return (
      <li className="collection-item">
        <div className='item-bar'>
          <div className='status'>
            <input type="checkbox" checked={this.props.task.checked} /><label for="item" onClick={this.toggleChecked.bind(this)}></label>
          </div>
          <div className='title'>{this.props.task.title}</div>
          <div className='actions'>
            <i className='material-icons' onClick={this.deleteThisTask.bind(this)}>delete</i>
          </div>
        </div>
      </li>
    );
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
};
