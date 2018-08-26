import { Router } from "express";
import graphqlHTTP = require("express-graphql");
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs, resolvers } from "./task.graphql";
const schema = makeExecutableSchema(
    {
        typeDefs,
        resolvers
    })

export class TaskRouter 
{
    static routes(): Router 
    {
        return Router()
        .use('/task', graphqlHTTP(
            {
                schema: schema,
                graphiql: true
            }))
    }
}