import { TaskController } from "./controller/taskController";

export var typeDefs = `
type Task 
{
    _id: ID!
    title: String!
    description: String
}
input TaskInput 
{
    _id: ID
    title: String
    description: String
}

type Query
{
    allTasks: [Task],
    getTask(_id: ID,description: String): Task
}

type Mutation
{
    createTask(task: TaskInput): Task!
    createTasks(tasks: [TaskInput]): [Task]!
    updateTask(task: TaskInput): Task!
    deleteTask(task: TaskInput!): Boolean!
    deleteTasks(tasks:  [TaskInput]): [Task]!
}
`
export var resolvers = {
    Query: {
        allTasks: async ( ) => 
        {
            const tasks = await TaskController.getTasks({});
            return tasks;
        },
        getTask: async ( _, args) => 
        {
            const tasks = await TaskController.getTasks(args,true);
            return tasks;
        }
    },
    Mutation: 
    {
        createTask: async ( _, args: any ) => 
        {
            const tasks = await TaskController.createTasks(
                [ args.task ] );
            return tasks[0];
        },
        createTasks: async (_, args: { tasks: any[]}) => 
        {
            const createdTasks = await TaskController.createTasks( args.tasks );
            return createdTasks;
        },
        updateTask: async ( _, args: any ) => 
        {
            const task = await TaskController.updateTask(
                args.task );
            return task;
        },
        deleteTask: async (_, args: any): Promise<boolean> => 
        {
            const task = await TaskController.deleteTask( args.task );
            return task.n > 0;
        },
        deleteTasks: async (_, args: any[]) => 
        {
            const tasks = await TaskController.deleteAllTasks( args );
            return tasks;
        }
    }
}