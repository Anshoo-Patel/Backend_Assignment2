const express = require('express');
const app = express();
const User = require('./model/Users');

// Middleware for parsing JSON bodies
app.use(express.json());


require("dotenv").config();
let port=process.env.port;
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})



// Validation middleware
function validateUser(req, res, next) {
    const { firstName, lastName, hobby } = req.body;
    if (!firstName || !lastName || !hobby) {
        return res.status(400).json({
            error: 'All fields are required.'
        });
    }
    next();
}

// GET /users - Fetch all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// GET /users/:id - Fetch a user by Id
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Invalid user ID' });
    }
});

// POST /user - Add a new user
app.post('/user', validateUser, async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save(); 
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create user', details: error.message });
    }
});

// PUT /user/:id - Update an existing user
app.put('/user/:id', validateUser, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update user', details: error.message });
    }
});

// DELETE /user/:id - Delete a user by Id
app.delete('/user/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid user ID' });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An internal server error occurred' });
});

const dbconnect = require('./config/dataBase');
dbconnect();