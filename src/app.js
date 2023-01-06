import express from "express"
import axios from "axios";
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

const users = [{
	username: 'bobesponja', 
	avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info" 
},{
	username: 'borboleta', 
	avatar: "https://images.pexels.com/photos/66877/butterfly-exotic-south-america-amazon-66877.jpeg?auto=compress&cs=tinysrgb&w=600" 
},{
	username: 'leao', 
	avatar: "https://images.pexels.com/photos/14200416/pexels-photo-14200416.jpeg?auto=compress&cs=tinysrgb&w=600" 
}];

const tweetsSaved = [];

app.post("/sign-up", (req, res) => {  
  const { username, avatar } = req.body;

  if((!username) || (!avatar)){
    res.status(400).send({message: "Fill in all the fields that are mandatory"});
    return;
  }
  const existingUser = users.find((u) => u.username === username);

  if(existingUser){
    res.status(409).send({message: "This user is alredy registered" });
    return;
  }
  
  users.push({username, avatar});
  res.status(201).send({message: "OK"});
  return;
})

app.post("/tweets", (req, res) => {
  const { user } = req.headers;
  const { tweet } = req.body;

  const existingUser = users.find((u) => u.username === user);

  if(!existingUser){
    res.status(400).send({message: "UNAUTHORIZED" });
    return;
  }
  if(!user) {
    res.status(400).send({ error: "UNAUTHORIZED" });
    return;
  }
  if(!tweet) {
    res.sendStatus(400);
    return;
  }
  
  tweetsSaved.push({username: user, tweet});
  res.status(201).send({message: "OK"})
})

app.get("/tweets", (req, res) => {
  if(!tweetsSaved){
    res.status(400).send({ message: "We haven't found any tweet :(" });
    return;
  };

  tweetsSaved.forEach((tweet) => {
    const { avatar } = users.find((user) => user.username === tweet.username);
    tweet.avatar = avatar;
  });
  if(tweetsSaved.length === 0){
    res.send(tweetsSaved)
  }
  if(tweetsSaved.length < 10) {
    res.send(tweetsSaved.reverse()) 
    return;
  }
  res.send(tweetsSaved.slice(-10).reverse()) 
});
//
app.listen(PORT, () => {console.log(`Server running in port ${PORT}`)});