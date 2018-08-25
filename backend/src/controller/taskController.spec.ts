import "jest";
import { TaskController } from './taskController';

test('Task deletion', async () => 
{
    await TaskController.createTasks([{description: 'Some task'}]);
    let tasks = await TaskController.getTasks({});
    await TaskController.deleteTask({description: 'Some task'});
    let afterTasks = await TaskController.getTasks({});
    expect(tasks.length).toEqual(afterTasks.length + 1 );
} );

test('Task creation', async () => 
{
    let tasks = await TaskController.getTasks({});
    let creatingTasks = [];
    for(let i = 0;i<10;i++)
    {
        creatingTasks.push({description: "mass created task"});
    }
    await TaskController.createTasks(creatingTasks);
    let afterTasks = await TaskController.getTasks({});
    expect(afterTasks.length).toEqual(tasks.length + 10 );
} );

test('Get task with ODATA', async () => 
{
    let tasks = await TaskController.getTasks({$filter: "description eq 'mass created task'"});
    expect(tasks.length).toEqual( 10 );
} );

test('Task delete all by description', async () => 
{
    let tasks = await TaskController.getTasks({});
    await TaskController.deleteAllTasks({description: 'mass created task'});
    let afterTasks = await TaskController.getTasks({});
    expect(afterTasks.length).toEqual(tasks.length - 10 );
} );

