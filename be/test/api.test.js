const chai = require("chai")
const mocha = require("mocha")
const chaiHttp = require("chai-http")
const {MongoClient} = require('mongo-mock')
require("dotenv").config()
MongoClient._persist = "mongo.js"
const { collection } = require("../model")
chai.should()
chai.use(chaiHttp)

const url = process.env.MONGO_URL_TESTING;

describe("create connection and test APIs", async () =>{

    mocha.before(async()=>{

       const db= await MongoClient.connect(url)
       const collection = db.collection('testing-collection')   
    })

    it("Test signup function", async()=>{
        const body =  {
            email : "test@gmail.com",
            password : "admin123",
            username : "tyriyuiyiu"
        }
        const res = await collection.insertOne(body)
        res.should.have.property("acknowledged").to.be.true;
    }),


    it("Test if email exists", async()=>{
        const body =  {
            email : "test@gmail.com",
            password : "admin123"
        }
        const checkEmail = await collection.findOne({"email" :body.email})
        console.log("email", checkEmail)

        checkEmail.should.have.property("email").to.be.equal(body.email);
    })

    // it("Test Login function", async()=>{
    //     const body =  {
    //         email : "test@gmail.com",
    //         password : "admin123"
    //     }
    //     const res = await collection.find({"email" : body.email})
    //     console.log(res.password)
    //     if(res){
    //          const compareHashPassword = await bcrypt.compare(body.password, res.password)

    //          compareHashPassword.should.be.true
    //     }
    // })

})