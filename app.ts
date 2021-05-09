import express, {Application} from 'express';
import cors from 'cors';
import { CommonRoutesConfig } from './common/common.routes.config'
import { ProductRoutes } from './products/products.routes.config';
import { CartRoutes } from './cart/cart.routes.config';
import { UserRoutes } from './user/user.routes.config';

const app:Application = express();
const routes: CommonRoutesConfig[] = [];
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

routes.push(new ProductRoutes(app));
routes.push(new CartRoutes(app));
routes.push(new UserRoutes(app));

app.listen(port,()=>{
    console.log(`Server running at port ${port}`);

});