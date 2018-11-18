import React, { Component } from 'react';
import Task from './Task';
import Button from 'react-bootstrap/lib/Button';
import { handleRequest } from './RequestHandler';
class Board extends Component
{
    constructor()
    {
        super();
        this.state = { tasks: [], createTask: false };
        this.createTask = this.createTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress( e )
    {
        this.setState({ tasks: this.state.tasks, createTask: this.refs.newTaskTitle.value !== '' } );
        if( e.key === 'Enter' )
        {
            this.createTask();
        }
    }

    componentDidMount() 
    {
        const payload = `
        query
        {
            allTasks
            {
                title
                description
                _id
            }
        }`
        handleRequest(payload).then( res => 
            {
                this.setState(
                    {
                        tasks: res.data.allTasks
                    });
            });
    }

    async createTask()
    {
        let tasks = this.state.tasks;
        let newTask = {
            title: this.refs.newTaskTitle.value
        };
        const payload = `
        mutation
        {
            createTask( 
                task: 
                {
                    title: "${newTask.title}"
                }
            )
            {
                title
                description
                _id
            }
        }`
        let res = await handleRequest(payload);
        tasks.push(
            res.data.createTask
        );
        this.setState({tasks, createTask: this.state.createTask } );

        this.refs.newTaskTitle.value = '';
    }

    async deleteTask( id )
    {
        const payload = `
        mutation
        {
            deleteTask( 
                task: 
                {
                    _id: "${id}"
                }
            )
        }`
        let result = await handleRequest(payload);
        if( result.data.deleteTask === true)
        {
            let tasks = this.state.tasks;
            tasks = tasks.filter( task => task._id !== id );
            this.setState(
                {
                    tasks
                });
        }
    }

    async editTask( id, title )
    {
        const payload = `
        mutation
        {
            updateTask( 
                task: 
                {
                    _id: "${id}",
                    title: "${title}"
                }
            )
            {
                title
                description
                _id
            }
        }`
        let result = await handleRequest(payload);
        result = result.data.updateTask;
        let newTasks = this.state.tasks.map( task => 
            {
                return task._id === result._id ? result : task;
            });
        this.setState( { tasks: newTasks } );
    }

    render()
    {
        return (
          <div className="container">
            <h1>Simple task manager</h1>
            <div className="input-group mb-3">
                <label className="sr-only" htmlFor="newTaskTitle">New task title</label>
                <input 
                type='text' ref='newTaskTitle' id="newTaskTitle"
                onKeyPress={this.handleKeyPress} placeholder='New task title' 
                className="form-control" />
                <div className="input-group-append">
                    <Button className="btn btn-success" disabled={! this.state.createTask} onClick={this.createTask}>
                    <span className="fa fa-plus">
                    </span>
                    </Button>
                </div>
            </div>
            <ul className="list-group">
                {
                    this.state.tasks.map(task => {
                        return (
                        <Task title={task.title} description={task.description} 
                        key={task._id} taskId={task._id}
                        deleteTask={this.deleteTask} editTask={this.editTask} /> )  
                    })
                }
            </ul>
          </div>
        )
    }
}

export default Board;