import { Router, Response, Request } from "express";
import { TaskController } from "../controller/taskController";

export abstract class TaskRouteFunctions 
{
    static async deleteTask(req: Request, res: Response)
    {
        let result = await TaskController.deleteTask(
            {
                description: req.params.description
            });
        res.json(result);
    }
    static async createTask(req: Request, res: Response)
    {
        let result = await TaskController.createTasks([req.body]);
        res.json(result);
    }
    static async getTasks( req: Request, res: Response)
    {
        const tasks = await TaskController.getTasks(req.query);
        res.json( tasks );
    }
}

export class TaskRouter 
{
    static routes(): Router 
    {
        return Router()
        .get('/task', TaskRouteFunctions.getTasks)
        .post('/task', TaskRouteFunctions.createTask)
        .delete('/task/:description',TaskRouteFunctions.deleteTask);
    }
}
