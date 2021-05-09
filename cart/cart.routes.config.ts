import express, { Application, Request, Response, NextFunction } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import shopController from '../common/shop.controller';
import validationMiddleware from '../common/shop.middlewares'

export class CartRoutes extends CommonRoutesConfig{
    constructor(app:Application){
        super(app,'CartRoutes');
    }
    configureRoutes(){
        this.app.route('/cart')
            .get(validationMiddleware.checkIfCartExists,shopController.getCart)
        this.app.param('email',(req:Request,res:Response,next:NextFunction)=>{
            req.body.email = req.params.email;
            next();
        })
        this.app.route('/cart/:email')
            .all(
                validationMiddleware.validateCartFields,
                validationMiddleware.checkIfCartExists,
                validationMiddleware.checkIfProductExists,
            )
            .post(
                validationMiddleware.canAddProduct,
                shopController.addToCart
                )
            .patch(
                validationMiddleware.canUpdateProduct,
                validationMiddleware.validQuantity,
                shopController.updateCart
                )
        
        return this.app;
    }
}