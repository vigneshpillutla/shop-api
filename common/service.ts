import { User } from '../configDB/collections.users.config';
import { Product } from '../configDB/collections.products.config';
import { Cart } from '../configDB/collections.cart.config';
import { CreateUserDto } from '../dto/create.user.dto';
import { CreateProductDto } from '../dto/create.product.dto';

class ServiceUtility{
    async createUser(user:CreateUserDto){
        const newUser  = new User(user);
        return newUser.save();
    }
    async createCart(email:string){
        const newCart = new Cart({email:email,items:[]});
        return newCart.save();
    }
    async cartExists(email:string){
        return Cart.exists({email:email});
    }
    async listUsers(){
        return User.find({});
    }
    async addProduct(product:CreateProductDto){
        const newProduct = new Product(product);
        newProduct.save();
    }
    async listProducts(){
        return Product.find({});
    }
    async productExists(name:string){
        return Product.exists({name:name});
    }
    async addToCart(email:string,name:string,quantity:number){
        return Cart.findOneAndUpdate(
            {email:email},
            {$push:{"items":{name,quantity}}},
            {upsert:true}
        );
    }
    async updateCart(email:string,name:string,newQuantity:number){
        
        if(newQuantity==0){
            return this.removeFromCart(email,name);
        }
        else{
            return Cart.findOneAndUpdate(
                {email:email,"items.name":name},
                {$set:{"items.$.quantity":newQuantity}}
            )
        }
        
    }
    async listCart(email:string){
        return Cart.findOne(
            {email:email}
        );
    }
    async removeFromCart(email:string,name:string){
        return Cart.findOneAndUpdate(
            {email:email},
            {$pull:{"items":{name:name}}},
            {upsert:true,new:true}
        )
    }
}
export default new ServiceUtility();