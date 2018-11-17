import { ITask, Task } from "../model/task";
import { ObjectID } from "bson";
export abstract class TaskController{
    public static async updateTask(input: { _id: any; title?: string; description?: string; }): Promise<ITask> {
        await Task.update({_id: input._id },{title: input.title } );
        let task = this.getTasks( {_id: input._id }, true );
        return task;
    }
    public static getTasks(params: any, single: boolean = false): any {
        return single ? Task.findOne( params ) : Task.find( params );
    }
    public static async createTasks(tasks: object[] ): Promise<ITask[]> {
        const result = await Task.create( tasks );
        return result;
    }
    public static deleteTask(filter: any): any {
        if(filter._id !== null)
        {
            filter._id = new ObjectID(filter._id);
        }
        return Task.deleteOne( filter );
    }
    public static deleteAllTasks(filter: object): any {
        return Task.deleteMany( filter );
    }

}