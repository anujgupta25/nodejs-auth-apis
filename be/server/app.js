const express = require("express")
const app = express();
require("../connection/conn");
const bodyparser = require("body-parser")

require("dotenv").config()

app.use(express.json())


app.use('/user', require("../router"))



app.listen(process.env.PORT, ()=>{
    console.log(`Server listening at ${process.env.PORT}`)
})