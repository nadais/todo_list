import React, { Component } from 'react';
import Task from "./Task";
class Board extends Component
{
    constructor() 
    {
        super();
        this.state = { tasks: [] };
        this.createTask = this.createTask.bind(this);
    }
    createTask()
    {
        var tasks = this.state.tasks;
        tasks.push(
            {
                title: this.refs.newTaskTitle.value,
                description: this.refs.newTaskDescription.value
            });
        this.setState({
            tasks
        })
    }
    render()
    {
        return (
            <div>
                <input type="text" ref="newTaskTitle" defaultValue="" placeholder="New task title" />
                <input type="text" ref="newTaskDescription" defaultValue="" placeholder="New task description" />
                <button onClick={this.createTask} className="btn btn-primary" >Create new task </button>
                {
                    this.state.tasks.map(task => {
                    return (<Task title={task.title} description={task.description} /> )  
                })}
            </div>
        )
    }
}

export default Board;