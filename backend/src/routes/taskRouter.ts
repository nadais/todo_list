import { Router, Response, Request } from "express";
import { TaskController } from "../controller/taskController";

export abstract class TaskRouteFunctions 
{
    static async getAllTasks( _ : Request, res : Response) 
    {
        const tasks = await TaskController.getAllTasks();
        res.json(tasks);
    }
    static async getTask(req: Request, res: Response)
    {
        const tasks = await TaskController.getTask(req.params.id);
        res.json(tasks);   
    }
}

export class TaskRouter 
{
    static routes(): Router 
    {
        return Router()
        .get('/task', TaskRouteFunctions.getAllTasks)
        .get('/task/:id', TaskRouteFunctions.getTask);
    }
}
