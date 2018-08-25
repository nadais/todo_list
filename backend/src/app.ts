import * as express from 'express';
import { json } from 'body-parser';
import { TaskRouter } from './routes';

const port = process.env.PORT || 3200;
const app = express();
app.use(json());
app.use("/",TaskRouter.routes());


const server = app.listen(port, (err : Error) =>
{
  if (err)
  {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})
export { server };