import express ,{ Application, Request, Response } from 'express';
import ServiceUtility from './service'

class ShopController{
    async createUser(req:Request,res:Response){
        try{
            const user = await ServiceUtility.createUser(req.body);
            const cartResult  = await ServiceUtility.createCart(req.body.email);
            res.status(200).send('User created')
        }
        catch(err){
            res.status(500).send( `Unexpected error occured ${err}`);
        }
    }
    async addProduct(req:Request,res:Response){
        try{
            const product = await ServiceUtility.addProduct(req.body);
            res.status(200).send(`${req.body.name} added!`);
        }
        catch(err){
            res.status(500).send(`Could not add ${req.body.name}`);
        }
    }
    async getAllProducts(req:Request,res:Response){
        try{
            const allProducts =await ServiceUtility.listProducts();
            res.status(200).send(allProducts);
        }
        catch(err){
            res.status(500).send( `Could not get products ${err}`);
        }
    }
    async addToCart(req:Request,res:Response){
        try{
            await ServiceUtility.addToCart(req.body.email,req.body.name,req.body.quantity);
            res.status(200).send(`Item added to cart!`);
        }
        catch(err){
            res.status(500).send(`Could not add item to cart ${err}`);
        }
    }
    async updateCart(req:Request,res:Response){
        try{
            const {email,name,quantity} = req.body;
            await ServiceUtility.updateCart(email,name,quantity);
            res.status(200).send(`${name} quantity updated to ${quantity}`);
        }
        catch(err){
            res.status(500).send(`Could not update cart!`);
        }
    }
    async getCart(req:Request,res:Response){
        try{
            const cart = await ServiceUtility.listCart(req.body.email);
            //@ts-ignore
            res.status(200).send(cart.items);
        }
        catch(err){
            res.status(500).send(`Could not get cart ${err}`);
        }
    }
}

export default new ShopController();