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

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    quantity: Number,
    unitPrice: Number
});

export const Product = mongoose.model('Product',productSchema);

