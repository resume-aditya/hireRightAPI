const express = require("express");
var cors = require('cors');
const app = express();
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(express.static("public"));

const url = "mongodb+srv://db:nikita19@allserver.t6epw.mongodb.net/hiring?retryWrites=true&w=majority";
// const client = new MongoClient(url);


app.get("/api/questions", async function (req, res) {
    const client = new MongoClient(url, { useUnifiedTopology: true });
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
  
  // start the server listening for requests
  app.listen(process.env.PORT || 3000, 
      () => console.log("Server is running..."));
