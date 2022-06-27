import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import environment from './config/enviroment.js'
import conectToMongo from './databases/mongoose.db.js';
import userRouter from './routers/user.router.js';
// import cartRouter from './routers/cart.router.js';


dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(userRouter);
// app.use(cartRouter);

const PORT = environment.PORT;


app.listen(PORT, async ()  => {
    console.log(`server run on ${PORT}`);
    await conectToMongo(); 

})