import mongoose from 'mongoose';

import enviroment from '../config/enviroment.js';

const MONGODB_URL = enviroment.MONGODB_URL;

const conectToMongo = async () =>{
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Mongo Conected")

    }catch(err){
        console.log("Mongo Conection Faild")
        process.exit(1);
    }
};

export default conectToMongo;