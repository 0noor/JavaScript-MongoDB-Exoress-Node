const express = require("express");
const app = express();
console.dir(app)

app.get('/', (req, res) => {

    res.send("Hello This is the Home Page")
})

app.get('/cats', (req, res) => {
    res.send('MEOW!!')
})

app.get('/dogs', (req, res) => {
    res.send('WOOF!!')
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1> Browsing the ${subreddit}`)
})

app.get('*', (req, res) => {
    res.send(`I don't know that path!`)
})

app.listen(3000, () => {
    console.log("listening on port 3000!")
})