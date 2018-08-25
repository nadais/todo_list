import { Router, Response } from "express";
import { Task } from "../model/task";
export class TaskRouter 
{
    static routes(): Router 
    {
        return Router()
        .get('/task', async (_, res: Response) => 
        {
            const tasks = await Task.find({}).exec();
            res.json(tasks);
        })
    }
}