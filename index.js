const express = require('express');
const app = express();
const path = require('path');

const port = 8080;
const {v4 : uuidv4} = require('uuid');
const methodOverride= require("method-override")
// Importing uuid for unique IDs
 // This is just to ensure uuid is available

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));  // ✅ Folder must be "views"

let posts = [
    {
        id: uuidv4(),
        username: "apnacollge",
        content: "hard work paid sucess"
    },
    {   id: uuidv4(),
        username: "mukhtar",
        content: "hard work paid sucess"
    },

    {    id: uuidv4(),
         username: "altaf",
         content: "do hardwork like robat"
    }
   
];

// Routes
app.get("/posts", (req, res) => {
    res.render("index", { posts }); // ✅ Pass data properly

});

app.get('/', (req, res) => {
    
    res.redirect("/posts"); // Redirect to posts page

});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
    

} );

app.post("/posts", (req, res) => { 
   let {username, content}=req.body;
   let id = uuidv4(); // Generate a unique ID for the new post
   posts.push({id, username,content});
   res.redirect("/posts")
});

app.get("/posts/:id", (req,res)=>{
    let {id}= req.params;
    let post = posts.find((p)=>id ===p.id);
    console.log(post);
    res.render("show.ejs", {post}); // ✅ Render the show view with post data
})

app.patch("/posts/:id", (req, res) => {    

let {id} = req.params;
let newcontent = req.body.content;
let post = posts.find((p) => id === p.id);
post.content = newcontent; // Update the content of the post
console.log(post);
res.redirect("/posts/"); // Redirect to the updated post's show page



})

app.get("/posts/:id/edit", (req, res) => { 


    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post}); // ✅ Render the edit view with post data

}) 

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id); // Remove the post with the given ID
    res.redirect("/posts"); // Redirect to posts page after deletion
});

