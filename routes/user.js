const express = require("express");
const userModel = require("../models/user");
const routes = express.Router();

// #1 POST http://localhost:3712/api/user/signup
// Allow user to create new account.
routes.post("/user/signup", async (req, res) => {
    try {
        const user = await userModel(req.body);
        await user.save();
        res.status(201).send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

// Sample User Login
// {
//     "username": "dennis06",
//     "password": "pa$$word"
// }

// #2 POST http://localhost:3712/api/user/login
// Allow user to access the system.
routes.post("/user/login", async (req, res) => {
    const user = await userModel.findOne({username: req.body.username});

    if (user == null) {
        return res.status(400).send("Cannot find user")
    }

    try {
        if (req.body.password == user.password) {
            res.status(200).send(user);
        } else {
            res.status(403).send("Not Allowed")
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});

module.exports = routes;