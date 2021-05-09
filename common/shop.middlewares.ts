import express, { Application, NextFunction, Request, Response } from 'express';
import ServiceUtility from './service'
class validationMiddleware{
    async validateProductFields(req:Request,res:Response,next:NextFunction){
        const {name,image,description,quantity,unitPrice} = req.body;
        if(name && image && description && quantity && unitPrice){
            next();
        }
        else{
            res.status(400).send('Missing product Fields!');
        }

    }
    async productAlreadyAdded(req:Request,res:Response,next:NextFunction){
        if(! await ServiceUtility.productExists(req.body.name)){
            next();
        }
        else{
            res.status(400).send('Product already exists!');
        }
    }
    async validateCartFields(req:Request,res:Response,next:NextFunction){
        const {email,name,quantity} = req.body;
        if(email && name && quantity){
            next();
        }
        else{
            res.status(400).send('Missing Cart Fields');
        }
    }
    async checkIfProductExists(req:Request,res:Response,next:NextFunction){
        if(await ServiceUtility.productExists(req.body.name)){
            next();
        }
        else{
            res.status(400).send('Invalid Product!');
        }
    }
    async checkIfCartExists(req:Request,res:Response,next:NextFunction){
        if(req.body.email && await ServiceUtility.cartExists(req.body.email)){
            next();
        }
        else{
            res.status(400).send('Cart not found!');
        }
    }
    async canAddProduct(req:Request,res:Response,next:NextFunction){
        const {email,name} = req.body;
        const cart = await ServiceUtility.listCart(email);
        //@ts-ignore
        const items = cart.items;
        const filtered = items.filter((elem: { name: any; })=>elem.name==name);
        if(filtered.length==0){
            next();
        }
        else{
            res.status(400).send('Product already in cart');
        }
    }
    async canUpdateProduct(req:Request,res:Response,next:NextFunction){
        const {email,name} = req.body;
        const cart = await ServiceUtility.listCart(email);
        //@ts-ignore
        const items = cart.items;
        const filtered = items.filter((elem: { name: any; })=>elem.name==name);
        if(filtered.length>0){
            next();
        }
        else{
            res.status(400).send('Product already in cart');
        }
    }
    async validQuantity(req:Request,res:Response,next:NextFunction){
        const {email,name,quantity} = req.body;

        const cart = await ServiceUtility.listCart(email);
        //@ts-ignore
        const items = cart.items;
        const filtered = items.filter((elem: { name: any; })=>elem.name==name);
        if(quantity>=0 && quantity<=filtered[0].quantity){
            next();
        }
        else{
            res.status(400).send('Invalid amount!');
        }
    }

}

export default new validationMiddleware();