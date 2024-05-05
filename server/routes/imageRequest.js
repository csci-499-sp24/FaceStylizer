// const express = require("express");
// const router = express.Router();
// const {imageRequest} = require("../models/ImageRequest.js");
//
// // Image Request POST Requests
//
// // Read User by Username (GET)
// router.get('/readUser', async (req, res) => {
//     const user = User.findOne({
//         username: req.body.username
//     })
//     await user.exec()
//         .then((query) => {
//             console.log(query);
//             res.json({message: query});
//         })
//         .catch((e) => {
//             console.log(`Could not findOne : ${e}`);
//             res.json({message: `Could not findOne : ${e}`});
//         });
// })
//
// // Read User by ID (GET)
// router.get('/readUser/:id', async (req, res) => {
//     const user = User.findOne({
//         _id : req.params.id
//     })
//     await user.exec()
//         .then((query) => {
//             console.log(query);
//             res.json({message: query});
//         })
//         .catch((e) => {
//             console.log(`Could not findOne : ${e}`);
//             res.json({message: `Could not findOne : ${e}`});
//         });
// })
//
// // Create Users (POST)
// router.post('/createUser', async (req, res) => {
//     // Create User Object
//     const user = await User.create({
//         username: req.body.username,
//         password: req.body.password,
//         createdAt: new Date()
//     })
//     await user.save()
//         .then((resp) => {
//             console.log(`Created user successfully with username ${req.body.username} and password ${req.body.password}`)
//             res.json({message: resp});
//         })
//         .catch((e) => {
//             console.log(`Could not create : ${e}`);
//             res.json({message: `Could not create : ${e}`});
//         });
// })
//
// // Update User by Username (PUT)
// router.put("/updateUser", async (req, res) => {
//     const user = User.findOneAndUpdate({
//             username: req.body.username
//         },
//         {
//             $set: {
//                 username: req.body.username,
//                 password: req.body.password,
//                 updatedAt: new Date()
//             }
//         },
//         {
//             upsert: true
//         },
//     )
//     await user.exec()
//         .then((update) => {
//             console.log(`Updated user with id ${update["_id"]}`);
//             console.log("Prior to change:")
//             console.log(update);
//             res.json({message: update});
//         })
//         .catch((e) => {
//             console.log(`Could not findOneAndUpdate : ${e}`);
//             res.json({message: `Could not findOneAndUpdate : ${e}`});
//         });
// });
//
// // Update User by ID (PUT)
// router.put("/updateUser/:id", async (req, res) => {
//     const user = User.findByIdAndUpdate({
//             _id: req.params.id
//         },
//         {
//             $set: {
//                 username: req.body.username,
//                 password: req.body.password,
//                 updatedAt: new Date()
//             }
//         },
//         {
//             upsert: true
//         },
//     )
//     await user.exec()
//         .then((update) => {
//             console.log(`Updated user with id ${update["_id"]}`);
//             console.log("Prior to change:")
//             console.log(update);
//             res.json({object_changed: update});
//         })
//         .catch((e) => {
//             console.log(`Could not findByIdAndUpdate : ${e}`);
//             res.json({message: `Could not findByIdAndUpdate : ${e}`});
//         });
// });
//
// // Delete User by Username (DELETE)
// router.delete('/deleteUser/', async (req, res) => {
//     const user = User.findOneAndDelete({
//             username: req.body.username
//         }
//     )
//     await user.exec()
//         .then(query => {
//             console.log(`Deleted user with username ${req.body.username} from database.`);
//             res.json({messsage: `Deleted user with id ${req.params.id}`});
//         })
//         .catch(err => {
//             console.error(err)
//         });
// })
//
// // Delete User by ID (DELETE)
// router.delete('/deleteUser/:id', async (req, res) => {
//     const user = User.findByIdAndDelete({
//             _id: req.params.id
//         }
//     )
//     await user.exec()
//         .then(query => {
//             console.log(`Deleted user with id ${req.params.id} from database.`)
//             res.json({messsage: `Deleted user with id ${req.params.id}`});
//         })
//         .catch(err => {
//             console.error(err)
//         });
// })
//
// router.post('/login', async (req, res) => {
//     const user = User.find({
//         username: req.body.username
//     })
//     await user.exec()
//         .then((query) => {
//             if (query[0]["password"] === req.body.password) {
//                 console.log(`User ${req.body.username} successfully logged in`);
//                 res.status(202).send({message: `Welcome back ${req.body.username}`});
//             } else {
//                 console.log(`Incorrect login attempt for user ${req.body.username}`);
//                 res.status(412).send({message: `The password you have entered is incorrect`});
//             }
//         })
//         .catch((e) => {
//             console.log(e);
//             console.log(`No such user exists with username ${req.body.username}`);
//             res.status(404).send({message: `No such user exists with username ${req.body.username}`});
//         });
// })