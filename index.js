const express = require("express");
const cors = require("cors");
const bodyParser = require ('body-parser')

const liv = {
  firstName: "Olivia",
  nickName: "is nicki, but my name aint nicole",
  lastName: "Walker",
  faveColour: "yellow",
  faveFood: "curry mutton",
};

const facts = [
  "I like Ed Sheeran",
  "I love apple crumble",
  "My favourite soap is Eastenders",
  "I dont like peanut butter",
  "I hate milk",
  "I hate cheese",
  "I love Baileys",
  "My favourite fruit is pears/mango",
  "I am learning to speak Dutch",
  "My mothers name is Lorna",
  "My best friends name is Lauren",
  "So far I prefer frontend over backend",
  "I went to Lancaster University",
  "I have a law degree",
  "I had a hamster called Muffin",
  "I live in Wolverhampton"
];



// randomItem = liv[Math.floor(Math.random() * liv.length)];

const app = express();
app.use(cors());
app.use(bodyParser.json())

const vineQuotes = [
  "Shrek is love, Shrek is life",
  "AGH STOP! I could've droped my croissant!",
  "Road work ahead? uh YEAH, I sure hope it does?!",
  "thats my OPINIONNNNNN",
  "Girl, you're thicker than a bowl of oatmeal",
  "Do it for the vine! I ain't gone do it!",
  "Whats 9 + 10? ........ 21???"
]

app.get("/", (req, res) => {
  res.json({ message: "Livs local server is running, woohoo" });
});

app.get("/vine-quotes", (req, res) => {
  res.json({quotes: vineQuotes})
});

app.post("/vine-quotes", (req, res) => {
 
});

app.get("/about-me", (req, res) => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  const randomFact = facts[randomIndex];
  res.json({...liv, fact: randomFact});
});

app.listen(4000, () => {
  console.log("server is running, you did it Liv!");
});
