//--App Modules--
const express = require("express");
const cors = require('cors')
const app = express();

//--BodyParser--
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use Cors Middleware
app.use(cors());

//--DB Modules--
const mongoose = require('mongoose');
const { User } = require('./models/User.js');

//--Connect to MongoDB--
// DB config
const db_name       = process.env.DB_NAME || "FaceStylizerDB";
const mongoUrl      = process.env.MONGO_URL || "mongodb://root:password@localhost:27017";
const mongooseUrl   = process.env.MONGOOSE_URL || `${mongoUrl}/${db_name}?authSource=admin`; 

// Connect to DB
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongooseUrl).then((connection) => {
        console.log(`Successfully connected to ${db_name}`);
    }).catch((e) => {
        console.log(`Cannot connect to ${db_name}`);
        console.log(e);
        console.log(e.message);
        process.exit(1);
    });
}

// Start Listening on Port
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// Test Endpoint
app.get("/api/home", (req, res) => {
    res.json({message: "Hello World!"});
});

//--Users Endpoints (CRUD)--

// Create Users (POST)
app.post("/users/createUser", async (req, res) => {
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
});

// Read Users (GET)
app.get("/users/readUser", async (req, res) => {
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

});

// Update Users (PUT)
app.put("/users/updateUser", async (req, res) => {
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


app.put("/users/updateUser/:id", async (req, res) => {
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
app.delete('/users/deleteUser/:id', async (req, res) => {
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