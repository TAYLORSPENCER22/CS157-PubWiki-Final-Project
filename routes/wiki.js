const express = require("express");
const Wiki = require("../models/wikiSchema.js");
const mongoose = require("mongoose");

const router = express.Router();

// Endpoint handlers

// at least 5 endpoints

// 2) Search Endpoint
// The endpoint used in the Home view to search for an existing page
/*

GET (/api/wiki/search/:searchTerm)
- Create the filter object

    let filterObj = {
      $or: [
        { title: { $regex: req.params.searchTerm, $options: 'i' } },
        { html: { $regex: req.params.searchTerm, $options: 'i' } }
      ]
    }  
- Use your wiki model to filter the results
- Wiki.find(filterObj).exec(function(err, result) {})

GET https://cs157-pubwiki-final-project.minassn.repl.co/api/wiki/search/cs157
*/

router.get("/search/:searchTerm", (req, res) => {

  let filterObj = {
    $or: [
      { title: { $regex: req.params.searchTerm, $options: 'i' } },
      { html: { $regex: req.params.searchTerm, $options: 'i' } }
    ]
  }
 
  Wiki.find(filterObj).exec() 
  .then(result => {
      res.status(200).send(result);
    })
      .catch(err => {
      res.status(500).send(err);
})
});


// 3 (Return a single wiki page based on the urlName)
// GET /api/wiki/:urlName (Used for the wiki edit and wiki display views)
// - query collection using the function findOne({ urlName: req.params.urlName})
// - If that page exists, increment the page count, save it result.save(), return the wiki page
// GET https://cs157-pubwiki-final-project.minassn.repl.co/api/wiki/finalproject

router.get("/:urlName", (req, res) => {

  Wiki.findOne({urlName: req.params.urlName})
    .then(result => {
      if (result) {
        result.pageViews++ //increment page views
        result.save()

        res.status(200).send(result)
      }
      else {
        res.status(400).send("invalid url");
    }
    })
    .catch(err => {
      res.status(400).send(err);
    })
  })


// 1 (Create a new wiki page)
// POST /api/wiki/ (Used for the new wiki view)
// - Create the new wiki object based on the data from the client. new Wiki(req.body)
// - You save the wiki and return the result
// POST https://cs157-pubwiki-final-project.minassn.repl.co/api/wiki

router.post("/", (req, res) => {
  let newWiki = Wiki(req.body);

  newWiki.save()
  .then(result => {
    res.status(201).send(result);
  })
  .catch(err =>{
    res.status(400).send(err);
  })
  
})


// 4 (Updating an existing wiki page)
// PATCH /api/wiki/:urlName/:managePassword (Used for the wiki update view)
// - Get the wiki page based on the urlName (Wiki.findOne({ urlName: req.params.urlName }))
// - If the wiki is found then we compare the password that is stored with the one client passed it
//   if (result.password == req.params.managePassword)
//      set the data item one by one and call the save() -> return result
// result.title = req.body.title
// ...
// PATCH https://cs157-pubwiki-final-project.minassn.repl.co/api/wiki/finalproject/abc123

router.patch("/:urlName/:managePassword", (req, res) => {
 
  Wiki.findOne({ urlName: req.params.urlName})

    .then(result => {
      if(result.password == req.params.managePassword) {

      let updatedWiki = Wiki(req.body);

       result.title = req.body.title;
       result.category = req.body.category;
       result.author = req.body.author;
       result.html = req.body.html;
       
       result.save()
          .then(result => {
            res.status(201).send(result);
          })
          .catch(err => {
            res.status(400).send(err);
          })
       
      } else { (res.status(400).send("Invalid Password"))};
    })
    .catch(err =>{
      res.status(400).send(err);

});
});


// 5 (Delete a wiki page)
// DELETE /api/wiki/delete/:urlName/:managePassword
// - Get the wiki page using findOne()
// - if the page exisits, compare the stored management password with the one client sent in
//   if (result.password == req.parmas.managePassword)
//    findByIdAndDelete(result._id)

// DELETE https://cs157-pubwiki-final-project.minassn.repl.co/api/wiki/finalproject/abc123

router.delete("/delete/:urlName/:managePassword", (req, res) => {

  Wiki.findOne({urlName: req.params.urlName})

      .then(result => {
        if(result.password == req.params.managePassword) {
          
          Wiki.findByIdAndDelete(result._id)
          .then(result => {
            res.status(200).send(result);
          })
          .catch(err => res.status(400).send(err))   
      } else {res.status(404).send("Invalid Password!")
    }
    })
      .catch(err => res.status(400).send(err))
});



module.exports = router;