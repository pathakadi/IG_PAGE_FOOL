import express from "express";
import mongoose from "mongoose";
import path from "path";

mongoose.connect(process.env.MONGO_URL ,{
    dbName : "ig"
}).then(() => console.log("Database Connected")).catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
    name : String ,
    password : String
});

const User = mongoose.model("User" , userSchema);

const app = express();

// Using Middlewares
app.use(express.static(path.join(path.resolve() , "public")));
app.use(express.urlencoded({ extended : true }));

app.set("view engine" , "ejs");

app.get("/",(req,res)=>{
    res.render('index');
})

app.post("/",async(req,res)=>{
    const name = req.body.name;
    const password = req.body.password;
    const data = { name , password};
    console.log(data);
    await User.create(data);
    res.redirect("/");
})

app.listen(3000 , () => {
    console.log("Server is Working");
});