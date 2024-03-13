const express = require("express");
const router = express.Router();
const { User } = require("../models/User.js");

//--Users Endpoints (CRUD)--

// Read Users (GET)
router.get('/users/readUser', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    })
        .exec()
        .then((query) => {
            console.log(query);
            res.json({message: query});
        })
        .catch((e) => {
            console.log(`Could not findOne : ${e}`);
            res.json({message: `Could not findOne : ${e}`});
        });
})

// Create Users (POST)
router.post('/users/createUser', async (req, res) => {
    // Create User Object
    const user= await User.create({
        username: req.body.username,
        password: req.body.password
    })
    await user.save()
        .then((resp) => {
            console.log(resp);
            res.json({message: resp});
        })
        .catch((e) => {
            console.log(`Could not create : ${e}`);
            res.json({message: `Could not create : ${e}`});
        });
})

// Update Users (PUT)
router.put("/users/updateUser", async (req, res) => {
    const user = await User.findOneAndUpdate({
            username: req.body.username
        },
        {
            $set: {
                username: req.body.username,
                password: req.body.password
            }
        },
        {
            upsert: true
        },
    )
        .exec()
        .then((update) => {
            console.log(update);
            res.json({message: update});
        })
        .catch((e) => {
            console.log(`Could not findOneAndUpdate : ${e}`);
            res.json({message: `Could not findOneAndUpdate : ${e}`});
        });
});

// Update User by ID (PUT)
router.put("/users/updateUser/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate({
            _id: req.params.id
        },
        {
            $set: {
                username: req.body.username,
                password: req.body.password
            }
        },
        {
            upsert: true
        },
    )
        .exec()
        .then((update) => {
            console.log(update);
            res.json({message: update});
        })
        .catch((e) => {
            console.log(`Could not findByIdAndUpdate : ${e}`);
            res.json({message: `Could not findByIdAndUpdate : ${e}`});
        });
});

// Delete Users (DELETE)
router.delete('/users/deleteUser/:id', async (req, res) => {
    const user = await User.findByIdAndDelete({
            _id: req.params.id
        }
    )
        .exec()
        .then(query => {
            res.json(query);
        })
        .catch(err => {console.error(err)});
})

module.exports = router;