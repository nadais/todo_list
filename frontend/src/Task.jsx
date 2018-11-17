import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Task extends Component {

  constructor()
  {
    super();
    this.state = {editing: false };
    this.handleKeyPress = this.handleKeyPress.bind( this );
  }
  setEditing( editing )
  {
    this.setState({ editing: typeof editing === "boolean" ? editing : !this.state.editing } );
  }

  deleteTask()
  {
   return this.props.deleteTask( this.props.taskId );
  }
  editTask()
  {
    this.setEditing( false );
   return this.props.editTask( this.props.taskId, this.refs.taskTitle.value );
  }

  handleKeyPress( e )
  {
      if( e.key === 'Enter' )
      {
          this.editTask();
      }
  }
  render() {
    if ( this.state.editing === true ) 
    {       
      return <li className="list-group-item">
          <input 
          type='text' ref='taskTitle' id="innerTaskTitle"
          defaultValue={this.props.title}
          onKeyPress={this.handleKeyPress}
          className="form-control" />
          <span className="fa fa-check pull-right" onClick={this.editTask.bind(this)}></span>
          <span className="fa fa-times-circle pull-right" onClick={this.setEditing.bind(this)}></span>
      </li>
    }
    else
    {
      return <li className="list-group-item">
                {this.props.title}
                <span className="fa fa-trash pull-right" onClick={this.deleteTask.bind(this)}></span>
                <span className="fa fa-pencil pull-right" onClick={this.setEditing.bind(this)}></span>
              </li>
    }
  }
}

Task.propTypes = 
{
  title: PropTypes.string,
  taskId: PropTypes.string,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func
}
export default Task;
