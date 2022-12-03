const express = require("express");
const cors = require("cors")
const path = require("path")
const mysql = require("mysql2")
const morgan = require("morgan")


const app = express();
const port = process.env.PORT || 4000

app.use(express.static(path.resolve(__dirname, './client/build')));


// Settings
app.use(express.urlencoded({extended:true}))
app.use(express.json({type: "*/*"}))
app.use(cors())
app.use(morgan("dev"));

const connection = mysql.createConnection({
    host: "us-cdbr-east-06.cleardb.net",
    database:"heroku_fdbdcda4c01c846" ,
    user:"bd9c444943ef6f" ,
    password: "35c28d57"
})

setInterval(function () {
    connection.query('SELECT 1');
  }, 5000);

app.get("/username", async (req,res)=>{
    try{
    await connection.connect()
    const result = await connection.promise().query("SELECT id, name, pass FROM registerr");
    res.json(result[0])}
    catch(e){
        res.json(e)
    }
})

app.post("/username", async (req,res)=>{
    const { name, pass} = req.body;
        console.log(req.body)
        if (name == undefined || pass == undefined) {}
        else{
        await connection.connect()
        const info = { name, pass };
        await connection.promise().query("INSERT INTO registerr SET ?", info);
        res.json({ message: "User added" });}     
})

app.get("/username/messages", async (req,res)=>{
    try{
    await connection.connect()
         const result = await connection.promise().query("SELECT id, name, mess, datee FROM message");
         res.json(result[0])}
         catch(e){
            res.json(e)
         }
})

app.post("/username/messages", async (req,res)=>{
    const { name, mess, datee} = req.body;
        console.log(req.body)

        if (name == undefined || mess == undefined) {}
        else{
            await connection.connect()
        const info = { name, mess, datee};
        await connection.promise().query("INSERT INTO message SET ?", info);
        res.json({ message: "Language added" });}     
})

app.delete("/username/messages/:id", async (req,res)=>{

    await connection.connect()
        const { id } = req.params;
        const result = await connection.promise().query("DELETE FROM message WHERE id = ?", id);
        res.json(result);
})

app.get("/*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(port, ()=>{
    console.log("server open")
})

