import app from "./app";

const port = process.env.PORT || 3200

app.listen(port, (err : Error) =>
{
  if (err)
  {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})