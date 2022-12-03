const express = require ('express');
const app = express();
const port = 5555;
const path = require('path');

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/home.html'))
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname+'/login.html'))
});

app.get("/projects", (req, res) => {
    res.sendFile(path.join(__dirname+'/projects.html'))
});

app.listen(port, () => {
    console.log(`Server is online :) \nport: ${port}`)
});