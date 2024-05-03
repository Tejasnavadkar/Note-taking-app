const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine","ejs")
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public"))); // search all static files in public folder


app.get("/",function(req,res){
    fs.readdir(`./files`, function(err,files){
        res.render("index",{files: files}) // here i want to render index after finishing reading of files so i can pass files in the form of object to index.ejs for showcase
    })
})

app.get("/files/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf8",function(err,filedata){ // actually the data that we retrive from files is in buffer form (hexadecimal) here utf-8 convert it in english
        res.render('show',{filename:req.params.filename , filedata:filedata})
    }) // so here we simply read file content using params and fs module
})

app.get("/edit/:filename",function(req,res){
   res.render('edit',{filename: req.params.filename})
})

app.post("/edit",function(req,res){
    fs.rename(`./files/${req.body.Previous}`,`./files/${req.body.new}`,function(err){ // method for rename it accept two previous file name(path) and new
        res.redirect("/")
    })
 })
 

app.post("/create",function(req,res){ // (data yaha pe ayega) here form data will handel imp we can see input field data only if we give a name to it
 fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
    res.redirect("/") // means when we write somthin and hit create button it gives us to "/create" create file and instantly redirect back to "/"
 } ) // structure - ( 'name' ', ke baad data likho' 'callback') here we set name of file but it contain space to remove it split on the basic of space and join on the basis of nothing now space will be removed(files folder me files ka naam ye rahega)
})

app.listen(3000)  // this is how we write basic boilerplate of express