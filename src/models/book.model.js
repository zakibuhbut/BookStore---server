import mongoose from "mongoose";

const bookModle = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Enter title']

    }, 
    author:{
        type: String,
        required: [true, 'Enter author name']

    }, 
    bookCover:{

    }, 
    description:{
        type: String,
        required: [true, 'Enter description']

    }, 
    pages: {
        type: Number,
        required: [true, 'Enter number of pages']

    }, 
    price:{
        type: Number,
        required: [true, 'Enter price']

    },
});



const Book = mongoose.model('Books', bookModle);

export default Book;