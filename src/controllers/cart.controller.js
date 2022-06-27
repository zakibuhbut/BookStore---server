import Cart from "../models/cart.modle.js";

export const addBook = async (req, res) => {
    const user = req.user;
    const data = req.body;

    try {
        const cart = new Cart({
            ownerID: user.id,
            title: data.title,
        });

        res.status(201).send({
            status: 201,
            statusText: 'Created',
            data: user,
            message: 'Book added successfully',
        });
    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: 'Bad Request',
            message: '',
        });
    }
};