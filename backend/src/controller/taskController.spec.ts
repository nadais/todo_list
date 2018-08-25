import "jest";
import { TaskController } from './taskController';

test('Task obtainment',async ( ) => {
    let tasks = await TaskController.getAllTasks();
    expect(tasks).toBeInstanceOf(Array);
    expect(tasks.length).toEqual(0);
});
