import { Task } from './task';
import "jest";


test('Task creation title',() => {
  let task = new Task({title: "some task"});
expect(task).toBeInstanceOf(Task);
expect(task.description).toBeUndefined();
expect(task.title).toBe("some task");
});

test('Task creation description',() => {
  let task = new Task({title: "extra task",description: "some task"});
  expect(task).toBeInstanceOf(Task);
  expect(task.description).toBe("some task");
});

test('Task creation with no title should raise exception', async () =>
{
  try 
  {
    await new Task({description: "some task"}).validate();
    fail();
  }
  catch ( e )
  {
    expect(e.name).toEqual('ValidationError');
    expect(e.message).toEqual("Task validation failed: title: Path `title` is required.");

  }  
});