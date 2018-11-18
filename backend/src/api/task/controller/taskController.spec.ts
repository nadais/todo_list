import "jest";
import { TaskController } from './taskController';
import { Task } from "../model/task";
import * as mongoose from "mongoose";

/**
 * Make sure database is always empty before each test
 * so there are no dependencies from one to the other
 */
beforeEach( () => {
    Task.deleteMany( {}, err => {
        if( err ) throw err;
    } );
});
/**
 * Open the mongo connection before this test set
 * 
 * Force closing afterwards
 */
beforeAll( async () => 
{
    await mongoose.connect("mongodb://db:27017/db_test", 
  {
    useNewUrlParser: true 
  });
  return;
});
afterAll( async () => 
{
    await mongoose.disconnect();
    return;
})

test('Task deletion', async () => 
{
    let tasks = await TaskController.createTasks([{title: 'something'}]);
    await TaskController.deleteTask({ _id: tasks[0]._id });
    let afterTasks = await TaskController.getTasks({ _id: tasks[0]._id });
    expect(afterTasks.length).toEqual( 0 );
} );

test('Single Task creation', async () => 
{
    let tasks = await TaskController.getTasks({});
    await TaskController.createTasks([{title: 'Some task'}]);
    let afterTasks = await TaskController.getTasks({});
    expect(afterTasks.length).toEqual(tasks.length + 1 );
} );
test('Task creation', async () => 
{
    let tasks = await TaskController.getTasks({});
    let creatingTasks = [];
    for(let i = 0;i<10;i++)
    {
        creatingTasks.push({title: "mass created task"});
    }
    await TaskController.createTasks(creatingTasks);
    let afterTasks = await TaskController.getTasks({});
    expect(afterTasks.length).toEqual(tasks.length + 10 );
} );

test('Task delete all by description', async () => 
{
    let creatingTasks = [];
    for(let i = 0;i<10;i++)
    {
        creatingTasks.push({title: "mass created task"});
    }
    await TaskController.createTasks(creatingTasks);
    let tasks = await TaskController.getTasks({});
    await TaskController.deleteAllTasks({title: 'mass created task'});
    let afterTasks = await TaskController.getTasks({});
    expect(afterTasks.length).toEqual(tasks.length - 10 );
} );

test('Task update', async () => 
{
    let tasks = await TaskController.createTasks([{title: 'Updating task'}]);

    
    let task = await TaskController.updateTask({_id: tasks[0]._id, title: 'Updated task'});
    expect( task.title ).toEqual( 'Updated task' );
} );