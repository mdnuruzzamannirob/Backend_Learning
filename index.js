const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = process.env.PORT ||5000
require("dotenv").config();

// middleware
app.use(express.json())

// kittySchema
const kittySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  isCute: {
    type: Boolean,
    required: true,
  },
});

// kitten Model
const Kitten = mongoose.model('Kitten', kittySchema);

// UserSchema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// kitten Model
const User = mongoose.model('User', userSchema);



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tlfhvjw.mongodb.net/Backend_Learning`;



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(uri);


  // get routes
  app.get('/get',async (req,res)=>{

    const kittens = await Kitten.find();
    res.send(kittens)
})

  // post routes
  app.post('/post',async (req,res)=>{
    const body = req.body;

    const kittens = await Kitten.create(body);
    res.send(kittens)
})

  // get routes
  app.get('/login/:id',async (req,res)=>{
    const id = req.params.id;
    const user = await User.findById(id);

    if(user){
        res.send('user logged in successfully')
    }
    else{
        res.send('user login failed. try again')
    }
})

  // register routes
  app.post('/register',async (req,res)=>{
    const body = req.body;

    const user = await User.create(body);
    res.send(user)
})

  console.log('mongoose connected successfully');
}



// basic route
app.get('/', (req,res)=>{
    res.send('Welcome to the backend world!')
})

app.listen(port,()=>{
    console.log(`This server is running on port ${port}`);
})