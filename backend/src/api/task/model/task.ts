import { mongoose } from "../../../config/database";
import { Schema, Document, Model } from "mongoose";

const schema = new Schema(
    {
        description: 
        {
            type: String
        },
        title:
        {
            type: String,
            required: true
        }
    });

export interface ITask extends Document 
{
    description?: string;
    title?: string;
}


export interface ITaskModel extends Model<ITask>
{

}

export const Task = mongoose.model<ITask>("Task", schema) as ITaskModel;
