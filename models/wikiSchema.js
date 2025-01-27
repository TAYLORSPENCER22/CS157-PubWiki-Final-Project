const mongoose = require("mongoose");

const wikiSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        maxlength: 20
    },
    category: {
        type: String,
        required: true,
        enum: ['Technology'],
      },
    author: {
        type: String,
        required: true,
        maxlength: 20
    },
    urlName: {
        type: String,
        required: true,  
        unique: true,  
        maxlength: 50,  
        match: /^[a-zA-Z0-9-_]+$/, 
      },
      html: {
        type: String,
        required: true
      },
      password:{
        type: String,
        required:true
      },
      pageViews: {
        type: Number,
        default: 0
      },
      createdDate: {
        type: Date,
        default: Date.now
      },
      updatedDate: {
        type: Date,
        default: Date.now
      }



})

module.exports = mongoose.model("Wiki", wikiSchema);
