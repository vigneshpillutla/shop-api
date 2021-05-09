import express, { Application, Request, Response } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import ShopController from '../common/shop.controller'
import validationMiddleware from '../common/shop.middlewares'
export class ProductRoutes extends CommonRoutesConfig{
    constructor(app:Application){
        super(app,'ProductRoutes');
    }
    configureRoutes(){
        this.app.route('/products')
            .get(ShopController.getAllProducts)
            .post(
                validationMiddleware.validateProductFields,
                validationMiddleware.productAlreadyAdded,
                ShopController.addProduct
            );
        return this.app;
    }
}