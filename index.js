const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const databaseCollection = client.db("TechElectroHubDB").collection("TechElectroHubUser")
    const myCartcollection = client.db("TechElectroHubDB").collection("MyCart")
    const myTopSalarcollection = client.db("TechElectroHubDB").collection("TopSalar")
    const myBrandscollection = client.db("TechElectroHubDB").collection("brands")

    app.post('/mycart',async(req,res)=>{
      const myCartData = req.body
      const result = await myCartcollection.insertOne(myCartData)
      res.send(result)
     
     })
    app.delete('/mycart/:id',async(req,res)=>{
      const id = req.params.id
      const qure = {_id:new ObjectId(id)}
      const result = await myCartcollection.deleteOne(qure)
      res.send(result)
     
     })
     app.get('/mycart',async(req,res)=>{
      const myCartData = myCartcollection.find()
      const result = await myCartData.toArray()
      res.send(result)
     
     })
     app.get('/TopSalar',async(req,res)=>{
      const myCartData = myTopSalarcollection.find()
      const result = await myCartData.toArray()
      res.send(result)
     
     })
     app.get('/brands',async(req,res)=>{
      const myCartData = myBrandscollection.find()
      const result = await myCartData.toArray()
      res.send(result)
     
     })
    app.post('/Addproduct',async(req,res)=>{
        const getData = req.body
        const result = await databaseCollection.insertOne(getData)
        res.send(result)
       
       })
       app.get('/Addproduct',async(req,res)=>{
        const getingData = databaseCollection.find()
        const result = await getingData.toArray()
        res.send(result)
       
       })
   
       app.get('/Addproduct/:id',async(req,res)=>{
        const id = req.params.id
        const qure = {_id:new ObjectId(id)}
        const getingData = await databaseCollection.findOne(qure)
        
        res.send(getingData)
       
       })
       app.put('/Addproduct/:id',async(req,res)=>{
        const id = req.params.id
        const user = req.body
       const qure = {_id:new ObjectId(id)}
       const option = {upsert:true}
       const fieldData = {
        $set:{
          productsName:user.productsName,
          BrandName:user.BrandName,
          productPrice:user.productPrice,
          productDetais:user.productDetais,
          typesofproducts:user.typesofproducts,
          Rating:user.Rating,
          productImg:user.productImg
        
        }
       }
       const result = await databaseCollection.updateOne(qure,fieldData,option)
       res.send(result)
     })
       


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