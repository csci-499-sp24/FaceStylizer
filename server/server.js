const express = require("express");
const cors = require('cors')
const app = express();

const mongoose = require('mongoose');
const DB_name  = "FaceStylizerDB";

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/${DB_name}');
    console.log(`Successfully connected to ${DB_name}`);
}

app.use(cors());

app.get("/api/home", (req, res) => {
    res.json({message: "Hello World!"});
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});