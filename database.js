const mongoose = require("mongoose");

// STEP 1 - ESTABLISH THE CONNECTION TO MONGODB

mongoose.connect("mongodb+srv://cs157:cs157@cs157.vf9f1.mongodb.net/WikiDB?retryWrites=true&w=majority&appName=CS157", { })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

