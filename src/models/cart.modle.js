import mongoose from "mongoose";

const cartModle = new mongoose.Schema({
    ownerID:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'

    }, 
    books:{
        type: String,
        required: true,

    },
});

const Cart = mongoose.model('Cart', cartModle);

export default Cart;