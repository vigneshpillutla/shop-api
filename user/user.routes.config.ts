import express, { Application, Request, Response } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import ShopController from '../common/shop.controller'
export class UserRoutes extends CommonRoutesConfig{
    constructor(app:Application){
        super(app,'ProductRoutes');
    }
    configureRoutes(){
        this.app.route('/user')
            .post(ShopController.createUser)
        return this.app;
    }
}