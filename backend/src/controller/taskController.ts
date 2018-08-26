import { Task, ITask } from "../model/task";
export abstract class TaskController 
{
    static getTasks(params: any, single: boolean = false): any {
        return single ? Task.findOne( params ) : Task.find( params );
    }
    static async createTasks(tasks: Object[] ): Promise<ITask[]> {
        let result = await Task.create( tasks );
        return result;
    }
    static deleteTask(filter: Object): any {
        return Task.deleteOne( filter );
    }
    static deleteAllTasks(filter: Object): any {
        return Task.deleteMany( filter )
    }

}