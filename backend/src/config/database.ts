import * as mongoose from "mongoose";
if (process.env.NODE_ENV !== "test")
{
  mongoose.connect("mongodb://db:27017/db_dev", 
  {
    useNewUrlParser: true 
  });
}

export { mongoose };