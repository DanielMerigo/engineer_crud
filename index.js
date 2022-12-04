const express = require ('express');
const app = express();
const port = 5555;
const fs = require("fs");
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

var users = []

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/views'));


app.use(bodyParser.urlencoded( { extended: false }));


app.get("/users-form", (req, res) => {
    res.render('userForm', {
        title: 'Users',
        message: "Adicione um Usuario",
        btn1: "Enviar"
    });
});

app.post("/users-form", (req, res) => {
    req.body.id = uuidv4()
    var value = req.body
    users.push(value)
    res.redirect("/users-list")
});

app.get('/users-list', (req, res) => {
    res.render('index', {
        title: 'Users',
        message: "Lista de usuarios",
        users:users,
        btn1: "edit",
        btn2: "delete"
    });
});

//Tive que usar o get PQ o delete não estava puxando
app.get("/users-delete/:id", (req,res) => {
    let index = users.findIndex(i => i.id === req.params.id);
    users.splice(index, 1)
    res.redirect("/users-list");
});
var idAtual = ""
app.get("/users-edit/:id", (req, res) => {
    idAtual = (req.params.id)
    res.render('userEdit', {
        title: 'Edit user',
        users: users,
        message: `Editar usuario`,
        btn1: `Confirm`
    });
})

app.post("/users-edit/:id", (req, res) => {
    let index = users.findIndex(i => i.id === idAtual);
    users[index].name = req.body.name
    users[index].phone = req.body.phone
    res.redirect("/users-list")
})

app.listen(port, () => {
    console.log(`Server is online :) \nport: ${port}`);
});

