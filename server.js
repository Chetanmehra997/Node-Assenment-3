const express = require("express")
const app = express()
app.use(express.json())

const {MongoClient} = require("mongodb")
const connectionString = "mongodb://127.0.0.1:27017"
const client = new MongoClient(connectionString,  {useNewUrlParser : true})
client.connect(function(error){
    if(error){
        console.log("error in connecting")
        return
    }
        console.log("we are connected")
})
const dbName = "mongo_database"
const db = client.db(dbName)

app.get("/", (req, res)=>{
    db.collection("mongo_database").find().toArray((err, data)=>{
        if(err){
            return console.log("error found", err)
        }
        res.send(data)
    })
   
})

app.post("/studentadd", (req, res)=>{
    // console.log(req.body)
    db.collection("mongo_database").insertOne({
        fname:req.body.fname,
        lname:req.body.lname,
        age:req.body.age,
        study:req.body.study
    })
    db.collection("mongo_database").find().toArray((err, data)=>{
        if(err){
            return console.log("error found", err)
        }
        res.send(data)
    })

})

app.delete("/deletestudent", (req, res) =>{
    console.log(req.body)
    db.collection("mongo_database").deleteOne({
        fname:req.body.fname,
        lname:req.body.lname,
        age:req.body.age,
    })
    db.collection("mongo_database").find().toArray((err, data)=>{
        if(err){
            return console.log("error found", err)
        }
        res.send(data)
    })
})

app.put("/editstudent" , (req,res)=>{
    console.log(req.body)
    db.collection("mongo_database").updateOne({
        fname:req.body.updte.fn,
        lname:req.body.updte.ln
    },{ $set:{
        fname:req.body.edited.fname,
        lname:req.body.edited.lname,
        age:req.body.edited.age,
        study:req.body.edited.study
    }})
    db.collection("mongo_database").find().toArray((err, data)=>{
        if(err){
            return console.log("error found", err)
        }
        res.send(data)
    })
})

app.listen("5000", ()=>{
    console.log("server started")
})