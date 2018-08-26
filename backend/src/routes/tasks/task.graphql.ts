import { TaskController } from "../../controller/taskController";

export var typeDefs = `
type Task 
{
    _id: ID!
    description: String!
}
input TaskInput 
{
    _id: ID
    description: String
}

type Query
{
    allTasks: [Task],
    getTask(_id: ID,description: String): Task
}

type Mutation
{
    createTask(description: String!): Task!
    createTasks(tasks: [String]): [Task]!
    deleteTask(description: String!): Task!
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
        createTask: async ( _, args: { description: string } ) => 
        {
            const task = await TaskController.createTasks( [ args.description ] );
            return task;
        },
        createTasks: async (_, args: { tasks: any[]}) => 
        {
            const createdTasks = await TaskController.createTasks( args.tasks );
            return createdTasks;
        },
        deleteTask: async (_, args) => 
        {
            const task = await TaskController.deleteTask( args );
            return task;
        },
        deleteTasks: async (_, args) => 
        {
            const tasks = await TaskController.deleteAllTasks( args );
            return tasks;
        }
    }
}