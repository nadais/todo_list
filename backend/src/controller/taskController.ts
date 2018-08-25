import { Task, ITask } from "../model/task";
import { createFilter } from "odata-v4-mongodb";
type ODataParams = 
{
    $top?: number,
    $skip?: number,
    $filter?: string,
    $orderBy?: string,
    $select?: string

}

export abstract class TaskController 
{
    static getTasks(params: ODataParams): any {
        let filter = {};
        if(params.$filter != null)
        {
            filter = createFilter(params.$filter);
        }
        return Task.find(filter);
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