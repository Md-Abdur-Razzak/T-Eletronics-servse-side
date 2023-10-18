const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;

// middleWare
app.use(cors())
app.use(express.json())
//TechElectroHub
//kHxRn58mp4xTcEhQ
const userName = process.env.DB_USER
const userPass = process.env.DB_PASS

// <===============Database connetion start============>
const uri = `mongodb+srv://${userName}:${userPass}@cluster0.wgy9amh.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// <===============Database connetion end===============>

app.get('/',(req,res)=>{
    res.send("Browjer Is Ranning")
})

app.listen(port)