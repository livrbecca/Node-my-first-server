const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const oliviaProfile = {
  firstName: "Olivia",
  nickName: "is nicki, but my name aint nicole",
  lastName: "Walker",
  faveColour: "yellow",
  faveFood: "curry mutton",
};

const facts = [
  "I like Ed Sheeran",
  "I love skincare",
  "Coding is hard but fun!",
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
  "I live in Wolverhampton",
];

const livsProfile = {
  firstName: "Liv",
  lastName: "Walker",
  preferences: {
    foods: ["patties", "ramen"],
    colour: "yellow",
    number: 11,
  },
  hoursOfSleep: 8.5,
};

const randomProfile = {
  firstName: "Black",
  lastName: "Codher",
  preferences: {
    coding: true,
    languages: ["HTML", "Java", "React", "Python"],
    color: ["black", "orange"],
  },
  hoursOfSleep: 0,
};

const db = {
  profiles: {
    1000: livsProfile,
    2000: randomProfile,
    3000: oliviaProfile,
  },
  anime: {
    0: {
      title: "Gintama",
      bestCharacter: "Hijikata",
    },
    1: {
      title: "Fairy Tail",
      bestCharacter: "Erza Scarlett",
    },
    2: {
      title: "Naruto",
      bestCharacter: "No one.",
    },
  },
};

// GET ROUTES COMPLETE

app.get("/profiles", (req, res) => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  const randomFact = facts[randomIndex];

  res.status(200).json({
    ...oliviaProfile,
    fact: randomFact,
    status: "success",
    data: db.profiles,
  });
});

app.get("/profiles/:userId", (req, res) => {
  console.log(req.params.userId);

  const matchingProfile = db.profiles[req.params.userId];

  if (matchingProfile) {
    res.json({
      status: "success",
      data: matchingProfile,
    });
  } else {
    res.status(404).json({
      message: "Couldn't find user with that id. Please try again",
    });
  }
});

app.get("/anime", (req, res) => {
  res.status(200).json({
    status: "success",
    data: db.anime,
  });
});

app.get("/anime/:animeId", (req, res) => {
  console.log(req.params.animeId);

  const matchingAnime = db.anime[req.params.animeId];

  if (matchingAnime) {
    res.json({
      status: "success",
      data: matchingAnime,
    });
  } else {
    res.status(404).json({
      message: "Couldn't find anime data. Please try again",
    });
  }
});

// POST ROUTES COMPLETE

app.post("/profiles", (req, res) => {
  const existingIds = Object.keys(db.profiles);
  const largestKey = Math.max(...existingIds);

  const newKey = largestKey + 1;

  db.profiles[newKey] = req.body;

  res.status(201).json({
    status: "success",
    message: `Created a profile with id of ${newKey}`,
  });
});

app.post("/anime", (req, res) => {
  const existingIds = Object.keys(db.anime);
  const largestKey = Math.max(...existingIds);

  const newKey = largestKey + 1;

  db.anime[newKey] = req.body;

  res.status(201).json({
    status: "success",
    message: `Added a anime with id of ${newKey}`,
  });
});

// PATCH ROUTES

app.patch("/profiles/:userId", (req, res) => {
  db.profiles[req.params.userId] = {
    ...db.profiles[req.params.userId],
    ...req.body,
  };

  res.status(200).json({
    message: "User updated",
  });
});

app.patch("/anime/:animeId", (req, res) => {
  db.anime[req.params.animeId] = {
    ...db.anime[req.params.animeId],
    ...req.body,
  };

  res.status(200).json({
    message: "Anime updated",
  });
});

// DELETE ROUTES

app.delete("/profiles/:userId", (req, res) => {
  delete db.profiles[req.params.userId];

  res.status(200).json({
    status: "success",
    message: "Profile deleted ",
  });
});

app.delete("/anime/:animeId", (req, res) => {
  delete db.anime[req.params.animeId];

  res.status(200).json({
    status: "success",
    message: "Anime deleted",
  });
});

app.listen(4000, () => {
  console.log("server is running, you did it Liv!");
});
