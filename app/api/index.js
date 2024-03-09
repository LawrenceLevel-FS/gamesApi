const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");

//Game storage bin
let games = JSON.parse(localStorage.getItem("games")) || [];

//localhost:3000/api/v1
//@GET all Games
router.get("/", (req, res) => {
  res.status(200).send({ all_games: games });
});

//@GET one Game by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const findGame = (game) => game.id == req.params.id;
  res.status(200).send({ single_game: games.find(findGame) });
});

//@POST Game
router.post("/", (req, res) => {
  const id = uuidv4();
  req.body = {
    title: "The Legend of Zelda: Breiath of the Wild",
    ratings: "Everyone 10+",
    platforms: ["Nintendo Switch", "Wii U"],
    price: 49.99,
    description:
      "Explore the wilds of Hyrule any way you like. Climb up towers and mountain peaks in search of new destinations.",
  };
  games.push({ id, ...req.body });
  localStorage.setItem("games", JSON.stringify(games));
  res.status(200).send({ all_games: games });
});

//@UPDATE Game by ID
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const findGame = games.findIndex((game) => game.id == id);
  const updatedGame = {
    title: "The Plagend of Mellda: Breath of the Child",
    ratings: "Everyone 10+",
    platforms: ["Nintendo witch", "Wii U"],
    price: 0.0,
    description:
      "Explore the wilds of Hyrule any way you like. Climb up towers and mountain peaks in search of new destinations.",
  };

  if (findGame !== -1) {
    // update the game from the array
    games[findGame] = {
      ...games[findGame],
      ...updatedGame,
    };
    // Update the localStorage with the modified array
    localStorage.setItem("games", JSON.stringify(games));
    res.status(200).send("game updated successfully");
  } else {
    res.status(200).send({ message: "Game not found" });
  }
});

//@DELETE Game by ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const findGame = games.findIndex((game) => game.id == id);
  if (findGame !== -1) {
    // Remove the game from the array
    games.splice(findGame, 1);

    // Update the localStorage with the modified array
    localStorage.setItem("games", JSON.stringify(games));
    res.status(200).send("game deleted successfully");
  } else {
    res.status(200).send({ message: "Game not found" });
  }
});

module.exports = router;
