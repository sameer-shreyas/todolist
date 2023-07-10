const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.set('view engine', 'ejs');

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function(req, res){
  const day = date.getDate();
  res.render('list', {listTitle: day, newItems: items});
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
})

app.post("/", function(req, res){
  const item = req.body.list_item;

  if(req.body.submit === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }

});

app.post("/work", function(req, res){
  const workItem = req.body.list_item;

  workItems.push(workItem);

  res.redirect("/work");
});

app.listen(3000, function(){
  console.log("Server is working at port number 3000");
});
