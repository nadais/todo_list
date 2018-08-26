import express = require('express');
import graphqlHTTP = require("express-graphql");
import { buildSchema } from "graphql"; 

import { TaskRouter } from './routes';

const port = process.env.PORT || 3200;
const app = express();
let schema = buildSchema(`
type Query {
    hello: String
}
`);
const root = {
    hello: () => {
      return 'Hello world!';
    },
  };

app.use( express.json());
app.use( express.urlencoded({extended: true}));
app.use("/",TaskRouter.routes());
app.use('/graphQl',graphqlHTTP(
  {
      schema: schema,
      rootValue: root,
      graphiql: true
  }));



const server = app.listen(port, (err : Error) =>
{
  if (err)
  {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})
export { server };