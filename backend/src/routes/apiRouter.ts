import { Router } from "express";
import graphqlHTTP = require("express-graphql");
import { makeExecutableSchema } from "graphql-tools";
import { taskResolvers, taskTypedefs } from "../api/api.module";
const schema = makeExecutableSchema(
    {
        resolvers: taskResolvers,
        typeDefs: taskTypedefs,
    });

export class ApiRouter
{
    public static routes(): Router
    {
        return Router()
        .use("/api", graphqlHTTP(
            {
                graphiql: true,
                schema,
            }));
    }
}