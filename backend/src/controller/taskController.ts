import { Task, ITask } from "../model/task";

export abstract class TaskController 
{
    static async  getTask(id: number): Promise<ITask | null> {
        return Task.findById(id).exec();
    }
    static getAllTasks(): Promise<ITask[]>
    {
        return Task.find( {} ).exec();
    }

}