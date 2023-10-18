const express = require("express");
const app = express();

app.listen(3000, () => console.log("Server up and running"));

var todos = ['buy the milk', 'rent a car', 'feed the cat'];

app.get('/', (req, res) => {
  return res.status(200).json(todos);
})

// tutorial https://www.codingame.com/playgrounds/1064/building-a-basic-todo-list-rest-api-in-node-js-with-express/key-concepts