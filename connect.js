const express = require('express');
var cors = require('cors');
const app = express();
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(express.static("public"));

const mongo_url = "mongodb+srv://db:nikita19@allserver.t6epw.mongodb.net/hiring?retryWrites=true&w=majority";

app.get("/api/questions", async function (req, res) {
    const client = new MongoClient(mongo_url, { useUnifiedTopology: true });
    try {
      await client.connect();
  
      const database = client.db('hiring');
      const collection = database.collection('questions');
      const questions = await collection.find().next()
  
      return res.json(questions);
    } catch(err) {
      console.log(err);
    }
    finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  });
  app.get("/login/userExists", async (req, res) => {
    const client = new MongoClient(mongo_url, { useUnifiedTopology: true });
    try {
      await client.connect();
      let username = req.query.username;
      const database = client.db('users');
      const collection = database.collection('userdata');
      const users = await collection.find({username : username}).next();
      const userExists = !!users;
      return res.json(userExists);
    } catch(err) {
      console.log(err);
    }
    finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  });
  app.get("/login/doLogin", async (req, res) => {
    const client = new MongoClient(mongo_url, { useUnifiedTopology: true });
    try {
      await client.connect();
      let username = req.query.username;
      let password = req.query.password;
      const database = client.db('users');
      const collection = database.collection('userdata');
      const users = await collection.find({username : username, password : password}).next();
      const userExists = !!users;
      return res.json(userExists);
    } catch(err) {
      console.log(err);
    }
    finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  });
  // start the server listening for requests
  app.listen(process.env.PORT || 3000, 
      () => console.log("Server is running..."));
