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

const cartSchema = new mongoose.Schema({
    email:String,
    items:[{
        name: String,
        quantity:Number
    }]
})

export const Cart = mongoose.model('Cart',cartSchema);

