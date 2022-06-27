import User from '../models/user.model.js'

export const signup = async (req, res) => {
    const userData = req.body;

    const user = new User(userData);
 
    try {
        await user.save();

        res.status(201).send({
            status: 201,
            statusText: 'Created',
            data: user,
            message: 'User created successfully',
        });
    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: 'Bad Request',
            message: '',
        });
    }
};

export const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await user.findUser(email, password);

        const token = await user.createToken();

        res.send({
            status: 200,
            statusText: 'Ok',
            data: {
                user: user,
                token: token,
            },
            message: 'You`ve logged in successfully',

        })

    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: 'Bad Request',
            message: '',
        });
    }
};

export const logout = async (req, res) => {
    const user = req.user;
    const token = req.token;

    try {
        user.tokens = user.tokens.filter((tokenDoc) => tokenDoc.token !== token);
        await user.save();

        res.send({
            status: 200,
            statusText: 'Ok',
            data: {},
            message: 'You logout successfuly',
        });
    } catch (err) {
        res.status(500).send({
            status: 500,
            statusText: 'Internal Server Error',
            message: '',
        });
    }
};

