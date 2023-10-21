const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.listen(3000, () => console.log("Server up and running"));

var todos = [{id:1, title:'buy the milk'}, {id:2, title:'rent a car'}, {id:3, title:'feed the cat'}];

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.status(200).json(todos);
})

app.post('/', (request, response) => {
  // var newTodo = JSON.parse(request.body); don't even need to use json.parse 
  var newTodo = request.body;
  console.log(newTodo);
  newTodo.id = todos.length +1;
  todos.push(newTodo);
  response.status(201).json(newTodo);
});

app.put('/:id', (req, res) => {
  var id = req.params.id;
  console.log(id);
  if (todos[id - 1]) {
    todos[id - 1] = req.body;
    res.status(204).send();
  } else {
    res.status(404, 'The todo is not found').send();
  }
});

app.delete('/:id', (req, res) => {
  var id = parseInt(req.params.id);
  if (todos.some(todo => todo.id === id)) {
    todos = todos.filter(todo => todo.id !== id);
    res.status(200).send();
  } else {
    res.status(404, 'The todo is not found').send();
  }
})

// todo ids are not truly unique
// tutorial https://www.codingame.com/playgrounds/1064/building-a-basic-todo-list-rest-api-in-node-js-with-express/discover-express