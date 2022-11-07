import express from "express"
import axios from 'axios'
import cors from 'cors'

const app = express()
app.use(cors());
app.use(express.json())
const users = [{
	username: 'bobesponja', 
	avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info" 
},{
	username: 'teste1', 
	avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info" 
}];

const tweetsSaved = [{
	username: "bobesponja",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
  tweet: "eu amo o hub"
},{
	username: "teste1",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
  tweet: "eu sou o teste 1"
}];

app.post("/sign-up", (req, res) => {  
  users.push(req.body)
  res.send("OK")
})

app.post("/tweets", (req, res) => {
  tweetsSaved.push(req.body)
  res.send("OK")
})


app.get("/tweets", (req, res) => {
  /*tweetsSaved.forEach(element => {
    const tweetAvatar = users.filter(user => user.username == element.username)
    console.log(tweetAvatar)
  });*/  
  if(tweetsSaved.length <= 10){
    res.send(tweetsSaved)
  } else {
    res.send(tweetsSaved.slice(-10))
  }  
});

app.listen(5000, () => console.log("Server running in port 5000"));