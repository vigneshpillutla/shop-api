import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

//@ts-ignore
const db_string:string = process.env.DB_STRING;

mongoose.connect(db_string,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
});

const userSchema = new mongoose.Schema({
    email:String,
    password: String
})

export const User = mongoose.model('User',userSchema);

