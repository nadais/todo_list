import React, { Component } from 'react';

class Task extends Component {
  constructor()
  {
    super();
  }
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default Task;
