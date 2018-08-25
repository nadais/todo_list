import { Task } from './task';
import "jest";

test('Task creation empty',() => {
    let task = new Task();
  expect(task).toBeInstanceOf(Task);
  expect(task.description).toBe("empty");
});
