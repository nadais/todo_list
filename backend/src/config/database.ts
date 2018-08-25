import * as mongoose from "mongoose";

if (process.env.NODE_ENV === "testing")
{
  mongoose.connect("mongodb://db:27017/db_test", 
  {
    useNewUrlParser: true 
  });
} else {
  mongoose.connect("mongodb://db:27017/db_dev", 
  {
    useNewUrlParser: true 
  });

}

export { mongoose };