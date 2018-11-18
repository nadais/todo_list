import { ITask, Task } from "../model/task";
import { ObjectID } from "bson";
ObjectID.prototype.valueOf = function () {
	return this.toString();
};
export abstract class TaskController{
    public static async updateTask(input: { _id: any; title?: string; description?: string; }): Promise<ITask> {
        await Task.updateOne({_id: input._id },{title: input.title } );
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
    public static deleteTask(filter: any): Promise<any> {
        return new Promise( (resolve,reject ) => {
            if(filter._id !== null)
            {
                filter._id = new ObjectID(filter._id);
            }
            Task.deleteOne( filter, err => {
                if ( err )
                {
                    reject( err );
                }
                else
                {
                    resolve();
                }
            } );
        } )
    }
    public static deleteAllTasks(filter: object): Promise<any> {
        return new Promise( (resolve,reject ) => {
            Task.deleteMany( filter, err => {
                if ( err )
                {
                    reject( err );
                }
                else
                {
                    resolve();
                }
            } );
        } )
    }

}