const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const Todo = require("./models/todo");

app.listen(port, () => console.log("Server up and running"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  Todo.all((err, todos) => res.status(200).json(todos));
});

app.post("/", (request, response) => {
  // var newTodo = JSON.parse(request.body); don't even need to use json.parse
  var newTodo = request.body;
  console.log(newTodo);
  Todo.add(newTodo);
  response.status(201).json(newTodo);
});

app.put("/:id", (req, res) => {
  var id = req.params.id;
  var updatedTodo = req.body;
  updatedTodo.id = parseInt(id);
  Todo.update(updatedTodo, (err, data) => {
    if (err) {
      res.status(404, "The task is not found").send();
    } else {
      res.status(204).send(data);
    }
  });
});

app.delete("/:id", (req, res) => {
  var id = parseInt(req.params.id);
  Todo.delete(id, (err) => {
    if(err){
      res.status(404).send();
    }else{
          res.status(200).send();
    }
  });
});

// todo ids are not truly unique
// todo add todo service
// todo add tests
// tutorial https://www.codingame.com/playgrounds/1064/building-a-basic-todo-list-rest-api-in-node-js-with-express/discover-express
